<?php

// bootstrap/app.php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\HandleInertiaRequests; // <--- TAMBAHKAN BARIS INI

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        
        $middleware->append(\App\Http\Middleware\TrustProxies::class);

        // Daftarkan alias di sini
        $middleware->alias([
            'role' => CheckRole::class,
        ]);

        // Daftarkan semua middleware web di satu tempat agar rapi
        $middleware->web(append: [
            HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

    /* ========================================================
 * TAMBAHKAN KODE INI UNTUK MENYELESAIKAN ERROR VERCEL
 * ======================================================== */
if (isset($_ENV['VERCEL'])) {
    // Pindahkan seluruh aktivitas storage (cache, logs, framework, livewire-tmp) ke /tmp
    $app->useStoragePath('/tmp/storage');
    
    // Pastikan folder-folder esensial dibuat di dalam /tmp saat aplikasi berjalan
    $paths = [
        '/tmp/storage/framework/cache/data',
        '/tmp/storage/framework/views',
        '/tmp/storage/framework/sessions',
        '/tmp/storage/logs',
        '/tmp/storage/app/livewire-tmp', // Sangat penting untuk upload Livewire
    ];

    foreach ($paths as $path) {
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }
    }
}
/* ======================================================== */

return $app;
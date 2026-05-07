<?php

// bootstrap/app.php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\HandleInertiaRequests;

// 1. Inisialisasi konfigurasi aplikasi ke dalam variabel $app
$app = Application::configure(basePath: dirname(__DIR__))
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
    })
    ->create(); // Kita buat instance app-nya dulu di sini

// 2. Logika khusus untuk Vercel (Read-Only File System)
if (isset($_SERVER['VERCEL_JOB_ID']) || env('APP_ENV') === 'production') {
    
    $storagePath = '/tmp/storage';

    // Buat folder yang diperlukan jika belum ada
    $folders = [
        $storagePath . '/framework/views',
        $storagePath . '/framework/cache',
        $storagePath . '/framework/sessions',
        $storagePath . '/app/public',
        $storagePath . '/app/livewire-tmp',
    ];

    foreach ($folders as $folder) {
        if (!is_dir($folder)) {
            mkdir($folder, 0755, true);
        }
    }

    // Set storage path ke /tmp
    $app->useStoragePath($storagePath);
}

// 3. Kembalikan instance aplikasi
return $app;
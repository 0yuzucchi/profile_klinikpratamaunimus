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
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withPaths([
    // ... path lainnya
    'storage' => base_path('storage'), // Pastikan ini ada
])
    ->withMiddleware(function (Middleware $middleware) {
        
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
    // Tambahkan kode ini setelah ->create();
if (isset($_SERVER['VERCEL'])) {
    $app->useStoragePath(storage_path: '/tmp/storage');
}
return $app;

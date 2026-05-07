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

    // --- TAMBAHKAN KODE INI ---
// Periksa apakah aplikasi berjalan di Vercel
if (isset($_ENV['VERCEL_ENV'])) {
    // Arahkan direktori storage ke /tmp
    $app->useStoragePath(env('APP_STORAGE_PATH', '/tmp/storage'));

    // Arahkan path cache secara spesifik jika perlu (opsional, tapi disarankan)
    $app->useCachePath('/tmp/bootstrap/cache');
}
// --- AKHIR DARI KODE TAMBAHAN ---

return $app;
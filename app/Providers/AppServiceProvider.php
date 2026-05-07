<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
public function register(): void
{
    // Cek apakah aplikasi berjalan di Vercel
    if (env('VERCEL_JOB_ID') || env('NOW_REGION')) {
        $storagePath = '/tmp/storage';

        // Buat folder yang diperlukan jika belum ada
        if (!is_dir($storagePath)) {
            mkdir($storagePath, 0777, true);
            mkdir($storagePath . '/framework/sessions', 0777, true);
            mkdir($storagePath . '/framework/views', 0777, true);
            mkdir($storagePath . '/framework/cache', 0777, true);
            mkdir($storagePath . '/framework/cache/data', 0777, true);
            mkdir($storagePath . '/logs', 0777, true);
        }

        // Paksa Laravel menggunakan path baru ini
        $this->app->useStoragePath($storagePath);
        
        // Paksa Compiled Views ke /tmp
        config(['view.compiled' => $storagePath . '/framework/views']);
    }
}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production') {
        URL::forceScheme('https');
        }
    }
}

<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    // public function register(): void
    // {
    //     //
    // }

    public function register(): void
{
    // Cek apakah running di Vercel
    if (config('app.env') === 'production' && env('VERCEL_JOB_ID')) {
        $storagePath = '/tmp/storage';

        // Buat folder yang diperlukan secara rekursif
        if (!is_dir($storagePath . '/framework/views')) {
            mkdir($storagePath . '/framework/views', 0777, true);
        }
        if (!is_dir($storagePath . '/framework/cache/data')) {
            mkdir($storagePath . '/framework/cache/data', 0777, true);
        }
        if (!is_dir($storagePath . '/framework/sessions')) {
            mkdir($storagePath . '/framework/sessions', 0777, true);
        }
        if (!is_dir($storagePath . '/logs')) {
            mkdir($storagePath . '/logs', 0777, true);
        }

        // Ganti path storage bawaan Laravel
        $this->app->useStoragePath($storagePath);

        // Beritahu Laravel di mana letak view yang sudah dikompilasi
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

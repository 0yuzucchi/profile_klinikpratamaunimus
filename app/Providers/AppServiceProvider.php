<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Livewire\Livewire; // <--- PASTIKAN IMPORT INI ADA


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    // public function boot(): void
    // {
    //     if (config('app.env') === 'production') {
    //     URL::forceScheme('https');
    //     }
    // }

    public function boot(): void
{
    // Paksa HTTPS di Production (Vercel)
    if (env('APP_ENV') !== 'local') {
        URL::forceScheme('https');
        
        
    }

    $appUrl = config('app.url'); // Mengambil dari APP_URL di .env

        if (env('APP_ENV') !== 'local' && $appUrl) {
            Livewire::setUpdateRoute(function ($handle) use ($appUrl) {
                return \Illuminate\Support\Facades\Route::post("{$appUrl}/livewire/update", $handle)
                    ->middleware([
                        'web',
                        'universal',
                    ]);
            });

            Livewire::setScriptRoute(function ($handle) use ($appUrl) {
                return \Illuminate\Support\Facades\Route::get("{$appUrl}/livewire/livewire.js", $handle);
            });
        }
}
}

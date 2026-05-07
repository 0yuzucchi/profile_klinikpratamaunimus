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
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production') {
        URL::forceScheme('https');
        }

            if (config('app.env') === 'production' && isset($_ENV['VERCEL_JOB_ID'])) {
        // Redirect folder cache dan view ke /tmp
        $this->app->useStoragePath('/tmp/storage');
        
        // Buat folder jika belum ada (opsional, beberapa versi memerlukannya)
        if (!is_dir('/tmp/storage/framework/views')) {
            mkdir('/tmp/storage/framework/views', 0755, true);
        }
    }
    }
}

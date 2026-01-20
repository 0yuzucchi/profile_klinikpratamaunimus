<?php

// namespace App\Providers\Filament;

// use Filament\Http\Middleware\Authenticate;
// use Filament\Http\Middleware\AuthenticateSession;
// use Filament\Http\Middleware\DisableBladeIconComponents;
// use Filament\Http\Middleware\DispatchServingFilamentEvent;
// use Filament\Pages;
// use Filament\Panel;
// use Filament\PanelProvider;
// use Filament\Support\Colors\Color;
// use Filament\Widgets;
// use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
// use Illuminate\Cookie\Middleware\EncryptCookies;
// use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
// use Illuminate\Routing\Middleware\SubstituteBindings;
// use Illuminate\Session\Middleware\StartSession;
// use Illuminate\View\Middleware\ShareErrorsFromSession;
// use App\Traits\RestrictedResource; // <--- 1. Import Trait
// use App\Models\User; // <--- 1. Import User

// class AdminPanelProvider extends PanelProvider
// {
//     use RestrictedResource; // <--- 2. Pakai Trait

//     // <--- 3. Daftar Role (Mirip Middleware)
//     protected static ?array $allowedRoles = [
//         User::ROLE_SUPER_ADMIN, 
//         User::ROLE_KEPALA_RT, 
//     ];

//     public function panel(Panel $panel): Panel
// {
//     return $panel
//         ->default()
//         ->id('admin')
//         ->path('admin')
//         ->login()
//         ->brandName('Klinik Pratama Inventory')
//         ->font('Poppins') 
//         ->colors([
//             'primary' => Color::Emerald,
//         ])
//         // GANTI DI SINI
//         ->sidebarCollapsibleOnDesktop() 
//         ->databaseNotifications()
//             ->darkMode(true) // Mengaktifkan fitur Dark Mode
            
//             // --- Layout & Navigasi ---
//             ->breadcrumbs(true)    // Menampilkan navigasi jejak halaman
//             ->databaseNotifications() // Mengaktifkan ikon lonceng notifikasi
            
//             // --- Resources & Pages ---
//             ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
//             ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
//             ->pages([
//                 Pages\Dashboard::class,
//             ])
            
//             // --- Widgets ---
//             ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
//             ->widgets([
//                 Widgets\AccountWidget::class,
//                 // Widgets\FilamentInfoWidget::class, // DINONAKTIFKAN agar dasbor tidak penuh iklan
//             ])
            
//             // --- Middleware ---
//             ->middleware([
//                 EncryptCookies::class,
//                 AddQueuedCookiesToResponse::class,
//                 StartSession::class,
//                 AuthenticateSession::class,
//                 ShareErrorsFromSession::class,
//                 VerifyCsrfToken::class,
//                 SubstituteBindings::class,
//                 DisableBladeIconComponents::class,
//                 DispatchServingFilamentEvent::class,
//             ])
//             ->authMiddleware([
//                 Authenticate::class,
//             ]);
//     }
// }


namespace App\Providers\Filament;

use App\Models\User;
use Closure; // <-- 1. Tambahkan use statement ini
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Http\Request; // <-- 2. Tambahkan use statement ini
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Symfony\Component\HttpFoundation\Response; // <-- 3. Tambahkan use statement ini

class AdminPanelProvider extends PanelProvider
{
    // Trait dan properti $allowedRoles dihapus karena tidak digunakan oleh Filament untuk otorisasi panel
    
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('Klinik Pratama Inventory')
            ->font('Poppins')
            ->colors([
                'primary' => Color::Emerald,
            ])
            ->sidebarCollapsibleOnDesktop()
            ->databaseNotifications()
            ->darkMode(true)
            ->breadcrumbs(true)
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                // AuthenticateSession::class, // Sering menyebabkan masalah di Vercel, bisa dicoba dinonaktifkan
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
                // --- INI ADALAH LOGIKA OTORISASI YANG BARU ---
                function (Request $request, Closure $next): Response {
                    $user = $request->user();

                    // Tentukan role yang diizinkan
                    $allowedRoles = [
                        User::ROLE_SUPER_ADMIN,
                        User::ROLE_KEPALA_RT,
                    ];

                    // Jika user tidak login atau rolenya tidak diizinkan, tolak akses
                    if (! $user || ! in_array($user->role, $allowedRoles)) {
                        abort(403, 'Akses Ditolak.');
                    }

                    // Jika diizinkan, lanjutkan
                    return $next($request);
                },
                // ---------------------------------------------
            ]);
    }
}
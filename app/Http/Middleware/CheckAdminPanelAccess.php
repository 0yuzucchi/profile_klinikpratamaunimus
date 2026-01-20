<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // <-- 1. IMPORT Log FACADE
use Symfony\Component\HttpFoundation\Response;

class CheckAdminPanelAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // 2. LOGGING UNTUK DEBUG
        // Kita catat role user yang sedang mencoba login
        Log::info('Mencoba otorisasi panel admin untuk user: ' . $user?->email . ' dengan role: ' . $user?->role);

        $allowedRoles = [
            User::ROLE_SUPER_ADMIN,
            User::ROLE_KEPALA_RT,
        ];

        if (! $user || ! in_array($user->role, $allowedRoles)) {
            // Kita catat alasan penolakan
            Log::warning('Akses DITOLAK untuk user: ' . $user?->email . '. Role tidak valid.');
            abort(403, 'Akses Ditolak.');
        }
        
        Log::info('Akses DIIZINKAN untuk user: ' . $user?->email);
        return $next($request);
    }
}
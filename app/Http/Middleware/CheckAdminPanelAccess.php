<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminPanelAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        $allowedRoles = [
            User::ROLE_SUPER_ADMIN,
            User::ROLE_KEPALA_RT,
        ];

        if (! $user || ! in_array($user->role, $allowedRoles)) {
            abort(403, 'Akses Ditolak.');
        }

        return $next($request);
    }
}
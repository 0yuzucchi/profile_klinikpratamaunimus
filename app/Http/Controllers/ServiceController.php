<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Menampilkan daftar layanan.
     */
    public function index()
    {
        // Mengambil layanan visible, urutkan: Unggulan dulu, baru tanggal terbaru
        $services = Service::visible()
            ->orderBy('is_featured', 'desc') // Unggulan (1) di atas, Biasa (0) di bawah
            ->latest('published_at')
            // Tambahkan 'is_featured' ke dalam select
            ->get(['id', 'title', 'slug', 'excerpt', 'image_path', 'published_at', 'is_featured']);

        return Inertia::render('Service/Index', [
            'services' => $services,
        ]);
    }

    /**
     * Menampilkan detail satu layanan.
     */
    public function show($slug)
    {
        $service = Service::visible()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Service/Show', [
            'service' => $service,
        ]);
    }
}
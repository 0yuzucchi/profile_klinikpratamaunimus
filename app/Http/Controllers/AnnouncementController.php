<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class AnnouncementController extends Controller
{
    /**
     * Menampilkan halaman daftar pengumuman.
     * (Tidak perlu diubah, karena accessor imageUrl sudah benar)
     */
    public function index()
    {
        $announcements = Announcement::visible()
            ->latest('published_at')
            ->get()
            ->map(fn ($announcement) => [
                'id' => $announcement->id,
                'slug' => $announcement->slug,
                'title' => $announcement->title,
                'excerpt' => $announcement->excerpt,
                'image_url' => $announcement->image_url, // Ini akan mengambil thumbnail
                'date' => Carbon::parse($announcement->published_at)->isoFormat('D MMMM YYYY'),
            ]);

        return Inertia::render('Announcements/Index', [
            'announcements' => $announcements,
        ]);
    }

    /**
     * Menampilkan halaman detail pengumuman.
     */
    public function show($slug)
    {
        $currentAnnouncement = Announcement::visible()
            ->where('slug', $slug)
            ->firstOrFail();

        $otherAnnouncements = Announcement::visible()
            ->where('slug', '!=', $slug)
            ->latest('published_at')->take(4)->get()
            ->map(fn ($announcement) => [
                'id' => $announcement->id,
                'slug' => $announcement->slug,
                'title' => $announcement->title,
                'image_url' => $announcement->image_url,
                'date' => Carbon::parse($announcement->published_at)->isoFormat('D MMMM YYYY'),
            ]);
        
        return Inertia::render('Announcements/Show', [
            'announcement' => [
                'id' => $currentAnnouncement->id,
                'slug' => $currentAnnouncement->slug,
                'title' => $currentAnnouncement->title,
                // --- PERUBAHAN ---
                'content' => $currentAnnouncement->content, // Kirim seluruh struktur Builder
                'image_url' => $currentAnnouncement->image_url, // Ini adalah thumbnail
                'date' => Carbon::parse($currentAnnouncement->published_at)->isoFormat('D MMMM YYYY'),
            ],
            'otherAnnouncements' => $otherAnnouncements,
        ]);
    }
}
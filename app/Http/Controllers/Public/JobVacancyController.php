<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobVacancyController extends Controller
{
    /**
     * Menampilkan daftar lowongan dengan filter pencarian dan status.
     */
    public function index(Request $request)
    {
        $query = JobVacancy::query();

        // 1. Filter Pencarian Teks
        if ($request->has('search')) {
            $query->where('profession', 'like', '%' . $request->search . '%');
        }

        // 2. Filter Status (Open/Closed)
        // Default: Tampilkan semua ('all') jika tidak ada filter, atau sesuaikan kebutuhan
        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'open') {
                // Lowongan dianggap BUKA jika: Status DB 'open' DAN (Tanggal belum lewat ATAU Tanggal null)
                $query->where('status', 'open')
                      ->where(function ($q) {
                          $q->whereDate('open_until_date', '>=', now())
                            ->orWhereNull('open_until_date');
                      });
            } elseif ($request->status === 'closed') {
                // Lowongan dianggap TUTUP jika: Status DB 'closed' ATAU Tanggal sudah lewat
                $query->where(function ($q) {
                    $q->where('status', 'closed')
                      ->orWhereDate('open_until_date', '<', now());
                });
            }
        }

        // Urutkan: Created at terbaru
        $vacancies = $query->latest()
            ->paginate(10)
            ->withQueryString(); // Penting agar parameter search/status tetap ada saat pindah halaman

        return Inertia::render('Jobs/Index', [
            'vacancies' => $vacancies,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Menampilkan detail.
     */
    public function show(JobVacancy $jobVacancy)
    {
        // KITA HAPUS abort(404) agar user tetap bisa melihat history lowongan yang sudah tutup
        
        return Inertia::render('Jobs/Show', [
            'vacancy' => $jobVacancy,
        ]);
    }
}
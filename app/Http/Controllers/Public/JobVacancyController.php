<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon; // Pastikan ini diimpor jika menggunakan Carbon::parse di map

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

    private function calculateIsOpen(JobVacancy $vacancy): bool
    {
        $status = $vacancy->status->value ?? null;
        $openUntilType = $vacancy->open_until_type->value ?? null;
    
        // STEP 1
        if ($status !== 'open') {
            return false;
        }
    
        // STEP 2
        if ($openUntilType === 'undetermined') {
            return true;
        }
    
        // STEP 3
        if ($openUntilType === 'date') {
            if (!$vacancy->open_until_date) {
                return false;
            }
    
            $deadline = Carbon::parse($vacancy->open_until_date)
                ->endOfDay();
    
            $now = now();
    
            $result = $deadline->gte($now);
    
            return $result;
        }
    
        logger()->info('FALLBACK RETURN FALSE', [
            'id' => $vacancy->id,
            'status' => $status,
            'open_until_type' => $openUntilType,
        ]);
    
        return false;
    }

    public function apiIndex(Request $request)
    {
        $query = JobVacancy::query();

        // 1. Filter Pencarian Teks
        if ($request->has('search') && $request->get('search') != '') {
             // Menggunakan 'ilike' untuk PostgreSQL/Supabase
            $query->where('profession', 'ilike', '%' . $request->search . '%');
        }

        // 2. Filter Status (Open/Closed)
        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'open') {
                $query->where('status', 'open')
                      ->where(function ($q) {
                          $q->whereDate('open_until_date', '>=', now())
                            ->orWhereNull('open_until_date');
                      });
            } elseif ($request->status === 'closed') {
                $query->where(function ($q) {
                    $q->where('status', 'closed')
                      ->orWhereDate('open_until_date', '<', now());
                });
            }
        }

        // Urutkan dan ambil data
        $vacancies = $query->latest()
            ->paginate(10); // Tetap paginate jika Anda ingin paginasi di mobile

        // Mapping data agar sesuai untuk frontend mobile
        $mappedVacancies = $vacancies->map(function ($vacancy) {
            $isOpen = $this->calculateIsOpen($vacancy);
            
            return [
                'id' => $vacancy->id,
                'profession' => $vacancy->profession,
                'status' => $vacancy->status, // Status dari DB
                'is_open' => $isOpen, // Status buka/tutup yang dihitung
                'open_until_date' => $vacancy->open_until_date,
                'open_until_type' => $vacancy->open_until_type,

                'description' => $vacancy->description, // Konten lowongan kerja (HTML string)
                'requirements' => $vacancy->requirements, // Persyaratan (HTML string)
                'required_documents' => $vacancy->required_documents, // Persyaratan (HTML string)
                'application_link' => $vacancy->application_link, // Link untuk melamar
                'submission_channels' => $vacancy->submission_channels, // Link untuk melamar
                'poster_image' => $vacancy->poster_image, // Link untuk melamar
                // Jika ada gambar: 'image_url' => $vacancy->image_url,
            ];
        });

        // Kembalikan sebagai JSON, termasuk informasi paginasi jika perlu
        return response()->json([
            'data' => $mappedVacancies,
            'current_page' => $vacancies->currentPage(),
            'last_page' => $vacancies->lastPage(),
            'per_page' => $vacancies->perPage(),
            'total' => $vacancies->total(),
        ]);
    }

    /**
     * Mengembalikan detail satu lowongan kerja berdasarkan ID dalam format JSON untuk aplikasi mobile.
     */
    public function apiShow(JobVacancy $jobVacancy) // Menggunakan Model Binding
    {
        // Hitung status is_open secara dinamis
        $isOpen = $this->calculateIsOpen($jobVacancy);

        return response()->json([
            'id' => $jobVacancy->id,
            'profession' => $jobVacancy->profession,
            'status' => $jobVacancy->status,
            'is_open' => $isOpen,
            'open_until_type' => $jobVacancy->open_until_type,
            'open_until_date' => $jobVacancy->open_until_date,
            'description' => $jobVacancy->description,
            'requirements' => $jobVacancy->requirements,
            'required_documents' => $jobVacancy->required_documents, // Persyaratan (HTML string)
            'submission_channels' => $jobVacancy->submission_channels, // Link untuk melamar
                'poster_image' => $jobVacancy->poster_image, // Link untuk melamar
        ]);
    }
}
<?php

// namespace App\Http\Controllers;

// use App\Models\Doctor;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Cache;
// use Illuminate\Support\Facades\Http;
// use Illuminate\Support\Facades\Log;
// use Illuminate\Support\Str;

// class ClinicAIController extends Controller
// {
//     /**
//      * URL endpoint untuk Gemini API. Diinisialisasi di constructor.
//      * @var string
//      */
//     protected string $geminiApiUrl;

//     /**
//      * Informasi dasar dan statis tentang klinik.
//      * @var array
//      */
//     private array $clinicContext = [
//         'name' => 'Klinik Pratama Unimus',
//         'address' => 'Jl. Petek Jl. Kp. Gayam, RT.02/RW.06, Dadapsari, Kec. Semarang Utara, Kota Semarang, Jawa Tengah 50173',
//         'type' => 'Klinik Pratama (Klinik Kesehatan Primer)',
//     ];

//     /**
//      * Constructor untuk menginisialisasi properti secara dinamis (cara yang benar).
//      */
//     public function __construct()
//     {
//         $apiKey = config('services.gemini.key', env('GOOGLE_AI_API_KEY'));
//         // Menggunakan model 'gemini-1.5-flash' yang lebih modern dan cepat
//         $this->geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";
//     }

//     /**
//      * Memproses query dari pengguna dan mengembalikan respons JSON terstruktur.
//      *
//      * @param Request $request
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function processQuery(Request $request)
//     {
//         $query = strtolower($request->input('query', ''));
//         $responseData = [];

//         // Router logika untuk menentukan handler yang sesuai
//         if ($this->isDoctorQuery($query)) {
//             $responseData = $this->handleDoctorQuery($query);
//         } elseif ($this->isTransportationQuery($query)) {
//             $responseData = $this->handleTransportationQuery();
//         } elseif ($this->isServiceQuery($query)) {
//             $responseData = $this->handleServiceQuery();
//         } else {
//             $responseData = $this->handleAmbiguousQuery($query);
//         }
        
//         // [PENTING] Memastikan semua handler mengembalikan format yang konsisten
//         // Jika handler hanya mengembalikan string, bungkus ke dalam struktur standar.
//         if (is_string($responseData)) {
//             return response()->json(['reply' => ['text' => $responseData, 'suggestions' => []]]);
//         }
        
//         // Jika handler sudah mengembalikan array (seperti handleAmbiguousQuery), langsung gunakan.
//         return response()->json(['reply' => $responseData]);
//     }
    
//     /**
//      * [PERUBAHAN] Mengembalikan array terstruktur, bukan lagi string.
//      */
//     private function handleAmbiguousQuery($query)
//     {
//         return [
//             'text' => "Maaf, saya kurang mengerti pertanyaan Anda. Mungkin Anda bisa mencoba salah satu pertanyaan di bawah ini:",
//             'suggestions' => [
//                 'Siapa saja dokter yang praktik?',
//                 'Layanan apa saja yang tersedia?',
//                 'Bagaimana cara ke klinik?',
//                 'Minta alamat lengkap klinik',
//             ]
//         ];
//     }

//     private function handleTransportationQuery()
//     {
//         $cacheKey = 'clinic_transportation_info_v3';

//         $geminiResponse = Cache::remember($cacheKey, now()->addDay(), function () {
//             $prompt = "Anda adalah asisten virtual pemandu lokal ahli di Kota Semarang, Indonesia. Berikan informasi rute dan transportasi umum terbaik untuk menuju ke '{$this->clinicContext['name']}' yang beralamat di '{$this->clinicContext['address']}'. 
//             Sertakan opsi berikut dengan detail yang jelas dan praktis:
//             1. Trans Semarang: Sebutkan koridor yang relevan dan nama halte terdekat.
//             2. Transportasi Online (Gojek/Grab): Beri tips mudah untuk titik penjemputan/tujuan.
//             3. Kendaraan Pribadi: Beri rute umum dari landmark terkenal seperti Simpang Lima atau Tugu Muda.
//             Gunakan format daftar poin yang mudah dibaca dan bahasa Indonesia yang natural.";

//             return $this->generateTextFromGemini($prompt);
//         });

//         if (!$geminiResponse) {
//             return "Maaf, terjadi sedikit gangguan saat mengambil informasi transportasi terkini. Silakan coba beberapa saat lagi.";
//         }
        
//         $clinicMapsUrl = 'https://maps.app.goo.gl/gXQ7T1JNNh6sQd5j9';
//         $fullResponse = "Tentu, ini adalah analisis rute terbaik dan terkini menuju {$this->clinicContext['name']}:\n\n";
//         $fullResponse .= "📍 *Alamat:* {$this->clinicContext['address']}\n";
//         $fullResponse .= "🗺️ *Google Maps:* {$clinicMapsUrl}\n\n";
//         $fullResponse .= "*Rekomendasi Transportasi:*\n" . $geminiResponse;

//         return $fullResponse; // Akan dibungkus oleh processQuery
//     }

//     private function handleServiceQuery()
//     {
//         $cacheKey = 'clinic_services_info_v3';
        
//         $geminiResponse = Cache::remember($cacheKey, now()->addWeek(), function () {
//             $prompt = "Jelaskan layanan-layanan umum yang biasanya tersedia di sebuah '{$this->clinicContext['type']}' di Indonesia. 
//             Contohnya termasuk Poli Umum, Poli Gigi, Kesehatan Ibu dan Anak (KIA), Laboratorium Sederhana, dan Apotek. 
//             Buat dalam format daftar poin (bullet points) menggunakan tanda strip (-) dalam bahasa Indonesia yang jelas.";
            
//             return $this->generateTextFromGemini($prompt);
//         });

//         if (!$geminiResponse) {
//             return "Maaf, terjadi sedikit gangguan saat mengambil informasi layanan kami. Silakan coba beberapa saat lagi.";
//         }

//         return "{$this->clinicContext['name']} adalah sebuah klinik pratama yang menyediakan berbagai layanan kesehatan primer. Secara umum, layanan yang tersedia adalah:\n" . $geminiResponse; // Akan dibungkus oleh processQuery
//     }

//     private function generateTextFromGemini(string $prompt): ?string
//     {
//         if (empty(config('services.gemini.key', env('GOOGLE_AI_API_KEY')))) {
//             Log::error('>>> FATAL: GOOGLE_AI_API_KEY tidak ditemukan di file .env atau config.');
//             return null;
//         }

//         $response = Http::timeout(60)
//             ->withHeaders(['Content-Type' => 'application/json'])
//             ->post($this->geminiApiUrl, [
//                 'contents' => [['parts' => [['text' => $prompt]]]],
//                 'safetySettings' => [
//                     ['category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_NONE'],
//                     ['category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_NONE'],
//                     ['category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_NONE'],
//                     ['category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_NONE'],
//                 ]
//             ]);

//         if ($response->successful()) {
//             return data_get($response->json(), 'candidates.0.content.parts.0.text');
//         }

//         Log::error('>>> GAGAL: Google API Error', ['status' => $response->status(), 'body' => $response->body()]);
//         return null;
//     }

//     private function handleDoctorQuery($query) { 
//         $doctorName = $this->extractEntity($query, ['dokter', 'dr']);
//         if ($doctorName) {
//             $doctor = Doctor::with(['educations', 'subSpecializations', 'workExperiences'])->where('name', 'like', "%{$doctorName}%")->first();
//             if (!$doctor) return "Maaf, dokter dengan nama yang mengandung '{$doctorName}' tidak ditemukan di database kami.";
//             if (Str::contains($query, ['jadwal', 'kapan', 'jam'])) {
//                 $schedule = $doctor->schedule ?? [];
//                 if (empty(array_filter((array)$schedule))) return "{$doctor->name} belum memiliki jadwal praktik yang terdaftar.";
//                 $response = "Berikut jadwal praktik untuk {$doctor->name} ({$doctor->specialization}):\n";
//                 foreach ($schedule as $day => $time) $response .= "- " . ucfirst($day) . ": " . ($time ?: 'Libur') . "\n";
//                 return $response;
//             }
//             if (Str::contains($query, ['pendidikan', 'lulusan'])) {
//                 if ($doctor->educations->isEmpty()) return "Informasi pendidikan untuk {$doctor->name} belum tersedia.";
//                 $response = "Riwayat pendidikan {$doctor->name}:\n";
//                 foreach ($doctor->educations as $edu) $response .= "- {$edu->degree} dari {$edu->institution} (Tahun {$edu->year})\n";
//                 return $response;
//             }
//             return $this->generateFullDoctorProfile($doctor);
//         }
//         $specialization = $this->extractEntity($query, ['spesialis', 'poli']);
//         if ($specialization) {
//             $doctors = Doctor::where('specialization', 'like', "%{$specialization}%")->get();
//             if ($doctors->isEmpty()) return "Maaf, kami tidak memiliki dokter untuk poli {$specialization} saat ini.";
//             $response = "Berikut dokter di poli {$specialization} yang kami miliki:\n";
//             foreach($doctors as $doc) $response .= "- {$doc->name}\n";
//             return $response;
//         }
//         $allDoctors = Doctor::orderBy('name')->get();
//         if ($allDoctors->isEmpty()) return "Maaf, belum ada data dokter yang terdaftar saat ini.";
//         $response = "Kami memiliki beberapa dokter yang praktik. Anda bisa menanyakan jadwal spesifik dengan format 'jadwal dokter [nama dokter]'.\n\nDokter kami:\n";
//         foreach($allDoctors as $doc) $response .= "- {$doc->name} ({$doc->specialization})\n";
//         return $response;
//     }
    
//     private function isDoctorQuery($query) { return Str::contains($query, ['dokter', 'dr.', 'spesialis', 'praktik', 'jadwal', 'poli']); }
//     private function isTransportationQuery($query) { return Str::contains($query, ['transportasi', 'lokasi', 'alamat', 'maps', 'ke sana', 'naik apa', 'rute', 'arah']); }
//     private function isServiceQuery($query) { return Str::contains($query, ['layanan', 'fasilitas', 'bisa apa', 'tersedia']); }
//     private function extractEntity($query, array $keywords) { foreach ($keywords as $keyword) { if (strpos($query, $keyword) !== false) { $potentialEntity = trim(substr($query, strpos($query, $keyword) + strlen($keyword))); return str_replace('?', '', $potentialEntity); } } return null; }
    
//     private function generateFullDoctorProfile(Doctor $doctor) { 
//         $profile = "Berikut profil lengkap dari *{$doctor->name}*:\n\n"; 
//         $profile .= "*{Spesialisasi/Poli}:* {$doctor->specialization}\n"; 
//         if ($doctor->subSpecializations->isNotEmpty()) { 
//             $subSpecs = $doctor->subSpecializations->pluck('name')->implode(', '); 
//             $profile .= "*{Sub-spesialisasi}:* {$subSpecs}\n"; 
//         } 
//         $profile .= "\n*Deskripsi:*\n" . ($doctor->description ?: 'Informasi belum tersedia.') . "\n"; 
//         if ($doctor->educations->isNotEmpty()) { 
//             $profile .= "\n*Pendidikan:*\n"; 
//             foreach ($doctor->educations as $edu) { 
//                 $profile .= "- {$edu->degree}, {$edu->institution} ({$edu->year})\n"; 
//             } 
//         } 
//         $profile .= "\nAnda bisa bertanya lebih detail seperti 'jadwal dokter {$doctor->name}'."; 
//         return $profile; 
//     }
// }




























namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Carbon\Carbon; // <-- Import Carbon untuk manajemen tanggal

class ClinicAIController extends Controller
{
    /**
     * URL endpoint untuk Gemini API. Diinisialisasi di constructor.
     * @var string
     */
    protected string $geminiApiUrl;

    /**
     * Informasi dasar dan statis tentang klinik.
     * @var array
     */
    private array $clinicContext = [
        'name' => 'Klinik Pratama Unimus',
        'address' => 'Jl. Petek Jl. Kp. Gayam, RT.02/RW.06, Dadapsari, Kec. Semarang Utara, Kota Semarang, Jawa Tengah 50173',
        'type' => 'Klinik Pratama (Klinik Kesehatan Primer)',
    ];

    /**
     * Constructor untuk menginisialisasi properti secara dinamis (cara yang benar).
     */
    public function __construct()
    {
        $apiKey = config('services.gemini.key', env('GOOGLE_AI_API_KEY'));
        // Menggunakan model 'gemini-1.5-flash' yang lebih modern dan cepat
        $this->geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";
    }

    /**
     * Memproses query dari pengguna dan mengembalikan respons JSON terstruktur.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function processQuery(Request $request)
    {
        $query = strtolower($request->input('query', ''));
        $responseData = [];

        // Router logika untuk menentukan handler yang sesuai
        if ($this->isDoctorQuery($query)) {
            $responseData = $this->handleDoctorQuery($query);
        } elseif ($this->isTransportationQuery($query)) {
            $responseData = $this->handleTransportationQuery();
        } elseif ($this->isServiceQuery($query)) {
            $responseData = $this->handleServiceQuery();
        } else {
            $responseData = $this->handleAmbiguousQuery($query);
        }
        
        // Memastikan semua handler mengembalikan format yang konsisten
        if (is_string($responseData)) {
            return response()->json(['reply' => ['text' => $responseData, 'suggestions' => []]]);
        }
        
        return response()->json(['reply' => $responseData]);
    }
    
    /**
     * [PERBAIKAN UTAMA] Logika dibuat lebih cerdas untuk menangani konteks.
     */
    private function handleDoctorQuery($query)
    {
        // Skenario 1: Pengguna menanyakan jadwal untuk "hari ini"
        if (Str::contains($query, ['hari ini', 'sekarang'])) {
            $todayIndonesian = $this->getTodayIndonesian();
            $doctors = Doctor::all();
            $practicingToday = [];

            foreach ($doctors as $doctor) {
                $schedule = (array) $doctor->schedule; // Pastikan schedule adalah array
                if (!empty($schedule[$todayIndonesian])) {
                    $practicingToday[] = [
                        'name' => $doctor->name,
                        'specialization' => $doctor->specialization,
                        'time' => $schedule[$todayIndonesian]
                    ];
                }
            }

            if (empty($practicingToday)) {
                return "Berdasarkan data kami, sepertinya tidak ada dokter yang membuka praktik hari ini (" . ucfirst($todayIndonesian) . "). Anda bisa melihat daftar semua dokter yang kami miliki.";
            }

            $response = "Tentu, berikut adalah jadwal dokter yang praktik hari ini (" . ucfirst($todayIndonesian) . "):\n";
            foreach ($practicingToday as $doc) {
                $response .= "- {$doc['name']} ({$doc['specialization']}): {$doc['time']}\n";
            }
            return $response;
        }

        // Skenario 2: Pengguna menanyakan "semua dokter"
        if (Str::contains($query, 'semua dokter')) {
            $allDoctors = Doctor::orderBy('name')->get();
            if ($allDoctors->isEmpty()) return "Maaf, belum ada data dokter yang terdaftar saat ini.";

            $response = "Berikut adalah daftar semua dokter yang terdaftar di klinik kami:\n";
            foreach($allDoctors as $doc) {
                $response .= "- {$doc->name} ({$doc->specialization})\n";
            }
            $response .= "\nAnda bisa menanyakan jadwal spesifik untuk salah satu dokter di atas.";
            return $response;
        }

        // Skenario 3: Mencari nama dokter spesifik (logika lama)
        $doctorName = $this->extractEntity($query, ['dokter', 'dr']);
        if ($doctorName) {
            $doctor = Doctor::with(['educations', 'subSpecializations', 'workExperiences'])->where('name', 'like', "%{$doctorName}%")->first();
            
            if (!$doctor) {
                // Jawaban jika dokter tidak ditemukan, dengan saran interaktif
                return [
                    'text' => "Maaf, dokter dengan nama yang mengandung '{$doctorName}' tidak ditemukan. Mungkin ada kesalahan penulisan?",
                    'suggestions' => ['Lihat semua dokter', 'Jadwal dokter hari ini']
                ];
            }
            
            // Sub-intent: jadwal, pendidikan, dll.
            if (Str::contains($query, ['jadwal', 'kapan', 'jam'])) {
                $schedule = $doctor->schedule ?? [];
                if (empty(array_filter((array)$schedule))) return "{$doctor->name} belum memiliki jadwal praktik yang terdaftar.";
                $response = "Berikut jadwal praktik untuk {$doctor->name} ({$doctor->specialization}):\n";
                foreach ($schedule as $day => $time) $response .= "- " . ucfirst($day) . ": " . ($time ?: 'Libur') . "\n";
                return $response;
            }
            if (Str::contains($query, ['pendidikan', 'lulusan'])) {
                if ($doctor->educations->isEmpty()) return "Informasi pendidikan untuk {$doctor->name} belum tersedia.";
                $response = "Riwayat pendidikan {$doctor->name}:\n";
                foreach ($doctor->educations as $edu) $response .= "- {$edu->degree} dari {$edu->institution} (Tahun {$edu->year})\n";
                return $response;
            }
            return $this->generateFullDoctorProfile($doctor);
        }

        // Skenario 4: Mencari berdasarkan spesialisasi
        $specialization = $this->extractEntity($query, ['spesialis', 'poli']);
        if ($specialization) {
            $doctors = Doctor::where('specialization', 'like', "%{$specialization}%")->get();
            if ($doctors->isEmpty()) return "Maaf, kami tidak memiliki dokter untuk poli {$specialization} saat ini.";
            $response = "Berikut dokter di poli {$specialization} yang kami miliki:\n";
            foreach($doctors as $doc) $response .= "- {$doc->name}\n";
            return $response;
        }

        // Skenario 5: Fallback jika tidak ada yang cocok
        return $this->handleAmbiguousQuery($query);
    }

    private function handleTransportationQuery()
    {
        $cacheKey = 'clinic_transportation_info_v3';
        $geminiResponse = Cache::remember($cacheKey, now()->addDay(), function () {
            $prompt = "Anda adalah asisten virtual pemandu lokal ahli di Kota Semarang, Indonesia. Berikan informasi rute dan transportasi umum terbaik untuk menuju ke '{$this->clinicContext['name']}' yang beralamat di '{$this->clinicContext['address']}'. 
            Sertakan opsi berikut dengan detail yang jelas dan praktis:
            1. Trans Semarang: Sebutkan koridor yang relevan dan nama halte terdekat.
            2. Transportasi Online (Gojek/Grab): Beri tips mudah untuk titik penjemputan/tujuan.
            3. Kendaraan Pribadi: Beri rute umum dari landmark terkenal seperti Simpang Lima atau Tugu Muda.
            Gunakan format daftar poin yang mudah dibaca dan bahasa Indonesia yang natural.";
            return $this->generateTextFromGemini($prompt);
        });

        if (!$geminiResponse) return "Maaf, terjadi sedikit gangguan saat mengambil informasi transportasi terkini. Silakan coba beberapa saat lagi.";
        
        $clinicMapsUrl = 'https://maps.app.goo.gl/gXQ7T1JNNh6sQd5j9';
        $fullResponse = "Tentu, ini adalah analisis rute terbaik dan terkini menuju {$this->clinicContext['name']}:\n\n";
        $fullResponse .= "📍 *Alamat:* {$this->clinicContext['address']}\n";
        $fullResponse .= "🗺️ *Google Maps:* {$clinicMapsUrl}\n\n";
        $fullResponse .= "*Rekomendasi Transportasi:*\n" . $geminiResponse;
        return $fullResponse;
    }

    private function handleServiceQuery()
    {
        $cacheKey = 'clinic_services_info_v3';
        $geminiResponse = Cache::remember($cacheKey, now()->addWeek(), function () {
            $prompt = "Jelaskan layanan-layanan umum yang biasanya tersedia di sebuah '{$this->clinicContext['type']}' di Indonesia. 
            Contohnya termasuk Poli Umum, Poli Gigi, Kesehatan Ibu dan Anak (KIA), Laboratorium Sederhana, dan Apotek. 
            Buat dalam format daftar poin (bullet points) menggunakan tanda strip (-) dalam bahasa Indonesia yang jelas.";
            return $this->generateTextFromGemini($prompt);
        });

        if (!$geminiResponse) return "Maaf, terjadi sedikit gangguan saat mengambil informasi layanan kami. Silakan coba beberapa saat lagi.";
        
        return "{$this->clinicContext['name']} adalah sebuah klinik pratama yang menyediakan berbagai layanan kesehatan primer. Secara umum, layanan yang tersedia adalah:\n" . $geminiResponse;
    }

    private function generateTextFromGemini(string $prompt): ?string
    {
        if (empty(config('services.gemini.key', env('GOOGLE_AI_API_KEY')))) {
            Log::error('>>> FATAL: GOOGLE_AI_API_KEY tidak ditemukan di file .env atau config.');
            return null;
        }

        $response = Http::timeout(60)
            ->withHeaders(['Content-Type' => 'application/json'])
            ->post($this->geminiApiUrl, [
                'contents' => [['parts' => [['text' => $prompt]]]],
                'safetySettings' => [
                    ['category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_NONE'],
                    ['category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_NONE'],
                    ['category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_NONE'],
                    ['category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_NONE'],
                ]
            ]);

        if ($response->successful()) return data_get($response->json(), 'candidates.0.content.parts.0.text');

        Log::error('>>> GAGAL: Google API Error', ['status' => $response->status(), 'body' => $response->body()]);
        return null;
    }

    private function handleAmbiguousQuery($query)
    {
        return [
            'text' => "Maaf, saya kurang mengerti pertanyaan Anda. Mungkin Anda bisa mencoba salah satu pertanyaan di bawah ini:",
            'suggestions' => [
                'Jadwal dokter hari ini',
                'Siapa saja dokter yang praktik?',
                'Layanan apa saja yang tersedia?',
                'Bagaimana cara ke klinik?',
            ]
        ];
    }
    
    private function getTodayIndonesian(): string
    {
        Carbon::setLocale('id');
        return strtolower(Carbon::now()->translatedFormat('l'));
    }

    private function isDoctorQuery($query) { return Str::contains($query, ['dokter', 'dr.', 'spesialis', 'praktik', 'jadwal', 'poli']); }
    private function isTransportationQuery($query) { return Str::contains($query, ['transportasi', 'lokasi', 'alamat', 'maps', 'ke sana', 'naik apa', 'rute', 'arah']); }
    private function isServiceQuery($query) { return Str::contains($query, ['layanan', 'fasilitas', 'bisa apa', 'tersedia']); }
    private function extractEntity($query, array $keywords) { foreach ($keywords as $keyword) { if (strpos($query, $keyword) !== false) { $potentialEntity = trim(substr($query, strpos($query, $keyword) + strlen($keyword))); return str_replace('?', '', $potentialEntity); } } return null; }
    
    private function generateFullDoctorProfile(Doctor $doctor) { 
        $profile = "Berikut profil lengkap dari *{$doctor->name}*:\n\n"; 
        $profile .= "*{Spesialisasi/Poli}:* {$doctor->specialization}\n"; 
        if ($doctor->subSpecializations->isNotEmpty()) { 
            $subSpecs = $doctor->subSpecializations->pluck('name')->implode(', '); 
            $profile .= "*{Sub-spesialisasi}:* {$subSpecs}\n"; 
        } 
        $profile .= "\n*Deskripsi:*\n" . ($doctor->description ?: 'Informasi belum tersedia.') . "\n"; 
        if ($doctor->educations->isNotEmpty()) { 
            $profile .= "\n*Pendidikan:*\n"; 
            foreach ($doctor->educations as $edu) { 
                $profile .= "- {$edu->degree}, {$edu->institution} ({$edu->year})\n"; 
            } 
        } 
        $profile .= "\nAnda bisa bertanya lebih detail seperti 'jadwal dokter {$doctor->name}'."; 
        return $profile; 
    }
}
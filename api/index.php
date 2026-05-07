<?
// Pastikan storage path di-set sebelum memanggil app
if (true) { // Anda bisa ganti dengan cek environment vercel
    $storagePath = '/tmp/storage';
    if (!is_dir($storagePath . '/framework/views')) {
        mkdir($storagePath . '/framework/views', 0777, true);
        mkdir($storagePath . '/framework/cache/data', 0777, true);
        mkdir($storagePath . '/framework/sessions', 0777, true);
    }
}
require __DIR__ . '/../public/index.php';

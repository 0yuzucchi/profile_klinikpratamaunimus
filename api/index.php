<?
// Buat folder storage di /tmp secara otomatis jika belum ada
if (isset($_SERVER['VERCEL_JOB_ID']) || true) {
    $paths = [
        '/tmp/storage/framework/views',
        '/tmp/storage/framework/cache',
        '/tmp/storage/framework/sessions',
        '/tmp/storage/app/public',
        '/tmp/storage/app/livewire-tmp', // Penting untuk Livewire
    ];

    foreach ($paths as $path) {
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }
}
require __DIR__ . '/../public/index.php';

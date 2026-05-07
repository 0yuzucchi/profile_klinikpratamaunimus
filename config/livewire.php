<?php
return [
    'temporary_file_upload' => [
        'disk' => 'local', // Pastikan menggunakan disk yang sudah kita arahkan ke /tmp di atas
        'directory' => 'livewire-tmp',
        'middleware' => 'throttle:60,1',
        'preview_mimes' => [
            'png', 'gif', 'jpg', 'jpeg', 'webp',
        ],
        'max_upload_time' => 5,
    ],
];
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;


class ContactController extends Controller
{
    /**
     * Menampilkan halaman kontak.
     */
    
    public function index()
    {
        // Mengambil data setting (menggunakan first() karena biasanya hanya ada 1 baris setting)
        $setting = Setting::first();

        return Inertia::render('Contact', [
            'setting' => $setting
        ]);
    }
}
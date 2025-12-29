import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index({ announcements = [] }) {
    const [search, setSearch] = useState('');

    // Filter data berdasarkan search
    const filteredAnnouncements = announcements.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    // --- LOGIKA PEMBAGIAN DATA (SLICING) ---
    // 1. Kartu Besar Kiri (Index 0)
    const mainFeatured = filteredAnnouncements[0];
    // 2. Kartu Kanan Atas (Index 1)
    const rightFeatured = filteredAnnouncements[1];
    // 3. Kartu Kanan Bawah (Index 2 & 3)
    const rightList = filteredAnnouncements.slice(2, 4);
    // 4. Banner Horizontal (Index 4 & 5) - Kalender/Libur
    const wideBanners = filteredAnnouncements.slice(4, 6);
    // 5. Sisa Data untuk List Bawah (Semua Pengumuman)
    const bottomList = filteredAnnouncements.slice(6);

    // Helper format tanggal (DD.MM.YYYY)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        }).format(date).replace(/\//g, '.'); // Ubah slash jadi titik
    };

    return (
        <>
            <Head title="Pengumuman" />

            <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-800">

                {/* HERO SECTION */}
                <div className="relative h-56 md:h-64 bg-gray-900 flex flex-col justify-center items-center text-center overflow-hidden mb-12   ">
                    <img
                        src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/tampakdepan.webp"
                        alt="Background"
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-40 blur-[2px]"
                    />
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        {/* Responsif Font Size: text-3xl di mobile, text-5xl di desktop */}
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-2">
                            PENGUMUMAN
                        </h1>
                        <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed max-w-xs md:max-w-none mx-auto">
                            Informasi edukasi kesehatan kepada pengunjung sebagai bentuk pengetahuan dan promosi layanan klinik.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl">

                    {/* SECTION HEADER & SEARCH */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <h2 className="text-3xl font-bold uppercase text-gray-900 tracking-tight">
                            Pengumuman Terkini
                        </h2>
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Cari Pengumuman"
                                className="w-full border border-gray-300 rounded-full py-2 px-5 pl-10 focus:outline-none focus:border-green-500 transition-colors"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>

                    {/* ======================================================= */}
                    {/* BAGIAN UTAMA (Grid Layout) */}
                    {/* ======================================================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">

                        {/* 1. KARTU BESAR KIRI */}
                        <div className="relative h-full min-h-[600px] lg:h-auto rounded-[30px] overflow-hidden shadow-2xl group">
                            {mainFeatured ? (
                                <>
                                    <img
                                        src={mainFeatured.image_url || 'https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/error-svgrepo-com.png'}
                                        alt={mainFeatured.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                                    {/* Badge Baru */}
                                    <div className="absolute top-8 left-8">
                                        <span className="bg-white text-gray-900 text-sm font-bold px-6 py-2 rounded-xl shadow-md uppercase tracking-wide">
                                            Baru
                                        </span>
                                    </div>

                                    {/* Konten Teks */}
                                    <div className="absolute bottom-0 left-0 p-8 pb-24 w-full md:w-4/5">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                                            {mainFeatured.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                                            {mainFeatured.excerpt || "Deskripsi pengumuman utama..."}
                                        </p>
                                    </div>

                                    {/* Tombol Selengkapnya */}
                                    <Link
                                        href={route('announcements.show', mainFeatured.slug)}
                                        className="absolute bottom-0 right-0 bg-white text-gray-900 font-bold text-sm px-8 py-5 rounded-tl-[30px] hover:bg-gray-100 transition-colors tracking-widest uppercase shadow-lg z-10"
                                    >
                                        Selengkapnya
                                    </Link>
                                </>
                            ) : (
                                <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500">Data Kosong</div>
                            )}
                        </div>

                        {/* 2. KOLOM KANAN */}
                        <div className="flex flex-col gap-6">

                            {/* A. Kartu Kanan Atas */}
                            {rightFeatured && (
                                <div className="bg-white rounded-[30px] overflow-hidden shadow-xl flex flex-col h-full relative group">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={rightFeatured.image_url || 'https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/error-svgrepo-com.png'}
                                            alt={rightFeatured.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <span className="absolute top-6 left-6 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-sm">
                                            Baru
                                        </span>
                                    </div>
                                    <div className="p-8 pb-20 relative flex-1">
                                        <p className="text-xs text-gray-400 font-medium mb-2">
                                            {formatDate(rightFeatured.date)}
                                        </p>
                                        <h4 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                                            {rightFeatured.title}
                                        </h4>
                                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                                            {rightFeatured.excerpt}
                                        </p>
                                    </div>
                                    <Link
                                        href={route('announcements.show', rightFeatured.slug)}
                                        className="absolute bottom-0 right-0 bg-green-500 text-white font-bold text-xs px-8 py-4 rounded-tl-[30px] hover:bg-green-600 transition-colors uppercase tracking-wider"
                                    >
                                        Selengkapnya
                                    </Link>
                                </div>
                            )}

                            {/* B. List Kartu Kecil */}
                            {rightList.map((item) => (
                                <div key={item.id} className="bg-white rounded-[30px] p-8 shadow-lg relative hover:shadow-xl transition-shadow">
                                    <p className="text-xs text-gray-400 font-medium mb-2">
                                        {formatDate(item.date)}
                                    </p>
                                    <h4 className="text-sm md:text-base font-bold text-gray-900 mb-2 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-8">
                                        {item.excerpt}
                                    </p>
                                    <div className="absolute bottom-6 right-6">
                                        <Link
                                            href={route('announcements.show', item.slug)}
                                            className="bg-green-500 text-white text-[10px] font-bold px-6 py-2 rounded-full hover:bg-green-600 transition-colors uppercase"
                                        >
                                            Baru
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. MIDDLE SECTION: WIDE BANNERS */}
                    <div className="space-y-6 mb-16">
                        {wideBanners.map((banner) => (
                            <Link key={banner.id} href={route('announcements.show', banner.slug)} className="block group">
                                <div className="bg-white rounded-[20px] shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row h-auto md:h-48">
                                    <div className="w-full md:w-2/5 relative overflow-hidden flex-shrink-0">
                                        <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded">
                                            BARU
                                        </div>
                                        <img
                                            src={banner.image_url || 'https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/error-svgrepo-com.png'}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            alt=""
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col justify-center flex-1">
                                        <span className="text-xs text-gray-400 mb-2 font-medium">
                                            {formatDate(banner.date)}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-green-600 transition-colors">
                                            {banner.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                            {banner.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ======================================================= */}
                    {/* SECTION: SEMUA PENGUMUMAN (KODE YANG DIUBAH) */}
                    {/* ======================================================= */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold uppercase text-gray-900">
                            Semua Pengumuman
                        </h2>
                    </div>

                    {/* LIST PENGUMUMAN SESUAI GAMBAR */}
                    <div className="space-y-4">
                        {bottomList.length > 0 ? bottomList.map((item) => (
                            <Link key={item.id} href={route('announcements.show', item.slug)} className="block group">
                                <div className="bg-white p-6 border border-gray-200 rounded-[20px] shadow-sm transition-shadow duration-300 hover:shadow-md hover:border-gray-300">
                                    <p className="text-sm text-gray-500 mb-1">
                                        {formatDate(item.date)}
                                    </p>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-green-600">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {item.excerpt}
                                    </p>
                                </div>
                            </Link>
                        )) : (
                            <div className="py-10 text-center text-gray-400">
                                Tidak ada pengumuman lainnya.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

Index.layout = page => <AppLayout children={page} />;
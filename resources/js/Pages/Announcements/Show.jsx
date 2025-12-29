import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { route } from 'ziggy-js';

// --- KOMPONEN BARU: ContentRenderer ---
// Komponen ini bertanggung jawab untuk merender array konten dari Filament Builder.
const ContentRenderer = ({ content }) => {
    // Pastikan 'content' adalah array sebelum mencoba memetakannya.
    if (!Array.isArray(content)) {
        // Fallback jika content adalah string HTML lama (untuk data lama)
        return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
    }

    return (
        <div className="space-y-6">
            {content.map((block, index) => {
                switch (block.type) {
                    // Case untuk blok paragraf
                    case 'paragraph':
                        return (
                            <div
                                key={index}
                                className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: block.data.content }}
                            />
                        );

                    // Case untuk blok galeri
                    case 'gallery':
                        return (
                            <div key={index} className="not-prose my-8">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {block.data.images && block.data.images.map((imageUrl, imgIndex) => (
                                        <a
                                            key={imgIndex}
                                            href={imageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={`Galeri gambar ${imgIndex + 1}`}
                                                className="w-full h-40 object-cover transform hover:scale-110 transition-transform duration-500"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/error-svgrepo-com.png'; }}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        );
                    
                    // Default case jika ada tipe blok lain di masa depan
                    default:
                        return null;
                }
            })}
        </div>
    );
};


// --- KOMPONEN SIDEBAR (Tidak Ada Perubahan) ---
const OtherAnnouncementsSidebar = ({ announcements }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="font-bold text-lg border-b border-gray-200 pb-3 mb-4 flex justify-between items-center text-gray-800">
            PENGUMUMAN LAINNYA
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        </h3>
        {announcements.length === 0 ? (
            <p className="text-gray-500 text-sm">Belum ada pengumuman lain.</p>
        ) : (
            <ul className="space-y-5">
                {announcements.map(item => (
                    <li key={item.id}>
                        <Link href={route('announcements.show', item.slug)} className="flex gap-3 group">
                            <div className="shrink-0 overflow-hidden rounded-md w-20 h-16 bg-gray-100">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/error-svgrepo-com.png'; }}
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                    {item.title}
                                </span>
                                <span className="text-xs text-gray-400 mt-1">{item.date}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        )}
        <div className="mt-6 pt-4 border-t border-gray-100">
            <Link href={route('announcements.index')} className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-center">
                Lihat Semua Pengumuman &rarr;
            </Link>
        </div>
    </div>
);

// --- KOMPONEN UTAMA (Dengan Sedikit Perubahan) ---
export default function Show({ announcement, otherAnnouncements }) {
    return (
        <>
            <Head title={announcement.title} />

            <div className="bg-gray-50 min-h-screen">
                {/* --- HERO SECTION (Tidak Ada Perubahan) --- */}
                <div className="relative h-64 bg-gray-900 flex flex-col justify-center items-center text-center overflow-hidden">
                    <img 
                        src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/tampakdepan.webp"
                        alt="Background" 
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-40 blur-[2px]" 
                        onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60"></div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase mb-2">
                            PENGUMUMAN
                        </h1>
                        <p className="text-gray-200 text-sm md:text-base font-medium">
                            Informasi terbaru dan pemberitahuan resmi terkait layanan dan kegiatan klinik.
                        </p>
                    </div>
                </div>

                {/* --- CONTENT CONTAINER --- */}
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <div className="grid lg:grid-cols-3 lg:gap-10 items-start">

                        {/* KOLOM KIRI: KONTEN UTAMA */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Gambar Utama (Thumbnail) Pengumuman - TIDAK ADA PERUBAHAN, INI SUDAH BENAR */}
                            {announcement.image_url && (
                                <div className="w-full h-64 md:h-96 overflow-hidden">
                                    <img
                                        src={announcement.image_url}
                                        alt={announcement.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/error-svgrepo-com.png'; }}
                                    />
                                </div>
                            )}

                            <div className="p-6 md:p-10">
                                {/* Meta Data (Tidak Ada Perubahan) */}
                                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        {announcement.date}
                                    </span>
                                    <span className="flex items-center text-blue-600 font-medium">
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        Admin Klinik
                                    </span>
                                </div>

                                {/* Judul (Tidak Ada Perubahan) */}
                                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                                    {announcement.title}
                                </h1>

                                {/* --- PERUBAHAN UTAMA DI SINI --- */}
                                {/* Ganti div lama dengan komponen ContentRenderer yang baru */}
                                <ContentRenderer content={announcement.content} />
                            </div>
                        </div>

                        {/* KOLOM KANAN: SIDEBAR (Tidak Ada Perubahan) */}
                        <aside className="mt-8 lg:mt-0 space-y-8 sticky top-24">
                            <OtherAnnouncementsSidebar announcements={otherAnnouncements} />
                        </aside>

                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = page => <AppLayout children={page} />;
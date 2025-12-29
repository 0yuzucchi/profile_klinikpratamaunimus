import React, { useState, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Placeholder Gambar
const ImagePlaceholder = ({ className }) => (
    <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    </div>
);

// 2. Formatter Tanggal
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

// --- ANIMATION VARIANTS (Konfigurasi Swipe) ---
const swipeVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

// --- MAIN COMPONENT ---

export default function ArticleIndex({ articles }) {
    const [[page, direction], setPage] = useState([1, 0]);
    const itemsPerPage = 4;
    const listTopRef = useRef(null);

    // 1. Normalisasi Data
    const allArticles = articles.data || articles || [];

    // 2. Slicing Data
    const featuredArticle = allArticles.length > 0 ? allArticles[0] : null;
    const subFeaturedArticles = allArticles.length > 1 ? allArticles.slice(1, 4) : [];
    const rawLatestArticles = allArticles.length > 4 ? allArticles.slice(4) : [];

    // 3. Logika Pagination
    const totalPages = Math.ceil(rawLatestArticles.length / itemsPerPage);
    const displayedLatestArticles = rawLatestArticles.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const paginate = (newPage) => {
        const newDirection = newPage > page ? 1 : -1;
        setPage([newPage, newDirection]);
        
        if (listTopRef.current) {
            setTimeout(() => {
                listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    };

    return (
        <>
            <Head title="Artikel" />

            {/* --- HERO SECTION --- */}
            <div className="relative h-56 md:h-64 bg-gray-900 flex flex-col justify-center items-center text-center overflow-hidden">
                <img
                    src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/tampakdepan.webp"
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-40 blur-[2px]"
                />
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    {/* Responsif Font Size: text-3xl di mobile, text-5xl di desktop */}
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-2">
                        ARTIKEL
                    </h1>
                    <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed max-w-xs md:max-w-none mx-auto">
                        Informasi edukasi kesehatan dan promosi layanan klinik terkini.
                    </p>
                </div>
            </div>

            <div className="bg-white pb-20 pt-8 md:pt-12">
                <div className="container max-w-6xl mx-auto px-4 md:px-8">

                    {allArticles.length === 0 && (
                        <div className="text-center py-10 text-gray-500">Belum ada artikel.</div>
                    )}

                    {/* --- BAGIAN 1: ARTIKEL POPULER --- */}
                    {featuredArticle && (
                        <div className="mb-12 md:mb-16">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-900 uppercase mb-6 md:mb-8 border-l-4 border-green-600 pl-3 md:border-none md:pl-0">
                                ARTIKEL POPULER
                            </h2>

                            {/* Featured Large */}
                            <div className="mb-10 md:mb-12">
                                <Link href={route('articles.show', featuredArticle.slug || featuredArticle.id)} className="group block">
                                    {/* Responsif Image Height: h-64 (HP), h-[500px] (Desktop) */}
                                    <div className="w-full h-64 sm:h-[400px] md:h-[500px] overflow-hidden mb-4 md:mb-6 bg-gray-100 rounded-lg md:rounded-none shadow-sm md:shadow-none">
                                        {featuredArticle.image_url ? (
                                            <img
                                                src={featuredArticle.image_url}
                                                alt={featuredArticle.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <ImagePlaceholder className="w-full h-full" />
                                        )}
                                    </div>
                                    <div className="space-y-2 md:space-y-3 px-1 md:px-0">
                                        <span className="text-gray-500 text-xs md:text-sm block font-semibold">
                                            {formatDate(featuredArticle.created_at || featuredArticle.date)}
                                        </span>
                                        <h3 className="text-xl md:text-3xl font-bold text-gray-900 uppercase group-hover:text-green-700 transition-colors leading-tight">
                                            {featuredArticle.title}
                                        </h3>
                                        <p className="text-gray-600 md:text-gray-700 text-sm md:text-lg leading-relaxed line-clamp-3">
                                            {featuredArticle.excerpt || featuredArticle.body?.substring(0, 200)}...
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            {/* Sub-Featured Grid */}
                            {subFeaturedArticles.length > 0 && (
                                /* Grid Responsive: 1 col (HP), 2 col (Tablet), 3 col (Desktop) */
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                                    {subFeaturedArticles.map((item, index) => (
                                        <Link key={index} href={route('articles.show', item.slug || item.id)} className="group block flex flex-row sm:flex-col gap-4 sm:gap-0 items-start sm:items-stretch">
                                            {/* Layout HP: Gambar kecil di kiri (opsional) atau tumpuk. Di sini saya buat tumpuk tapi lebih compact */}
                                            <div className="w-1/3 sm:w-full aspect-[4/3] overflow-hidden sm:mb-4 bg-gray-100 rounded-md sm:rounded-none flex-shrink-0">
                                                {item.image_url ? (
                                                    <img
                                                        src={item.image_url}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <ImagePlaceholder className="w-full h-full" />
                                                )}
                                            </div>
                                            <div className="w-2/3 sm:w-full">
                                                <h4 className="font-bold text-gray-900 uppercase text-sm md:text-base mb-1 md:mb-2 group-hover:text-green-700 line-clamp-2 leading-snug">
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-2 line-clamp-2 md:line-clamp-3 hidden sm:block">
                                                    {item.excerpt || item.body?.substring(0, 100)}...
                                                </p>
                                                <span className="text-gray-400 text-[10px] md:text-xs">
                                                    By {item.author?.name || 'Admin'}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- BAGIAN 2: ARTIKEL TERKINI (Framer Motion Animation) --- */}
                    
                    <div ref={listTopRef} className="scroll-mt-24 overflow-hidden">
                        {rawLatestArticles.length > 0 && (
                            <>
                                <h2 className="text-xl md:text-3xl font-bold text-gray-900 uppercase mb-6 md:mb-8 border-t pt-8 md:pt-10 border-gray-200">
                                    ARTIKEL TERKINI
                                </h2>

                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div 
                                        key={page}
                                        custom={direction}
                                        variants={swipeVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 }
                                        }}
                                        className="flex flex-col gap-6 md:gap-8 min-h-[300px]"
                                    >
                                        {displayedLatestArticles.map((article, index) => (
                                            <Link
                                                key={article.id || index}
                                                href={route('articles.show', article.slug || article.id)}
                                                // Layout: Mobile Stack (flex-col), Desktop Side-by-side (md:flex-row)
                                                // Shadow ditambahkan di mobile agar kartu terlihat jelas
                                                className="flex flex-col md:flex-row gap-4 md:gap-6 group bg-white md:bg-transparent rounded-xl md:rounded-lg shadow-md md:shadow-none border md:border-none p-4 md:p-3 md:-mx-3 transition-all hover:bg-gray-50"
                                            >
                                                {/* Gambar List */}
                                                <div className="w-full md:w-1/3 aspect-video md:h-52 overflow-hidden bg-gray-100 flex-shrink-0 rounded-lg shadow-sm">
                                                    {article.image_url ? (
                                                        <img
                                                            src={article.image_url}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <ImagePlaceholder className="w-full h-full" />
                                                    )}
                                                </div>

                                                <div className="w-full md:w-2/3 flex flex-col justify-center">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-gray-500 text-[10px] md:text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                                                            {formatDate(article.created_at || article.date)}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 uppercase mb-2 md:mb-3 group-hover:text-green-700 transition-colors line-clamp-2 leading-tight">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-gray-600 md:text-gray-700 text-sm md:text-base leading-relaxed line-clamp-3">
                                                        {article.excerpt || article.body?.substring(0, 150)}...
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                {/* --- PAGINATION CONTROLS --- */}
                                {totalPages > 1 && (
                                    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t flex flex-wrap justify-center md:justify-between items-center gap-3 md:gap-4">

                                        {/* Tombol Sebelumnya */}
                                        <button
                                            onClick={() => paginate(Math.max(1, page - 1))}
                                            disabled={page === 1}
                                            // Padding lebih kecil di mobile (px-4 py-2)
                                            className={`px-4 py-2 md:px-6 md:py-2 border rounded-full transition text-xs md:text-sm font-medium flex items-center gap-2
                                                ${page === 1
                                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                                    : 'border-gray-300 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200 active:scale-95'
                                                }`}
                                        >
                                            <span>&larr;</span> 
                                            <span className="hidden sm:inline">Sebelumnya</span>
                                        </button>

                                        {/* Tombol Angka */}
                                        <div className="flex items-center gap-1 md:gap-2">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => paginate(p)}
                                                    className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border text-xs md:text-sm font-medium transition duration-300
                                                        ${page === p
                                                            ? 'bg-green-600 border-green-600 text-white shadow-md transform scale-105'
                                                            : 'border-transparent text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Tombol Selanjutnya */}
                                        <button
                                            onClick={() => paginate(Math.min(totalPages, page + 1))}
                                            disabled={page === totalPages}
                                            className={`px-4 py-2 md:px-6 md:py-2 border rounded-full transition text-xs md:text-sm font-medium flex items-center gap-2
                                                ${page === totalPages
                                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                                    : 'border-gray-300 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200 active:scale-95'
                                                }`}
                                        >
                                            <span className="hidden sm:inline">Selanjutnya</span> 
                                            <span>&rarr;</span>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

ArticleIndex.layout = page => <AppLayout children={page} />;
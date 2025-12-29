import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';

// --- KOMPONEN ITEM LIST (CARD) ---
const ServiceCard = ({ service, onClick }) => {
    const isFeatured = service.is_featured === 1;

    return (
        <motion.div
            layoutId={`card-container-${service.id}`}
            onClick={() => onClick(service)}
            className="group cursor-pointer h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            {/* Container Utama */}
            <div className="bg-white rounded-[30px] p-4 shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col border border-gray-100 relative">
                
                {/* Bagian Gambar */}
                <motion.div 
                    layoutId={`card-image-container-${service.id}`}
                    className="relative w-full h-48 overflow-hidden rounded-2xl"
                >
                    <motion.img 
                        layoutId={`card-image-${service.id}`}
                        src={service.image_path} 
                        alt={service.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    />

                    {/* Badge Layanan Unggulan */}
                    {isFeatured && (
                        <div className="absolute top-6 right-0 z-20 filter drop-shadow-md">
                            <div 
                                className="bg-[#1ca548] text-white py-1.5 pl-6 pr-3 flex flex-col items-center justify-center leading-none"
                                style={{ 
                                    clipPath: 'polygon(0 50%, 12px 0, 100% 0, 100% 100%, 12px 100%)'
                                }}
                            >
                                <span className="text-[10px] font-bold tracking-wide block">LAYANAN</span>
                                <span className="text-[10px] font-bold tracking-wide block">UNGGULAN</span>
                            </div>
                        </div>
                    )}
                </motion.div>
                
                {/* Bagian Konten Teks (Preview di Card menggunakan Excerpt) */}
                <div className="mt-5 px-1 pb-2 flex-grow flex flex-col">
                    <motion.h3 
                        layoutId={`card-title-${service.id}`}
                        className="text-green-600 font-bold text-lg mb-3 leading-snug"
                    >
                        {service.title}
                    </motion.h3>
                    
                    {/* Menggunakan excerpt untuk tampilan card agar rapi */}
                    <div className="text-gray-800 text-xs font-bold leading-relaxed line-clamp-4">
                        {service.excerpt || 'Klik untuk melihat detail layanan ini.'}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- KOMPONEN UTAMA ---
export default function ServiceIndex({ services }) {
    const [selectedService, setSelectedService] = useState(null);

    // Kunci scroll body saat modal terbuka
    useEffect(() => {
        if (selectedService) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedService]);

    return (
        <>
            <Head title="Layanan" />

            <div className="bg-white min-h-screen">
                {/* Header Banner */}
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
                        LAYANAN
                    </h1>
                    <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed max-w-xs md:max-w-none mx-auto">
                        Informasi tentang semua layanan yang ada di Klinik Pratama Unimus.
                    </p>
                </div>
            </div>

                {/* Grid Layanan */}
                <div className="container max-w-7xl mx-auto px-4 py-16">
                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <ServiceCard 
                                    key={service.id} 
                                    service={service} 
                                    onClick={setSelectedService} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 font-medium">Belum ada layanan yang dipublikasikan saat ini.</p>
                        </div>
                    )}
                </div>

                {/* --- MODAL POPUP --- */}
                <AnimatePresence>
                    {selectedService && (
                        <>
                            {/* Backdrop Gelap */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedService(null)}
                                className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                            />

                            {/* Modal Container */}
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    layoutId={`card-container-${selectedService.id}`}
                                    className="bg-white w-full max-w-lg max-h-[85vh] rounded-[30px] overflow-hidden shadow-2xl flex flex-col pointer-events-auto relative"
                                >
                                    
                                    {/* Tombol Close (Silang) */}
                                    <button 
                                        onClick={() => setSelectedService(null)}
                                        className="absolute top-4 right-4 z-30 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 rounded-full p-2 backdrop-blur-md transition-all shadow-sm group"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    {/* Scrollable Content Area */}
                                    <div className="overflow-y-auto custom-scrollbar h-full flex flex-col">
                                        
                                        {/* Gambar Header Modal */}
                                        <motion.div 
                                            layoutId={`card-image-container-${selectedService.id}`}
                                            className="relative w-full h-56 flex-shrink-0"
                                        >
                                            <motion.img 
                                                layoutId={`card-image-${selectedService.id}`}
                                                src={selectedService.image_path} 
                                                alt={selectedService.title} 
                                                className="w-full h-full object-cover" 
                                            />
                                            
                                            {/* Badge Unggulan (jika ada) */}
                                            {selectedService.is_featured === 1 && (
                                                <div className="absolute top-6 right-16 z-20 filter drop-shadow-md">
                                                    <div 
                                                        className="bg-[#1ca548] text-white py-1.5 pl-6 pr-3 flex flex-col items-center justify-center leading-none"
                                                        style={{ 
                                                            clipPath: 'polygon(0 50%, 12px 0, 100% 0, 100% 100%, 12px 100%)'
                                                        }}
                                                    >
                                                        <span className="text-[10px] font-bold tracking-wide block">LAYANAN</span>
                                                        <span className="text-[10px] font-bold tracking-wide block">UNGGULAN</span>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>

                                        {/* Konten Text Modal */}
                                        <div className="p-6">
                                            <motion.h3 
                                                layoutId={`card-title-${selectedService.id}`}
                                                className="text-2xl text-green-600 font-bold mb-4"
                                            >
                                                {selectedService.title}
                                            </motion.h3>

                                            {/* 
                                                DESKRIPSI LENGKAP DARI DATABASE (KOLOM CONTENT)
                                                Menggunakan dangerouslySetInnerHTML karena biasanya 'content' dari editor teks berupa HTML.
                                            */}
                                            <motion.div 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2, duration: 0.3 }}
                                                className="prose prose-sm prose-green max-w-none text-gray-600"
                                            >
                                                {selectedService.content ? (
                                                    <div dangerouslySetInnerHTML={{ __html: selectedService.content }} />
                                                ) : (
                                                    // Fallback jika kolom content kosong, bisa pakai excerpt atau pesan default
                                                    <p className="text-gray-500 italic">
                                                        {selectedService.excerpt || 'Belum ada deskripsi lengkap untuk layanan ini.'}
                                                    </p>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

// Layout
ServiceIndex.layout = page => <AppLayout children={page} />;
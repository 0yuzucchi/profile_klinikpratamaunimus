import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function BpjsIndex() {
    return (
        <>
            <Head title="Prosedur Pindah Faskes BPJS" />
            
            <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-800">
                
                {/* HERO SECTION */}
                <div className="relative h-64 md:h-80 bg-gray-900 overflow-hidden mb-12">
                    {/* Background Image */}
                    <img 
                        src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/tampakdepan.webp" 
                        alt="Gedung Klinik" 
                        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]" 
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent"></div>
                    
                    {/* Title */}
                    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-lg">
                            PROSEDUR PINDAH FASKES BPJS
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl space-y-16">
                    
                    {/* SECTION 1: DESKRIPSI PROSEDUR */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-l-4 border-green-500 pl-4">
                            Deskripsi Prosedur:
                        </h2>
                        <ul className="list-disc list-outside ml-6 space-y-3 text-gray-700 text-lg leading-relaxed">
                            <li>
                                Melayani proses pemindahan faskes 1 (untuk pemindahan ke Klinik Pratama UNIMUS) via Chat atau Langsung di Jam Kerja
                            </li>
                            <li>
                                Melayani tanya jawab seputar pemindahan faskes
                            </li>
                            <li>
                                Prosedur Pemindahan FASKES secara Mandiri
                            </li>
                            <li>
                                Bisa menghubungi nomor : <span className="font-bold text-green-600">Humas (089675873994)</span>
                            </li>
                        </ul>
                    </div>

                    {/* SECTION 2: GRID GAMBAR (PANDAWA & MOBILE JKN) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        
                        {/* Kolom Kiri: Pandawa */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase mb-6 text-center tracking-tight">
                                PINDAH FASKES VIA WA PANDAWA
                            </h3>
                            <div className="bg-white p-2 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full">
                                <img 
                                    src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/PINDAH%20FASKES%20PANDAWA.png" 
                                    alt="Cara Pindah Faskes via WA Pandawa" 
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Kolom Kanan: Mobile JKN */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase mb-6 text-center tracking-tight">
                                PINDAH FASKES VIA MOBILE JKN
                            </h3>
                            <div className="bg-white p-2 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full">
                                <img 
                                    src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/PINDAH%20FASKES%20MOBILE%20JKN.png" 
                                    alt="Cara Pindah Faskes via Mobile JKN" 
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>

                    </div>

                    {/* SECTION 3: BPJS BARU MANDIRI (CENTER) */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase mb-6 text-center tracking-tight">
                            BUAT BPJS BARU MANDIRI
                        </h3>
                        <div className="bg-white p-2 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-2xl w-full">
                            <img 
                                src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/BUAT%20BPJS%20BARU%20MANDIRI.png" 
                                alt="Buat BPJS Baru Mandiri" 
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

BpjsIndex.layout = page => <AppLayout children={page} />;
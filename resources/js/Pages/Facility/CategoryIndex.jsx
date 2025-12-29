import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function FasilitasPerawatan({ facilities, pageTitle, pageDescription }) {

    // --- DATA MOCKUP ---
    const staticFacilities = [
        {
            id: 'static-1',
            title: "RUANG RAWAT INAP",
            image_path: "https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/rawat-inap.jpg",
            amenities: ["1 Tempat Tidur", "1 Kursi Penunggu Pasien", "Kipas Angin", "Almari loker", "Meja Makan", "Kamar mandi luar", "Free Wi-Fi"]
        },
        {
            id: 'static-2',
            title: "RUANG NIFAS",
            image_path: "https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/ruang-nifas.jpg",
            amenities: ["1 Tempat Tidur", "AC", "Box Bayi", "Meja Makan", "Kamar mandi luar"]
        }
    ];

    // Menambahkan fasilitas dari gambar ke mockup untuk memastikan tampilan sesuai
    const amenitiesFromImage = ["1 Tempat Tidur", "1 Kursi Penunggu Pasien", "Kipas Angin", "Almari loker", "Meja Makan", "Kamar mandi luar", "Free Wi-Fi"];
    if (staticFacilities[0] && staticFacilities[0].amenities) {
        // Gabungkan dan hapus duplikat untuk demo
        const combinedAmenities = [...new Set([...amenitiesFromImage, ...staticFacilities[0].amenities])];
        staticFacilities[0].amenities = amenitiesFromImage; // Set sesuai gambar
    }


    const dataToShow = (facilities && facilities.length > 0) ? facilities : staticFacilities;

    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/800x400?text=No+Image';
        return path.startsWith('http') ? path : `/storage/${path}`;
    };

    // --- FUNGSI UNTUK EKSTRAK DAFTAR FASILITAS ---
    const extractAmenities = (content) => {
        // Jika content kosong/null, return array kosong
        if (!content) return [];

        try {
            // 1. Jika content sudah berupa array langsung
            if (Array.isArray(content)) {
                return content.map(item => {
                    // Format dari Filament: { item: "Nama Fasilitas" }
                    if (item && typeof item === 'object' && item.item) {
                        return item.item;
                    }
                    // Jika sudah string langsung
                    if (typeof item === 'string') {
                        return item;
                    }
                    return null;
                }).filter(Boolean); // Hapus null/undefined
            }

            // 2. Jika content adalah string (JSON stringified)
            if (typeof content === 'string') {
                const trimmed = content.trim();

                // Cek jika string kosong
                if (!trimmed) return [];

                // Coba parse JSON
                try {
                    const parsed = JSON.parse(trimmed);
                    if (Array.isArray(parsed)) {
                        return parsed.map(item => {
                            if (item && typeof item === 'object' && item.item) {
                                return item.item;
                            }
                            if (typeof item === 'string') {
                                return item;
                            }
                            return null;
                        }).filter(Boolean);
                    }
                    // Jika parsed adalah object, coba ambil values
                    if (parsed && typeof parsed === 'object') {
                        const values = Object.values(parsed);
                        return values.map(item => {
                            if (item && typeof item === 'object' && item.item) {
                                return item.item;
                            }
                            if (typeof item === 'string') {
                                return item;
                            }
                            return null;
                        }).filter(Boolean);
                    }
                } catch (e) {
                    // Jika bukan JSON valid, anggap sebagai string biasa
                    console.log("Content bukan JSON:", e);
                    return [];
                }
            }

            // 3. Jika content adalah object (bukan array)
            if (content && typeof content === 'object' && !Array.isArray(content)) {
                const values = Object.values(content);
                return values.map(item => {
                    if (item && typeof item === 'object' && item.item) {
                        return item.item;
                    }
                    if (typeof item === 'string') {
                        return item;
                    }
                    return null;
                }).filter(Boolean);
            }
        } catch (error) {
            console.error("Error extracting amenities:", error, "Content:", content);
        }

        return [];
    };

    return (
        <AppLayout>
            <Head title="Fasilitas Perawatan" />

            <div className="bg-white min-h-screen overflow-hidden relative">

                {/* HEADER */}
                <div className="relative h-56 z-30 md:h-64 bg-gray-900 flex flex-col justify-center items-center text-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/tampakdepan.webp"
                            alt="Background"
                            className="absolute top-0 left-0 w-full h-full object-cover opacity-40 blur-[2px]"
                        />
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-2">
                            {pageTitle || "FASILITAS PERAWATAN"}
                        </h1>
                        <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed max-w-xs md:max-w-none mx-auto">
                            {pageDescription || "Bagian ini menampilkan sarana dan prasarana yang tersedia di klinik untuk menunjang pelayanan kepada pasien."}
                        </p>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="relative py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-20">

                    {/* Background Decor */}
                    <div className="absolute -top-32 -right-80 w-[32rem] h-[32rem] border-[38px] border-[#00b050] rounded-full opacity-80 z-0 hidden lg:block pointer-events-none"></div>
                    <div className="absolute -bottom-56 -left-80 w-[32rem] h-[32rem] border-[38px] border-[#00b050] rounded-full opacity-80 z-0 hidden lg:block pointer-events-none"></div>
                    {dataToShow.map((item, index) => {
                        // Ekstrak daftar fasilitas dari content
                        const amenitiesList = extractAmenities(item.content);

                        // Fallback ke mockup data jika tidak ada content dari database
                        const finalAmenities = amenitiesList.length > 0 ? amenitiesList :
                            (item.amenities || []);

                        return (
                            <div key={item.id || index} className="relative z-10 ">
                                <div className="bg-white rounded-[30px] shadow-[0_10px_60px_-15px_#00A54F40] p-20 md:p-24 border border-gray-100">

                                    <h2 className="text-3xl font-extrabold text-center text-black uppercase mb-10 tracking-wide">
                                        {item.title}
                                    </h2>

                                    <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-8 bg-gray-200">
                                        <img
                                            src={getImageUrl(item.image_path)}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Image+Error'; }}
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-black mb-4">
                                            Tersedia:
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                            {finalAmenities.length > 0 ? (
                                                finalAmenities.map((text, i) => (
                                                    <AmenityPill key={i} text={text} />
                                                ))
                                            ) : (
                                                <p className="text-gray-500 italic col-span-2 text-center">
                                                    Detail fasilitas belum ditambahkan.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -z-10 top-1/2 -right-10 w-20 h-20 bg-green-100 rounded-full blur-2xl opacity-50"></div>
                            </div>
                        );
                    })}
                </div>

                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4">
                    <div className="w-96 h-96 bg-[#00b050] rounded-full opacity-10 blur-3xl"></div>
                </div>

            </div>
        </AppLayout>
    );
}

const AmenityPill = ({ text }) => (
    <div className="inline-flex items-center bg-[#00b050] rounded-full p-1 w-fit">
        <div className="flex-shrink-0 bg-white rounded-full p-1.5 mr-3">
            <svg className="w-4 h-4 text-[#00b050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>
        <span className="text-white font-semibold text-base pr-4">
            {text}
        </span>
    </div>
);
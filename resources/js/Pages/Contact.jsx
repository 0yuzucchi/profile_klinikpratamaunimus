import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

// --- Komponen Ikon SVG Statis (Untuk Alamat, WA, Email) ---
const PinIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);
const WhatsappIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);
const EmailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
);

export default function ContactPage({ setting }) {
    
    // Data default jika database kosong
    const fallbackData = {
        address: "Jl. Petek Kp. Gayam RT. 02 RW. 06, Kel. Dadapsari, Kec. Semarang Utara., Semarang, Indonesia",
        whatsapp_registration: "+62 895-6168-33383",
        whatsapp_information: "+62 896-7587-3994",
        email: "klinikpratamarawatinap@unimus.ac.id",
        google_maps_link: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3168233345465!2d110.42171817499695!3d-6.9719119930287235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70f3531649364b%3A0xf5980a3746a67137!2sKlinik%20Pratama%20UNIMUS!5e0!3m2!1sen!2sid!4v1709623694657!5m2!1sen!2sid",
        social_media: {}
    };

    const safeSetting = setting || {};

    const displayData = {
        address: safeSetting.address || fallbackData.address,
        waReg: safeSetting.whatsapp_registration || fallbackData.whatsapp_registration,
        waInfo: safeSetting.whatsapp_information || fallbackData.whatsapp_information,
        email: safeSetting.email || fallbackData.email,
        mapsLink: safeSetting.google_maps_link || fallbackData.google_maps_link,
        socials: safeSetting.social_media || fallbackData.social_media
    };

    // Mengubah Object sosmed dari database menjadi Array agar bisa di-loop
    // Struktur DB: { "uuid": { platform: "...", link: "...", icon: "..." }, ... }
    const socialMediaList = displayData.socials ? Object.values(displayData.socials) : [];

    return (
        <>
            <Head title="Kontak - Klinik Pratama UNIMUS" />

            {/* Banner Header */}
            <div className="relative h-64 bg-gray-900 flex flex-col justify-center items-center text-center overflow-hidden">
                <img 
                    src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/tampakdepan.webp" 
                    alt="Background" 
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-40 blur-[2px]" 
                />
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase mb-2">KONTAK</h1>
                    <p className="text-gray-200 text-sm md:text-base font-medium">
                        Hubungi Klinik Pratama Unimus melalui sosial media.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white py-20 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
                    
                    {/* Grid Utama: Kiri (Info) & Kanan (Gambar Arch) */}
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mb-24">
                        
                        {/* 1. BAGIAN KIRI: Informasi Kontak */}
                        <div className="w-full lg:w-1/2 flex flex-col space-y-10">
                            
                            {/* Alamat Block */}
                            <div>
                                <div className="inline-flex items-center justify-center bg-[#00b050] p-3 rounded-xl shadow-md mb-6">
                                    <PinIcon className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-xl md:text-3xl font-bold text-gray-800 leading-snug">
                                    {displayData.address}
                                </h2>
                            </div>

                            {/* Contact Grid (WA & Email) */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* WA Pendaftaran */}
                                <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
                                    <div className="bg-[#00b050] w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm">
                                        <WhatsappIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="font-extrabold text-gray-800 text-sm">{displayData.waReg}</p>
                                    <p className="text-xs font-bold text-gray-500 mt-1">(Pendaftaran)</p>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
                                    <div className="bg-[#00b050] w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm">
                                        <EmailIcon className="w-6 h-6 text-white" />
                                    </div>
                                    {/* Email Dinamis */}
                                    <p className="font-extrabold text-gray-800 text-sm break-all">
                                        {displayData.email}
                                    </p>
                                </div>

                                {/* WA Informasi */}
                                <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
                                    <div className="bg-[#00b050] w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm">
                                        <WhatsappIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="font-extrabold text-gray-800 text-sm">{displayData.waInfo}</p>
                                    <p className="text-xs font-bold text-gray-500 mt-1">(Informasi)</p>
                                </div>
                            </div>

                            {/* Garis Pembatas Tebal */}
                            <div className="border-b-2 border-gray-800 w-full opacity-80"></div>

                            {/* Sosial Media Section */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Sosial Media</h3>
                                <div className="flex flex-wrap gap-4">
                                    
                                    {socialMediaList.length > 0 ? (
                                        socialMediaList.map((item, index) => (
                                            <a 
                                                key={index} 
                                                href={item.link || '#'} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                title={item.platform}
                                                className="bg-[#00b050] w-12 h-12 flex items-center justify-center rounded-lg hover:bg-[#00994d] transition-all duration-300 shadow-md hover:-translate-y-1"
                                            >
                                                {/* 
                                                    Menampilkan ikon dari Supabase. 
                                                    'brightness-0 invert' digunakan agar ikon berwarna PUTIH 
                                                    (karena background tombol hijau).
                                                */}
                                                <img 
                                                    src={item.icon} 
                                                    alt={item.platform} 
                                                    className="w-6 h-6 object-contain brightness-0 invert" 
                                                />
                                            </a>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 italic">Belum ada sosial media yang ditautkan.</span>
                                    )}

                                </div>
                            </div>
                        </div>

                        {/* 2. BAGIAN KANAN: Gambar Gedung (Arch Shape) */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                             {/* Container Arch */}
                            <div className="relative w-full max-w-md aspect-[4/5]"> 
                                {/* Shape Arch */}
                                <div className="absolute inset-0 rounded-t-[10rem] md:rounded-t-[12rem] rounded-b-none overflow-hidden shadow-2xl bg-gray-200">
                                    <img 
                                        src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/tampakdepan.webp" 
                                        alt="Gedung Klinik Pratama Unimus" 
                                        className="w-full h-full object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 3. BAGIAN PETA */}
                    <div className="w-full mt-12">
                        <div className="flex items-center gap-3 mb-6">
                            <PinIcon className="w-6 h-6 text-[#00b050]" />
                            <h3 className="text-2xl font-bold text-gray-800">Lokasi Klinik</h3>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-[400px] md:h-[500px] w-full bg-gray-100 relative">
                            <iframe 
                                src={displayData.mapsLink}
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                title="Google Maps Klinik Unimus"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

ContactPage.layout = page => <AppLayout children={page} />;
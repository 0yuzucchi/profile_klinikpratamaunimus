import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { motion } from 'framer-motion';

// Helper untuk placeholder jika gambar gagal dimuat
const softDummyUserIcon = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E5E7EB'><path fill-rule='evenodd' d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z' clip-rule='evenodd' /></svg>";

// [MODIFIED] Komponen untuk menampilkan jadwal harian (styling disesuaikan)
const ScheduleDay = ({ day, time }) => (
    <div className="text-center">
        <div className="bg-[#16a34a] text-white text-sm font-semibold py-2 rounded-t-md">
            {day}
        </div>
        <div className="bg-white border border-t-0 border-gray-200 text-gray-700 font-medium py-3 rounded-b-md h-12 flex items-center justify-center">
            {time || '—'}
        </div>
    </div>
);

// [REPLACED] Komponen Kartu Dokter Utama yang sudah didesain ulang
// [REPLACED] Komponen Kartu Dokter Utama dengan penyesuaian Jadwal
const DoctorCard = ({ doctor }) => {
    const daysOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    
    // Mengambil data jadwal dari prop `doctor`
    const scheduleData = doctor.schedules && doctor.schedules.length > 0 ? doctor.schedules[0] : {};
    const scheduleItems = daysOrder.map(day => ({
        day,
        time: scheduleData[day.toLowerCase()] || null
    }));

    return (
        <motion.div
            className="bg-[#f0fdf4] ring-2 ring-[#00A54F] rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row items-start gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Kolom Kiri: Foto dan Layanan */}
            <div className="w-full lg:w-auto flex-shrink-0 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left ">
                <div className="flex-shrink-0 ring-2 ring-[#00A54F]  rounded-xl shadow-md inline-block">
                    <img
                        src={doctor.photo || softDummyUserIcon}
                        alt={`Foto ${doctor.name}`}
                        className="w-48 h-auto object-cover rounded-xl bg-gray-200"
                        onError={(e) => { e.target.onerror = null; e.target.src = softDummyUserIcon; }}
                    />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-[#14532d] mb-4">{doctor.name}</h3>
                    <p className="text-gray-700 font-semibold mb-3">Jenis Layanan</p>
                    <div className="flex flex-col items-center sm:items-start gap-2">
                         {doctor.specialization && doctor.specialization.length > 0 ? doctor.specialization.map((service, index) => (
                             <span key={index} className="bg-[#16a34a] text-white text-sm font-semibold px-5 py-2 rounded-full">
                                {service}
                            </span>
                        )) : (
                            <span className="bg-gray-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                                Informasi tidak tersedia
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Kolom Kanan: Jadwal Praktik (SUDAH DISESUAIKAN) */}
            <div className="w-full lg:flex-grow flex flex-col items-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Jadwal Praktik</h4>
                <div className="w-full max-w-xl">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        {scheduleItems.slice(0, 4).map(item => <ScheduleDay key={item.day} day={item.day} time={item.time} />)}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                        {scheduleItems.slice(4).map(item => <ScheduleDay key={item.day} day={item.day} time={item.time} />)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


const DoctorsIndex = ({ doctors = [] }) => {
    const [searchDept, setSearchDept] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');

    const filteredDoctors = useMemo(() => {
        return doctors.filter(doctor => {
            const mainSpecialty = doctor.specialization && doctor.specialization.length > 0 ? doctor.specialization[0] : '';
            const matchesDept = searchDept === '' || (mainSpecialty && mainSpecialty.toLowerCase().includes(searchDept.toLowerCase()));
            const matchesName = selectedDoctor === '' || doctor.id.toString() === selectedDoctor;
            return matchesDept && matchesName;
        });
    }, [doctors, searchDept, selectedDoctor]);


    return (
        <>
            <Head title="Jadwal Dokter - Klinik Pratama UNIMUS" />
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
                        JADWAL DOKTER
                    </h1>
                    <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed max-w-xs md:max-w-none mx-auto">
                        Konsultasi dan Pemeriksaan dengan Dokter di Klinik Pratama Unimus.
                    </p>
                </div>
            </div>
            
            <section id="doctor-schedule" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="mb-12 p-6 bg-white rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Cari Jadwal Dokter</h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <div className="relative w-full md:w-1/3">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Cari Departemen / Poliklinik"
                                    value={searchDept}
                                    onChange={(e) => setSearchDept(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                />
                            </div>
                            <span className="text-gray-500 font-medium">Atau</span>
                            <div className="relative w-full md:w-1/3">
                                 <select
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                    className="w-full appearance-none px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                                >
                                    <option value="">Semua Dokter</option>
                                    {doctors.map(doc => (
                                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                                    ))}
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-lg">Dokter tidak ditemukan.</p>
                                <p className="text-gray-400 mt-2">Silakan coba kata kunci lain atau hapus filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

DoctorsIndex.layout = page => <AppLayout children={page} />;
export default DoctorsIndex;
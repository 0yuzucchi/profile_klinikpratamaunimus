// import React, { useState, useRef, useEffect } from 'react';
// import { Head, Link } from '@inertiajs/react';
// import { route } from 'ziggy-js';
// import { motion, useInView, AnimatePresence } from 'framer-motion';

// // Layout Utama
// import AppLayout from '@/Layouts/AppLayout';

// // --- Komponen Ikon SVG (Tidak ada perubahan) ---
// const StethoscopeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10a5 5 0 015-5h0a5 5 0 015 5v3h-3a2 2 0 00-2 2v2a2 2 0 002 2h3v2a5 5 0 01-5 5h0a5 5 0 01-5-5v-9z"></path><path d="M12 10V2"></path><circle cx="18" cy="4" r="2"></circle></svg>);
// const FlaskIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"></path><path d="M6 3v13.33a4 4 0 004 3.67h4a4 4 0 004-3.67V3"></path><path d="M8 14h8"></path></svg>);
// const SyringeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4"></path><path d="m17 7-6.13 6.13a2 2 0 01-2.83 0L3 8l5-5 5.13 5.13a2 2 0 002.83 0L21 3"></path><path d="m5 19-2 2"></path><path d="m15 9-4 4"></path><path d="m9 15 4-4"></path></svg>);
// const BabyIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 014 4c0 1.48-.8 2.77-2 3.46"></path><path d="M12 2a4 4 0 00-4 4c0 1.48.8 2.77 2 3.46"></path><path d="M12 20c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.31-2.69 6-6 6z"></path><path d="M10 12.5c.5 1 1.5 1.5 3 1.5"></path><path d="M9.5 8c.25 0 .5-.12.5-.25s-.25-.25-.5-.25-.5.12-.5.25.25.25.5.25z"></path><path d="M14.5 8c.25 0 .5-.12.5-.25s-.25-.25-.5-.25-.5.12-.5.25.25.25.5.25z"></path></svg>);
// const WhatsAppIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.29 4.89L2 22l5.25-1.38c1.41.78 2.99 1.21 4.67 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.2 15.2c-.22-.11-.76-.38-1.04-.51s-.39-.11-.56.11-.39.51-.48.62-.18.14-.33.03c-.63-.44-1.38-.86-2.28-1.5-1.03-.73-1.4-1.4-1.56-1.65s-.12-.22 0-.33c.1-.11.22-.28.33-.42s.14-.18.22-.3.04-.15-.02-.28c-.06-.11-.56-1.34-.76-1.84s-.4-.42-.56-.42h-.48c-.18 0-.42.06-.6.3s-.66.65-.66 1.58.68 1.84.78 1.98c.1.14 1.32 2.01 3.2 2.82.44.19.78.3.92.42.28.2.47.17.62.1.18-.08.76-.31.86-.62s.1-.56.08-.62c-.03-.06-.1-.1-.22-.21z"></path></svg>);
// const ClockIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
// const BandageIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-8.5 8.5a5 5 0 007 7L19 9l-7-7z"></path><path d="M14.5 5.5L18.5 9.5"></path></svg>;
// const PillIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-8 4.5v9l8 4.5 8-4.5v-9L12 2z"></path><path d="M12 11v11"></path><path d="M20 9l-8 4.5-8-4.5"></path></svg>;
// const NutritionIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z"></path><path d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0"></path></svg>;
// const ToothIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z"></path><path d="M6 12V4a2 2 0 012-2h8a2 2 0 012 2v8"></path><path d="M10 16h4"></path></svg>;
// const BedIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20v10H2z"></path><path d="M2 9h20"></path><path d="M5 21V9"></path><path d="M19 21V9"></path></svg>;
// const HomeIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
// const AmbulanceIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h8"></path><path d="M12 8v8"></path><path d="M22 12H12l-4-4-4 4h-2"></path><path d="M7 12v-2a2 2 0 012-2h6a2 2 0 012 2v2"></path><path d="M17 12v6h-2v-6"></path><path d="M9 18H7v-6"></path></svg>;
// const ParkingIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9"></path><path d="M10 9H4"></path><path d="M12 13H8"></path><path d="M16 17h-4"></path><path d="M15 3v6h6"></path></svg>;
// const FileTextIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
// const ChevronLeftIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
// const ChevronRightIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;

// // --- Komponen AnimateOnScroll (Standar) ---
// const AnimateOnScroll = ({ children, stagger = 0.15, once = true }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once, amount: 0.2 });

//     const variants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: stagger,
//             },
//         },
//     };

//     return (
//         <motion.div
//             ref={ref}
//             className="container mx-auto px-4"
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             variants={variants}
//         >
//             {children}
//         </motion.div>
//     );
// };

// // --- Komponen Modal ---
// const ServiceModal = ({ service, onClose }) => {
//     if (!service) return null;

//     return (
//         <motion.div
//             className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
//             onClick={onClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//         >
//             <motion.div
//                 className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ duration: 0.3, ease: "easeOut" }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <div className="p-6 md:p-8">
//                     <div className="flex justify-between items-start mb-4">
//                         <div className="flex items-center gap-4">
//                             <div className="text-[#50cd89] flex-shrink-0">
//                                 {getServiceIcon(service.name, "w-12 h-12")}
//                             </div>
//                             <h2 className="text-xl md:text-2xl font-bold text-gray-800">{service.name}</h2>
//                         </div>
//                         <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//                         </button>
//                     </div>
//                     <p className="text-gray-600 leading-relaxed whitespace-pre-line">
//                         {service.description}
//                     </p>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// // --- Data & Fungsi Ikon Layanan ---
// const servicesData = [
//     { id: 1, name: 'Pemeriksaan Dokter Umum 24 Jam', description: 'Layanan konsultasi dan pemeriksaan oleh dokter umum profesional yang siaga 24 jam sehari, 7 hari seminggu. Kami siap menangani keluhan kesehatan umum Anda kapan pun dibutuhkan, baik untuk kondisi akut maupun kronis.' },
//     { id: 2, name: 'Perawatan Luka', description: 'Penanganan komprehensif untuk berbagai jenis luka, mulai dari luka lecet, luka robek, hingga perawatan luka pasca-operasi dan luka diabetes. Kami menggunakan metode modern untuk mempercepat penyembuhan dan mencegah infeksi.' },
//     { id: 3, name: 'Apotek', description: 'Apotek kami menyediakan berbagai macam obat resep maupun obat bebas yang lengkap dan terjamin kualitasnya. Farmasis kami siap memberikan konsultasi mengenai penggunaan obat yang tepat dan aman.' },
//     { id: 4, name: 'Laboratorium', description: 'Fasilitas laboratorium internal untuk pemeriksaan darah, urin, dan sampel lainnya. Hasil yang cepat dan akurat membantu dokter dalam menegakkan diagnosis dan merencanakan pengobatan yang efektif.' },
//     { id: 5, name: 'Konsultasi dan Asuhan Gizi', description: 'Layanan konsultasi dengan ahli gizi untuk membantu Anda merencanakan pola makan yang sehat, sesuai dengan kondisi kesehatan, kebutuhan, dan tujuan Anda, seperti manajemen berat badan atau diet khusus penyakit.' },
//     { id: 6, name: 'Pelayanan KB & Pemeriksaan Kandungan', description: 'Menyediakan berbagai pilihan metode kontrasepsi (KB) serta layanan pemeriksaan kehamilan (Antenatal Care) secara rutin oleh bidan dan dokter terlatih untuk memantau kesehatan ibu dan janin.' },
//     { id: 7, name: 'Persalinan', description: 'Menyediakan fasilitas persalinan yang aman dan nyaman, didukung oleh tim medis yang berpengalaman. Kami mengutamakan keselamatan dan kenyamanan ibu serta bayi selama proses persalinan.' },
//     { id: 8, name: 'Pelayanan Gigi', description: 'Layanan kesehatan gigi dan mulut yang meliputi pemeriksaan, pembersihan karang gigi, penambalan, pencabutan gigi, dan konsultasi estetika gigi untuk senyum yang sehat dan menawan.' },
//     { id: 9, name: 'Rawat Inap', description: 'Fasilitas rawat inap dengan kamar yang bersih dan nyaman untuk pasien yang memerlukan observasi dan perawatan medis lebih intensif. Tim perawat kami siap melayani dengan penuh perhatian.' },
//     { id: 10, name: 'Ruang Tindakan', description: 'Dilengkapi dengan peralatan steril untuk melakukan tindakan medis minor seperti jahit luka, insisi abses, dan prosedur bedah kecil lainnya dengan standar keamanan pasien yang tinggi.' },
//     { id: 11, name: 'Home Care', description: 'Layanan perawatan kesehatan langsung di rumah Anda. Cocok untuk pasien lansia, pasien pasca-rawat inap, atau siapa pun yang membutuhkan pendampingan medis tanpa harus datang ke klinik.' },
//     { id: 12, name: 'Kier Dokter/Surat Keterangan', description: 'Melayani pembuatan surat keterangan sehat, surat keterangan sakit, dan keperluan administrasi lainnya yang memerlukan validasi dari dokter, termasuk pemeriksaan kesehatan untuk kerja atau sekolah.' },
//     { id: 13, name: 'Rujukan & Ambulance', description: 'Kami memiliki sistem rujukan yang terintegrasi dengan rumah sakit rekanan untuk kasus yang memerlukan penanganan spesialis. Layanan ambulance juga tersedia untuk keadaan darurat.' },
//     { id: 14, name: 'Pojok ASI', description: 'Menyediakan ruang khusus yang nyaman dan privat bagi para ibu untuk menyusui bayinya atau memompa ASI, sebagai bentuk dukungan kami terhadap program ASI eksklusif.' },
//     { id: 15, name: 'Tempat Parkir Luas', description: 'Kenyamanan Anda adalah prioritas kami, termasuk saat Anda tiba. Kami menyediakan area parkir yang luas, aman, dan mudah diakses untuk semua jenis kendaraan.' },
// ];
// const getServiceIcon = (serviceName, defaultClass = "w-10 h-10") => {
//     switch (serviceName) {
//         case 'Pemeriksaan Dokter Umum 24 Jam': return <ClockIcon className={defaultClass} />;
//         case 'Perawatan Luka': return <BandageIcon className={defaultClass} />;
//         case 'Apotek': return <PillIcon className={defaultClass} />;
//         case 'Laboratorium': return <FlaskIcon className={defaultClass} />;
//         case 'Konsultasi dan Asuhan Gizi': return <NutritionIcon className={defaultClass} />;
//         case 'Pelayanan KB & Pemeriksaan Kandungan': return <BabyIcon className={defaultClass} />;
//         case 'Persalinan': return <BabyIcon className={defaultClass} />;
//         case 'Pelayanan Gigi': return <ToothIcon className={defaultClass} />;
//         case 'Rawat Inap': return <BedIcon className={defaultClass} />;
//         case 'Ruang Tindakan': return <SyringeIcon className={defaultClass} />;
//         case 'Home Care': return <HomeIcon className={defaultClass} />;
//         case 'Kier Dokter/Surat Keterangan': return <FileTextIcon className={defaultClass} />;
//         case 'Rujukan & Ambulance': return <AmbulanceIcon className={defaultClass} />;
//         case 'Pojok ASI': return <BabyIcon className={defaultClass} />;
//         case 'Tempat Parkir Luas': return <ParkingIcon className={defaultClass} />;
//         default: return <StethoscopeIcon className={defaultClass} />;
//     }
// };

// // --- Data Fasilitas Modern Baru ---
// const facilitiesData = [
//     {
//         id: 1,
//         name: 'Ruang Persalinan',
//         description: 'Fasilitas persalinan yang steril, aman, dan nyaman, didukung oleh tim medis terlatih untuk memastikan proses persalinan berjalan lancar.',
//         imagePath: '/storage/ruangpersalinan.webp'
//     },
//     {
//         id: 2,
//         name: 'Ruang KIA',
//         description: 'Ruang khusus untuk pelayanan Kesehatan Ibu dan Anak (KIA) yang meliputi imunisasi, pemeriksaan tumbuh kembang anak, dan konsultasi kesehatan ibu.',
//         imagePath: '/storage/ruangKIA.webp'
//     },
//     {
//         id: 3,
//         name: 'Laboratorium Internal',
//         description: 'Mempercepat proses diagnosis dengan fasilitas laboratorium internal yang akurat dan efisien untuk berbagai jenis pemeriksaan darah, urin, dan sampel lainnya.',
//         imagePath: '/storage/laboratorium.webp'
//     },
//     {
//         id: 4,
//         name: 'Ruang Gigi',
//         description: 'Dilengkapi dengan peralatan modern untuk berbagai perawatan gigi, mulai dari pemeriksaan rutin, pembersihan karang gigi, penambalan, hingga pencabutan gigi.',
//         imagePath: '/storage/ruanggigi.webp'
//     },
//     {
//         id: 5,
//         name: 'Kamar Rawat Inap',
//         description: 'Kamar rawat inap yang bersih, nyaman, dan tenang untuk pemulihan pasien yang membutuhkan observasi dan perawatan medis intensif, dengan pengawasan perawat 24 jam.',
//         imagePath: '/storage/ruangranap.webp'
//     },
//     {
//         id: 6,
//         name: 'Ruang Tindakan',
//         description: 'Area steril yang dilengkapi dengan instrumen lengkap untuk melakukan tindakan medis minor seperti penanganan luka, insisi abses, dan prosedur bedah kecil lainnya dengan standar keamanan tinggi.',
//         imagePath: '/storage/ruangtindakan.webp'
//     },
// ];


// // --- Variants Animasi ---
// const dynamicContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
// const dynamicItemVariants = { hidden: { y: 20, opacity: 0, scale: 0.95, rotate: "-2deg" }, visible: { y: 0, opacity: 1, scale: 1, rotate: "0deg", transition: { type: "spring", stiffness: 100 } } };
// const dynamicTitleVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
// const simpleItemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

// // --- Komponen Typewriter ---
// const Typewriter = ({ text, className }) => {
//     const chars = Array.from(text);
//     const container = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { staggerChildren: 0.03 } } // Kecepatan ketikan
//     };
//     const child = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { duration: 0.01 } } // Karakter muncul instan
//     };

//     return (
//         <motion.p
//             className={className}
//             variants={container}
//             initial="hidden"
//             animate="visible"
//             aria-label={text}
//         >
//             {chars.map((char, index) => (
//                 <motion.span variants={child} key={index} aria-hidden="true">
//                     {char === ' ' ? '\u00A0' : char}
//                 </motion.span>
//             ))}
//         </motion.p>
//     );
// };


// // --- Komponen Utama ---
// const LandingPage = ({ contact = {} }) => {

//     const [selectedService, setSelectedService] = useState(null);
//     const [textIndex, setTextIndex] = useState(0);

//     // --- State dan Ref untuk slider layanan ---
//     const servicesScrollRef = useRef(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [scrollLeft, setScrollLeft] = useState(0);

//     const typewriterTexts = [
//         "Pelayanan kesehatan modern, profesional, dan sepenuh hati.",
//         "Akses kesehatan terjangkau untuk semua kalangan.",
//         "Didukung tim medis berpengalaman dan terpercaya.",
//         "Kenyamanan & kesembuhan Anda adalah prioritas kami.",
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setTextIndex(prevIndex => (prevIndex + 1) % typewriterTexts.length);
//         }, 5000); // Ganti teks setiap 5 detik

//         return () => clearInterval(interval);
//     }, []);

//     // --- Fungsi untuk menggeser slider layanan ---
//     const handleArrowScroll = (direction) => {
//         const container = servicesScrollRef.current;
//         if (container) {
//             const scrollAmount = container.offsetWidth * 0.8; // Geser sejauh 80% lebar kontainer
//             container.scrollBy({
//                 left: direction === 'left' ? -scrollAmount : scrollAmount,
//                 behavior: 'smooth'
//             });
//         }
//     };

//     // --- Event handler untuk mouse drag ---
//     const onMouseDown = (e) => {
//         if (!servicesScrollRef.current) return;
//         setIsDragging(true);
//         setStartX(e.pageX - servicesScrollRef.current.offsetLeft);
//         setScrollLeft(servicesScrollRef.current.scrollLeft);
//         servicesScrollRef.current.style.cursor = 'grabbing';
//     };

//     const onMouseLeaveOrUp = () => {
//         if (!servicesScrollRef.current) return;
//         setIsDragging(false);
//         servicesScrollRef.current.style.cursor = 'grab';
//     };

//     const onMouseMove = (e) => {
//         if (!isDragging || !servicesScrollRef.current) return;
//         e.preventDefault();
//         const x = e.pageX - servicesScrollRef.current.offsetLeft;
//         const walk = (x - startX) * 1.5; // Kalikan untuk pergerakan lebih cepat
//         servicesScrollRef.current.scrollLeft = scrollLeft - walk;
//     };


//     return (
//         <>
//             <Head title="Klinik Pratama UNIMUS" />

//             <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

//             <section id="hero" className="py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-white to-[#e6faef]">
//     <AnimateOnScroll stagger={0.2} once={false}>
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-16">
//             <div className="text-center md:text-left">
//                 <motion.h1 variants={simpleItemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 tracking-tight leading-tight">
//                     KLINIK PRATAMA UNIMUS
//                 </motion.h1>
//                 <motion.p variants={simpleItemVariants} className="mt-2 text-lg sm:text-xl lg:text-2xl font-semibold text-green-600">
//                     Melayani Ummat, Menebar Manfaat
//                 </motion.p>

//                 <div className="w-full mt-6 mb-10 text-lg text-gray-600 min-h-[96px] flex items-center justify-center md:justify-start">
//                     <AnimatePresence mode="wait">
//                         <Typewriter
//                             key={textIndex}
//                             text={typewriterTexts[textIndex]}
//                             className="max-w-full [overflow-wrap:anywhere]"
//                         />
//                     </AnimatePresence>
//                 </div>
//                 <motion.div variants={simpleItemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//                     <button onClick={() => document.getElementById('pendaftaran').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-3 rounded-full font-bold text-white bg-[#50cd89] hover:bg-[#38a36a] transition-all duration-300 transform hover:scale-105 shadow-lg">
//                         Daftar Sekarang
//                     </button>
//                     <button onClick={() => document.getElementById('layanan').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-3 rounded-full font-bold text-[#38a36a] border-2 border-[#50cd89] hover:bg-[#50cd89] hover:text-white transition-colors duration-300">
//                         Lihat Layanan
//                     </button>
//                 </motion.div>
//             </div>
            
//             <div className="mt-12 md:mt-0 flex justify-center">
//                 {/* 
//                   FRAME DISESUAIKAN: 
//                   - Menghapus 'aspect-square' agar bingkai mengikuti rasio aspek gambar.
//                   - Menghapus 'flex', 'items-center', 'justify-center' karena tidak lagi diperlukan.
//                   - Menambahkan 'overflow-hidden' untuk memastikan gambar tetap di dalam sudut bingkai yang bulat.
//                 */}
//                 <div className="w-full max-w-md bg-gray-200 rounded-2xl shadow-xl border-4 border-white overflow-hidden">
//                     <img src="/storage/Dokter.jpg" alt="Foto Dokter" className="w-full h-80 object-cover"/>
//                 </div>
//             </div>
//         </div>
//     </AnimateOnScroll>
// </section>

//             <section id="tentang" className="py-16 bg-white overflow-hidden">
//                 <AnimateOnScroll>
//                     <div className="flex flex-col md:flex-row items-center gap-12">
//                         {/* ========== ANIMASI DIHILANGKAN DARI GAMBAR TENTANG KAMI ========== */}
//                         <div className="md:w-1/2">
//                             <img
//                                 src="/storage/tampakdepan.webp"
//                                 alt="Foto Gedung Klinik Pratama UNIMUS"
//                                 className="w-full h-80 object-cover rounded-lg shadow-lg"
//                                 loading="lazy"
//                                 decoding="async"
//                             />
//                         </div>
//                         <div className="md:w-1/2 text-center md:text-left">
//                             <motion.h2 variants={simpleItemVariants} className="text-3xl font-bold text-gray-800 mb-4">Tentang Klinik Kami</motion.h2>
//                             <motion.p variants={simpleItemVariants} className="text-gray-600 leading-relaxed mb-4">
//                                 Klinik Pratama UNIMUS didirikan dengan komitmen untuk menyediakan akses pelayanan kesehatan yang berkualitas, modern, dan terjangkau. Kami memadukan keahlian tim medis profesional dengan teknologi terkini untuk memastikan setiap pasien mendapatkan penanganan yang tepat dan komprehensif.
//                             </motion.p>
//                             <motion.p variants={simpleItemVariants} className="text-gray-600 leading-relaxed">
//                                 Kesehatan dan kenyamanan Anda adalah prioritas utama kami. Selamat datang di keluarga besar Klinik Pratama UNIMUS.
//                             </motion.p>
//                         </div>
//                     </div>
//                 </AnimateOnScroll>
//             </section>

//             <section id="layanan" className="py-16 bg-[#f8f9fa] overflow-hidden">
//                 <motion.div
//                     className="container mx-auto px-4"
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.1 }}
//                 >
//                     <motion.h2 variants={dynamicTitleVariants} className="text-3xl font-bold text-center text-gray-800 mb-10">LAYANAN</motion.h2>
//                     <div className="relative">
//                         <button
//                             onClick={() => handleArrowScroll('left')}
//                             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer transition-opacity opacity-75 hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed -translate-x-4"
//                             aria-label="Geser ke kiri"
//                         >
//                             <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
//                         </button>
//                         <motion.div
//                             ref={servicesScrollRef}
//                             className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar cursor-grab"
//                             variants={dynamicContainerVariants}
//                             onMouseDown={onMouseDown}
//                             onMouseLeave={onMouseLeaveOrUp}
//                             onMouseUp={onMouseLeaveOrUp}
//                             onMouseMove={onMouseMove}
//                         >
//                             {servicesData.map(service => (
//                                 <motion.div
//                                     key={service.id}
//                                     className="flex-shrink-0 w-40 h-40 bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer flex flex-col items-center justify-center border-t-4 border-green-500"
//                                     onClick={(e) => {
//                                         if (Math.abs(servicesScrollRef.current.scrollLeft - scrollLeft) > 5) {
//                                             e.stopPropagation();
//                                         } else {
//                                             setSelectedService(service);
//                                         }
//                                     }}
//                                     variants={dynamicItemVariants}
//                                     whileHover={{ scale: 1.05, y: -8, rotate: "1deg" }}
//                                     whileTap={{ scale: 0.98, rotate: "-1deg" }}
//                                     style={{ userSelect: 'none' }}
//                                 >
//                                     <div className="text-[#50cd89] mb-3 pointer-events-none">{getServiceIcon(service.name)}</div>
//                                     <h3 className="text-sm font-semibold text-gray-800 leading-tight pointer-events-none">{service.name}</h3>
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//                         <button
//                             onClick={() => handleArrowScroll('right')}
//                             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer transition-opacity opacity-75 hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed translate-x-4"
//                             aria-label="Geser ke kanan"
//                         >
//                             <ChevronRightIcon className="w-6 h-6 text-gray-700" />
//                         </button>
//                     </div>
//                 </motion.div>
//             </section>

//             <section id="fasilitas" className="py-16 bg-[#e6faef]">
//                 <motion.div
//                     className="container mx-auto px-4"
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.2 }}
//                 >
//                     <motion.h2 variants={dynamicTitleVariants} className="text-3xl font-bold text-center text-gray-800 mb-12">Fasilitas Modern</motion.h2>
//                     <div
//                         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//                     >
//                         {facilitiesData.map(facility => (
//                             // ========== ANIMASI DIHILANGKAN DARI KARTU FASILITAS ==========
//                             <div key={facility.id}>
//                                 <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full border-t-4 border-green-500">
//                                     <div clasFsName="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
//                                         <img
//                                             src={facility.imagePath}
//                                             alt={`Foto ${facility.name}`}
//                                             className="w-full h-full object-cover"
//                                             loading="lazy"
//                                             decoding="async"
//                                             onError={(e) => { e.target.onerror = null; e.target.parentElement.innerHTML = `<span class="text-center p-4">Gambar ${facility.name} tidak tersedia</span>`; }}
//                                         />
//                                     </div>
//                                     <div className="p-6">
//                                         <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.name}</h3>
//                                         <p className="text-gray-600 text-sm">{facility.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </motion.div>
//             </section>

//             <section id="ulasan-google" className="py-16 bg-white overflow-hidden">
//                 <AnimateOnScroll>
//                     <div className='text-center'>
//                         <motion.div variants={simpleItemVariants}>
//                             <h2 className="text-3xl font-bold text-gray-800 mb-4">Ulasan Pasien Kami di Google</h2>
//                             <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
//                                 Kami bangga dapat memberikan pelayanan terbaik. Lihat apa kata mereka yang telah mempercayakan kesehatannya kepada kami.
//                             </p>
//                         </motion.div>
//                         <motion.div variants={simpleItemVariants} className="flex justify-center">
//                             <div className="w-full">
//                                 <script src="https://elfsightcdn.com/platform.js" async></script>
//                                 <div className="elfsight-app-95ae2db7-32f6-4ebc-b191-b5b0ebeda6dc" data-elfsight-app-lazy></div>
//                             </div>
//                         </motion.div>
//                         <motion.div variants={simpleItemVariants} className="text-center mt-12">
//                             <a href="https://search.google.com/local/reviews?placeid=ChIJ1YCDqxT1cC4Rn7_7w29e3n8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-white bg-[#50cd89] hover:bg-[#38a36a] transition-colors duration-300">
//                                 Lihat Semua Ulasan di Google
//                             </a>
//                         </motion.div>
//                     </div>
//                 </AnimateOnScroll>
//             </section>

//             <section id="pendaftaran" className="py-16 bg-[#f8f9fa] overflow-hidden">
//                 <AnimateOnScroll>
//                     <div className="text-center">
//                         <motion.div variants={simpleItemVariants}>
//                             <h2 className="text-3xl font-bold text-gray-800 mb-4">Daftar Online Sekarang</h2>
//                             <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//                                 Ingin mendaftar? Klik tombol di bawah untuk terhubung langsung dengan admin kami melalui WhatsApp.
//                             </p>
//                         </motion.div>
//                         {/* <motion.a variants={simpleItemVariants} href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white bg-[#50cd89] hover:bg-[#38a36a] transition-colors duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"> */}
//                         <motion.a variants={simpleItemVariants} href={`/ai-consultation`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white bg-[#50cd89] hover:bg-[#38a36a] transition-colors duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
//                             <WhatsAppIcon className="w-6 h-6 mr-3" />
//                             Daftar Online via WhatsApp
//                         </motion.a>
//                     </div>
//                 </AnimateOnScroll>
//             </section>

//             <section id="kontak-cta" className="py-16 bg-white overflow-hidden">
//                 <AnimateOnScroll>
//                     <div className="text-center">
//                         <motion.div variants={simpleItemVariants}>
//                             <h2 className="text-3xl font-bold text-gray-800 mb-4">Butuh Bantuan atau Informasi?</h2>
//                             <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//                                 Temukan lokasi kami, lihat jam operasional, atau hubungi kami langsung melalui telepon dan email.
//                             </p>
//                         </motion.div>
//                         <motion.div variants={simpleItemVariants}>
//                             <Link href={route('contact')} className="px-6 py-3 rounded-full font-semibold text-[#50cd89] border-2 border-[#50cd89] hover:bg-[#50cd89] hover:text-white transition-colors duration-300 inline-block">
//                                 Lihat Info Kontak & Lokasi
//                             </Link>
//                         </motion.div>
//                     </div>
//                 </AnimateOnScroll>
//             </section>

//             <AnimatePresence>
//                 {selectedService && (
//                     <ServiceModal
//                         service={selectedService}
//                         onClose={() => setSelectedService(null)}
//                     />
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };

// LandingPage.layout = page => <AppLayout children={page} />;

// export default LandingPage;



























import React, { useState, useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Layout Utama
import AppLayout from '@/Layouts/AppLayout';

// --- Komponen Ikon SVG (Tidak ada perubahan) ---
const StethoscopeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10a5 5 0 015-5h0a5 5 0 015 5v3h-3a2 2 0 00-2 2v2a2 2 0 002 2h3v2a5 5 0 01-5 5h0a5 5 0 01-5-5v-9z"></path><path d="M12 10V2"></path><circle cx="18" cy="4" r="2"></circle></svg>);
const FlaskIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"></path><path d="M6 3v13.33a4 4 0 004 3.67h4a4 4 0 004-3.67V3"></path><path d="M8 14h8"></path></svg>);
const SyringeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4"></path><path d="m17 7-6.13 6.13a2 2 0 01-2.83 0L3 8l5-5 5.13 5.13a2 2 0 002.83 0L21 3"></path><path d="m5 19-2 2"></path><path d="m15 9-4 4"></path><path d="m9 15 4-4"></path></svg>);
const BabyIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 014 4c0 1.48-.8 2.77-2 3.46"></path><path d="M12 2a4 4 0 00-4 4c0 1.48.8 2.77 2 3.46"></path><path d="M12 20c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.31-2.69 6-6 6z"></path><path d="M10 12.5c.5 1 1.5 1.5 3 1.5"></path><path d="M9.5 8c.25 0 .5-.12.5-.25s-.25-.25-.5-.25-.5.12-.5.25.25.25.5.25z"></path><path d="M14.5 8c.25 0 .5-.12.5-.25s-.25-.25-.5-.25-.5.12-.5.25.25.25.5.25z"></path></svg>);
const WhatsAppIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.29 4.89L2 22l5.25-1.38c1.41.78 2.99 1.21 4.67 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.2 15.2c-.22-.11-.76-.38-1.04-.51s-.39-.11-.56.11-.39.51-.48.62-.18.14-.33.03c-.63-.44-1.38-.86-2.28-1.5-1.03-.73-1.4-1.4-1.56-1.65s-.12-.22 0-.33c.1-.11.22-.28.33-.42s.14-.18.22-.3.04-.15-.02-.28c-.06-.11-.56-1.34-.76-1.84s-.4-.42-.56-.42h-.48c-.18 0-.42.06-.6.3s-.66.65-.66 1.58.68 1.84.78 1.98c.1.14 1.32 2.01 3.2 2.82.44.19.78.3.92.42.28.2.47.17.62.1.18-.08.76-.31.86-.62s.1-.56.08-.62c-.03-.06-.1-.1-.22-.21z"></path></svg>);
const ClockIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const BandageIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-8.5 8.5a5 5 0 007 7L19 9l-7-7z"></path><path d="M14.5 5.5L18.5 9.5"></path></svg>;
const PillIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-8 4.5v9l8 4.5 8-4.5v-9L12 2z"></path><path d="M12 11v11"></path><path d="M20 9l-8 4.5-8-4.5"></path></svg>;
const NutritionIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z"></path><path d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0"></path></svg>;
const ToothIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z"></path><path d="M6 12V4a2 2 0 012-2h8a2 2 0 012 2v8"></path><path d="M10 16h4"></path></svg>;
const BedIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20v10H2z"></path><path d="M2 9h20"></path><path d="M5 21V9"></path><path d="M19 21V9"></path></svg>;
const HomeIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const AmbulanceIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h8"></path><path d="M12 8v8"></path><path d="M22 12H12l-4-4-4 4h-2"></path><path d="M7 12v-2a2 2 0 012-2h6a2 2 0 012 2v2"></path><path d="M17 12v6h-2v-6"></path><path d="M9 18H7v-6"></path></svg>;
const ParkingIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9"></path><path d="M10 9H4"></path><path d="M12 13H8"></path><path d="M16 17h-4"></path><path d="M15 3v6h6"></path></svg>;
const FileTextIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const ChevronLeftIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
const ChevronRightIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;


// --- [FIX] MEMASUKKAN KEMBALI KOMPONEN HELPER & DATA YANG HILANG ---

const AnimateOnScroll = ({ children, stagger = 0.15, once = true }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.2 });
    const variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: stagger } } };
    return (<motion.div ref={ref} className="container mx-auto px-4" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants}>{children}</motion.div>);
};

const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;
    return (
        <motion.div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} onClick={(e) => e.stopPropagation()}>
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                            <div className="text-[#50cd89] flex-shrink-0">{getServiceIcon(service.name, "w-12 h-12")}</div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{service.name}</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                    </div>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{service.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const servicesData = [
    { id: 1, name: 'Pemeriksaan Dokter Umum 24 Jam', description: 'Layanan konsultasi dan pemeriksaan oleh dokter umum profesional yang siaga 24 jam sehari, 7 hari seminggu. Kami siap menangani keluhan kesehatan umum Anda kapan pun dibutuhkan, baik untuk kondisi akut maupun kronis.' },
    { id: 2, name: 'Perawatan Luka', description: 'Penanganan komprehensif untuk berbagai jenis luka, mulai dari luka lecet, luka robek, hingga perawatan luka pasca-operasi dan luka diabetes. Kami menggunakan metode modern untuk mempercepat penyembuhan dan mencegah infeksi.' },
    { id: 3, name: 'Apotek', description: 'Apotek kami menyediakan berbagai macam obat resep maupun obat bebas yang lengkap dan terjamin kualitasnya. Farmasis kami siap memberikan konsultasi mengenai penggunaan obat yang tepat dan aman.' },
    { id: 4, name: 'Laboratorium', description: 'Fasilitas laboratorium internal untuk pemeriksaan darah, urin, dan sampel lainnya. Hasil yang cepat dan akurat membantu dokter dalam menegakkan diagnosis dan merencanakan pengobatan yang efektif.' },
    { id: 5, name: 'Konsultasi dan Asuhan Gizi', description: 'Layanan konsultasi dengan ahli gizi untuk membantu Anda merencanakan pola makan yang sehat, sesuai dengan kondisi kesehatan, kebutuhan, dan tujuan Anda, seperti manajemen berat badan atau diet khusus penyakit.' },
    { id: 6, name: 'Pelayanan KB & Pemeriksaan Kandungan', description: 'Menyediakan berbagai pilihan metode kontrasepsi (KB) serta layanan pemeriksaan kehamilan (Antenatal Care) secara rutin oleh bidan dan dokter terlatih untuk memantau kesehatan ibu dan janin.' },
    { id: 7, name: 'Persalinan', description: 'Menyediakan fasilitas persalinan yang aman dan nyaman, didukung oleh tim medis yang berpengalaman. Kami mengutamakan keselamatan dan kenyamanan ibu serta bayi selama proses persalinan.' },
    { id: 8, name: 'Pelayanan Gigi', description: 'Layanan kesehatan gigi dan mulut yang meliputi pemeriksaan, pembersihan karang gigi, penambalan, pencabutan gigi, dan konsultasi estetika gigi untuk senyum yang sehat dan menawan.' },
    { id: 9, name: 'Rawat Inap', description: 'Fasilitas rawat inap dengan kamar yang bersih dan nyaman untuk pasien yang memerlukan observasi dan perawatan medis lebih intensif. Tim perawat kami siap melayani dengan penuh perhatian.' },
    { id: 10, name: 'Ruang Tindakan', description: 'Dilengkapi dengan peralatan steril untuk melakukan tindakan medis minor seperti jahit luka, insisi abses, dan prosedur bedah kecil lainnya dengan standar keamanan pasien yang tinggi.' },
    { id: 11, name: 'Home Care', description: 'Layanan perawatan kesehatan langsung di rumah Anda. Cocok untuk pasien lansia, pasien pasca-rawat inap, atau siapa pun yang membutuhkan pendampingan medis tanpa harus datang ke klinik.' },
    { id: 12, name: 'Kier Dokter/Surat Keterangan', description: 'Melayani pembuatan surat keterangan sehat, surat keterangan sakit, dan keperluan administrasi lainnya yang memerlukan validasi dari dokter, termasuk pemeriksaan kesehatan untuk kerja atau sekolah.' },
    { id: 13, name: 'Rujukan & Ambulance', description: 'Kami memiliki sistem rujukan yang terintegrasi dengan rumah sakit rekanan untuk kasus yang memerlukan penanganan spesialis. Layanan ambulance juga tersedia untuk keadaan darurat.' },
    { id: 14, name: 'Pojok ASI', description: 'Menyediakan ruang khusus yang nyaman dan privat bagi para ibu untuk menyusui bayinya atau memompa ASI, sebagai bentuk dukungan kami terhadap program ASI eksklusif.' },
    { id: 15, name: 'Tempat Parkir Luas', description: 'Kenyamanan Anda adalah prioritas kami, termasuk saat Anda tiba. Kami menyediakan area parkir yang luas, aman, dan mudah diakses untuk semua jenis kendaraan.' },
];
const getServiceIcon = (serviceName, defaultClass = "w-10 h-10") => {
    switch (serviceName) {
        case 'Pemeriksaan Dokter Umum 24 Jam': return <ClockIcon className={defaultClass} />; case 'Perawatan Luka': return <BandageIcon className={defaultClass} />; case 'Apotek': return <PillIcon className={defaultClass} />; case 'Laboratorium': return <FlaskIcon className={defaultClass} />; case 'Konsultasi dan Asuhan Gizi': return <NutritionIcon className={defaultClass} />; case 'Pelayanan KB & Pemeriksaan Kandungan': return <BabyIcon className={defaultClass} />; case 'Persalinan': return <BabyIcon className={defaultClass} />; case 'Pelayanan Gigi': return <ToothIcon className={defaultClass} />; case 'Rawat Inap': return <BedIcon className={defaultClass} />; case 'Ruang Tindakan': return <SyringeIcon className={defaultClass} />; case 'Home Care': return <HomeIcon className={defaultClass} />; case 'Kier Dokter/Surat Keterangan': return <FileTextIcon className={defaultClass} />; case 'Rujukan & Ambulance': return <AmbulanceIcon className={defaultClass} />; case 'Pojok ASI': return <BabyIcon className={defaultClass} />; case 'Tempat Parkir Luas': return <ParkingIcon className={defaultClass} />; default: return <StethoscopeIcon className={defaultClass} />;
    }
};
const facilitiesData = [
    { id: 1, name: 'Ruang Persalinan', description: 'Fasilitas persalinan yang steril, aman, dan nyaman, didukung oleh tim medis terlatih untuk memastikan proses persalinan berjalan lancar.', imagePath: '/storage/ruangpersalinan.webp' },
    { id: 2, name: 'Ruang KIA', description: 'Ruang khusus untuk pelayanan Kesehatan Ibu dan Anak (KIA) yang meliputi imunisasi, pemeriksaan tumbuh kembang anak, dan konsultasi kesehatan ibu.', imagePath: '/storage/ruangKIA.webp' },
    { id: 3, name: 'Laboratorium Internal', description: 'Mempercepat proses diagnosis dengan fasilitas laboratorium internal yang akurat dan efisien untuk berbagai jenis pemeriksaan darah, urin, dan sampel lainnya.', imagePath: '/storage/laboratorium.webp' },
    { id: 4, name: 'Ruang Gigi', description: 'Dilengkapi dengan peralatan modern untuk berbagai perawatan gigi, mulai dari pemeriksaan rutin, pembersihan karang gigi, penambalan, hingga pencabutan gigi.', imagePath: '/storage/ruanggigi.webp' },
    { id: 5, name: 'Kamar Rawat Inap', description: 'Kamar rawat inap yang bersih, nyaman, dan tenang untuk pemulihan pasien yang membutuhkan observasi dan perawatan medis intensif, dengan pengawasan perawat 24 jam.', imagePath: '/storage/ruangranap.webp' },
    { id: 6, name: 'Ruang Tindakan', description: 'Area steril yang dilengkapi dengan instrumen lengkap untuk melakukan tindakan medis minor seperti penanganan luka, insisi abses, dan prosedur bedah kecil lainnya dengan standar keamanan tinggi.', imagePath: '/storage/ruangtindakan.webp' },
];
const simpleItemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const dynamicTitleVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const dynamicContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const dynamicItemVariants = { hidden: { y: 20, opacity: 0, scale: 0.95, rotate: "-2deg" }, visible: { y: 0, opacity: 1, scale: 1, rotate: "0deg", transition: { type: "spring", stiffness: 100 } } };

const Typewriter = ({ text, className }) => {
    const chars = Array.from(text);
    const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } };
    const child = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } };
    return (<motion.p className={className} variants={container} initial="hidden" animate="visible" aria-label={text}>{chars.map((char, index) => (<motion.span variants={child} key={index} aria-hidden="true">{char === ' ' ? '\u00A0' : char}</motion.span>))}</motion.p>);
};

// --- Komponen Utama ---
const LandingPage = ({ settings }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [textIndex, setTextIndex] = useState(0);
    const servicesScrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const typewriterTexts = [
        "Pelayanan kesehatan modern, profesional, dan sepenuh hati.",
        "Akses kesehatan terjangkau untuk semua kalangan.",
        "Didukung tim medis berpengalaman dan terpercaya.",
        "Kenyamanan & kesembuhan Anda adalah prioritas kami.",
    ];

    useEffect(() => {
        const interval = setInterval(() => { setTextIndex(prevIndex => (prevIndex + 1) % typewriterTexts.length); }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleArrowScroll = (direction) => {
        const container = servicesScrollRef.current;
        if (container) { const scrollAmount = container.offsetWidth * 0.8; container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' }); }
    };
    const onMouseDown = (e) => {
        if (!servicesScrollRef.current) return; setIsDragging(true); setStartX(e.pageX - servicesScrollRef.current.offsetLeft); setScrollLeft(servicesScrollRef.current.scrollLeft); servicesScrollRef.current.style.cursor = 'grabbing';
    };
    const onMouseLeaveOrUp = () => {
        if (!servicesScrollRef.current) return; setIsDragging(false); servicesScrollRef.current.style.cursor = 'grab';
    };
    const onMouseMove = (e) => {
        if (!isDragging || !servicesScrollRef.current) return; e.preventDefault(); const x = e.pageX - servicesScrollRef.current.offsetLeft; const walk = (x - startX) * 1.5; servicesScrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <>
            <Head title="Klinik Pratama UNIMUS" />
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

            <section id="hero" className="py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-white to-[#e6faef]">
                <AnimateOnScroll stagger={0.2} once={false}>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-16">
                        <div className="text-center md:text-left">
                            <motion.h1 variants={simpleItemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 tracking-tight leading-tight">KLINIK PRATAMA UNIMUS</motion.h1>
                            <motion.p variants={simpleItemVariants} className="mt-2 text-lg sm:text-xl lg:text-2xl font-semibold text-green-600">Melayani Ummat, Menebar Manfaat</motion.p>
                            <div className="w-full mt-6 mb-10 text-lg text-gray-600 min-h-[96px] flex items-center justify-center md:justify-start">
                                <AnimatePresence mode="wait"><Typewriter key={textIndex} text={typewriterTexts[textIndex]} className="max-w-full [overflow-wrap:anywhere]" /></AnimatePresence>
                            </div>
                            <motion.div variants={simpleItemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <button onClick={() => document.getElementById('pendaftaran').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-3 rounded-full font-bold text-white bg-[#50cd89] hover:bg-[#38a36a] transition-all duration-300 transform hover:scale-105 shadow-lg">Daftar Sekarang</button>
                                <button onClick={() => document.getElementById('layanan').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-3 rounded-full font-bold text-[#38a36a] border-2 border-[#50cd89] hover:bg-[#50cd89] hover:text-white transition-colors duration-300">Lihat Layanan</button>
                            </motion.div>
                        </div>
                        <div className="mt-12 md:mt-0 flex justify-center">
                            <div className="w-full max-w-md bg-gray-200 rounded-2xl shadow-xl border-4 border-white overflow-hidden"><img src="/storage/Dokter.jpg" alt="Foto Dokter" className="w-full h-80 object-cover"/></div>
                        </div>
                    </div>
                </AnimateOnScroll>
            </section>

            <section id="tentang" className="py-16 bg-white overflow-hidden">
                <AnimateOnScroll>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2"><img src="/storage/tampakdepan.webp" alt="Foto Gedung Klinik Pratama UNIMUS" className="w-full h-80 object-cover rounded-lg shadow-lg" loading="lazy" decoding="async"/></div>
                        <div className="md:w-1/2 text-center md:text-left">
                            <motion.h2 variants={simpleItemVariants} className="text-3xl font-bold text-gray-800 mb-4">Tentang Klinik Kami</motion.h2>
                            <motion.p variants={simpleItemVariants} className="text-gray-600 leading-relaxed mb-4">{settings?.vision || "Klinik Pratama UNIMUS didirikan dengan komitmen untuk menyediakan akses pelayanan kesehatan yang berkualitas, modern, dan terjangkau."}</motion.p>
                            <motion.p variants={simpleItemVariants} className="text-gray-600 leading-relaxed">{settings?.mission ? "Kami memadukan keahlian tim medis profesional dengan teknologi terkini untuk memastikan setiap pasien mendapatkan penanganan yang tepat dan komprehensif." : "Kesehatan dan kenyamanan Anda adalah prioritas utama kami. Selamat datang di keluarga besar Klinik Pratama UNIMUS."}</motion.p>
                        </div>
                    </div>
                </AnimateOnScroll>
            </section>

            <section id="layanan" className="py-16 bg-[#f8f9fa] overflow-hidden">
                <motion.div className="container mx-auto px-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <motion.h2 variants={dynamicTitleVariants} className="text-3xl font-bold text-center text-gray-800 mb-10">LAYANAN</motion.h2>
                    <div className="relative">
                        <button onClick={() => handleArrowScroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer transition-opacity opacity-75 hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed -translate-x-4" aria-label="Geser ke kiri"><ChevronLeftIcon className="w-6 h-6 text-gray-700" /></button>
                        <motion.div ref={servicesScrollRef} className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar cursor-grab" variants={dynamicContainerVariants} onMouseDown={onMouseDown} onMouseLeave={onMouseLeaveOrUp} onMouseUp={onMouseLeaveOrUp} onMouseMove={onMouseMove}>
                            {servicesData.map(service => (<motion.div key={service.id} className="flex-shrink-0 w-40 h-40 bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer flex flex-col items-center justify-center border-t-4 border-green-500" onClick={(e) => { if (Math.abs(servicesScrollRef.current.scrollLeft - scrollLeft) > 5) { e.stopPropagation(); } else { setSelectedService(service); } }} variants={dynamicItemVariants} whileHover={{ scale: 1.05, y: -8, rotate: "1deg" }} whileTap={{ scale: 0.98, rotate: "-1deg" }} style={{ userSelect: 'none' }}><div className="text-[#50cd89] mb-3 pointer-events-none">{getServiceIcon(service.name)}</div><h3 className="text-sm font-semibold text-gray-800 leading-tight pointer-events-none">{service.name}</h3></motion.div>))}
                        </motion.div>
                        <button onClick={() => handleArrowScroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer transition-opacity opacity-75 hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed translate-x-4" aria-label="Geser ke kanan"><ChevronRightIcon className="w-6 h-6 text-gray-700" /></button>
                    </div>
                </motion.div>
            </section>

            <section id="fasilitas" className="py-16 bg-[#e6faef]">
                <motion.div className="container mx-auto px-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.h2 variants={dynamicTitleVariants} className="text-3xl font-bold text-center text-gray-800 mb-12">Fasilitas Modern</motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilitiesData.map(facility => (<div key={facility.id}><div className="bg-white rounded-lg shadow-lg overflow-hidden h-full border-t-4 border-green-500"><div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden"><img src={facility.imagePath} alt={`Foto ${facility.name}`} className="w-full h-full object-cover" loading="lazy" decoding="async" onError={(e) => { e.target.onerror = null; e.target.parentElement.innerHTML = `<span class="text-center p-4">Gambar ${facility.name} tidak tersedia</span>`; }}/></div><div className="p-6"><h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.name}</h3><p className="text-gray-600 text-sm">{facility.description}</p></div></div></div>))}
                    </div>
                </motion.div>
            </section>

            <section id="ulasan-google" className="py-16 bg-white overflow-hidden">
                <AnimateOnScroll>
                    <div className='text-center'>
                        <motion.div variants={simpleItemVariants}><h2 className="text-3xl font-bold text-gray-800 mb-4">Ulasan Pasien Kami di Google</h2><p className="text-gray-600 mb-10 max-w-2xl mx-auto">Kami bangga dapat memberikan pelayanan terbaik. Lihat apa kata mereka yang telah mempercayakan kesehatannya kepada kami.</p></motion.div>
                        <motion.div variants={simpleItemVariants} className="flex justify-center"><div className="w-full"><script src="https://elfsightcdn.com/platform.js" async></script><div className="elfsight-app-95ae2db7-32f6-4ebc-b191-b5b0ebeda6dc" data-elfsight-app-lazy></div></div></motion.div>
                        <motion.div variants={simpleItemVariants} className="text-center mt-12"><a href="https://search.google.com/local/reviews?placeid=ChIJ1YCDqxT1cC4Rn7_7w29e3n8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-white bg-[#50cd89] hover:bg-[#38a36a] transition-colors duration-300">Lihat Semua Ulasan di Google</a></motion.div>
                    </div>
                </AnimateOnScroll>
            </section>

            <section id="pendaftaran" className="py-16 bg-[#f8f9fa] overflow-hidden">
                <AnimateOnScroll>
                    <div className="text-center">
                        <motion.div variants={simpleItemVariants}><h2 className="text-3xl font-bold text-gray-800 mb-4">Daftar Online Sekarang</h2><p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Ingin mendaftar? Klik tombol di bawah untuk terhubung langsung dengan admin kami melalui WhatsApp.</p></motion.div>
                        <motion.a variants={simpleItemVariants} href={`https://wa.me/${settings?.whatsapp_registration}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white bg-[#50cd89] hover:bg-[#38a36a] transition-colors duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"><WhatsAppIcon className="w-6 h-6 mr-3" />Daftar Online via WhatsApp</motion.a>
                    </div>
                </AnimateOnScroll>
            </section>

            <section id="kontak-cta" className="py-16 bg-white overflow-hidden">
                <AnimateOnScroll>
                    <div className="text-center">
                        <motion.div variants={simpleItemVariants}><h2 className="text-3xl font-bold text-gray-800 mb-4">Butuh Bantuan atau Informasi?</h2><p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Temukan lokasi kami, lihat jam operasional, atau hubungi kami langsung melalui telepon dan email.</p></motion.div>
                        <motion.div variants={simpleItemVariants}><Link href={route('contact')} className="px-6 py-3 rounded-full font-semibold text-[#50cd89] border-2 border-[#50cd89] hover:bg-[#50cd89] hover:text-white transition-colors duration-300 inline-block">Lihat Info Kontak & Lokasi</Link></motion.div>
                    </div>
                </AnimateOnScroll>
            </section>

            <AnimatePresence>
                {selectedService && (<ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />)}
            </AnimatePresence>
        </>
    );
};

LandingPage.layout = page => <AppLayout children={page} />;

export default LandingPage;
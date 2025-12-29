import React from "react";
import { Link, usePage } from "@inertiajs/react";

/* ================= ICONS (TIDAK BERUBAH) ================= */
const MapPinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EnvelopeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
     <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
     <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TiktokIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.09v10.92c-.06 3.91-3.66 6.89-7.58 6.27-2.95-.47-5.12-3.03-5.09-6.02.02-3.32 2.72-6.02 6.04-6.02.32 0 .64.03.95.09v4.18c-.14-.04-.28-.06-.43-.06-1.07.03-1.92.93-1.89 2 .03 1.05.9 1.87 1.95 1.84 1.05-.03 1.9-.9 1.9-1.95V0h.03z"/>
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ================= LOGO ================= */
const LogoUnimus = () => (
  <div className="flex items-center gap-4">
    <div className="p-1 w-[4rem] h-[4rem] flex-shrink-0 flex items-center justify-center shadow-sm">
      <img
        src="https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/inventaris-fotos/aset/logo_klinik.png" 
        alt="Logo Unimus"
        className="w-full h-full object-contain rounded-full ring-2 ring-white"
      />
    </div>
    <div className="leading-none text-white font-sans">
      <p className="text-2xl font-extrabold tracking-wide uppercase">KLINIK PRATAMA</p>
      <p className="text-2xl font-extrabold tracking-wide uppercase">UNIMUS</p>
    </div>
  </div>
);

/* ================= FOOTER ================= */
export default function Footer() {
  const { settings } = usePage().props;

  const data = {
    wa_reg: settings?.whatsapp_registration || "62 895-6168-33383",
    wa_info: settings?.whatsapp_information || "62 896-7587-3994",
  };

  return (
    <div className="font-sans relative bg-gray-50 mt-14">
      
      {/* ================= CTA FLOAT ================= */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[94%] max-w-6xl">
        <div className="bg-[#D1FBE9] rounded-2xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div className="flex items-center text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
              Melayani <span className="text-[#009B4C]">Ummat</span> Menebar{" "}
              <span className="text-[#009B4C]">Manfaat</span>
            </h2>
            <span className="hidden md:block w-16 h-[2px] bg-black ml-6 rounded-full" />
          </div>

          <a
            href={`https://wa.me/${data.wa_reg.replace(/\D/g,'')}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 md:mt-0 bg-[#009B4C] hover:bg-[#0b7c3c] text-white px-8 py-2 rounded-full font-bold text-lg transition shadow-md capitalize whitespace-nowrap"
          >
            contact us
          </a>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      {/* UPDATE: Menghapus bg-[#009B4C] dan menggantinya dengan struktur layer */}
      <footer className="relative pt-32 pb-4 text-white overflow-hidden">
        
        {/* Layer 1: Background Image Asli */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://gfztdbbmjoniayvycnsb.supabase.co/storage/v1/object/public/web-profile/aset/tampakdepan.webp')" }}
        />

        {/* Layer 2: Overlay Warna Hijau Transparan */}
        {/* bg-[#009B4C]/90 artinya warna hijau dengan opacity 90% */}
        {/* Anda bisa mengubah /90 menjadi /80 atau /70 jika ingin lebih transparan */}
        <div className="absolute inset-0 bg-[#009B4C]/90 z-0" />

        {/* Opsional: Tambahkan backdrop-blur untuk efek kaca buram */}
        {/* <div className="absolute inset-0 backdrop-blur-[2px] z-0" /> */}

        <div className="relative z-10 container mx-auto px-6 max-w-[80rem]">
          
          {/* === BAGIAN ATAS: LOGO & LAYANAN === */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-10 mb-10 items-start">
            
            {/* Kiri: Brand & Deskripsi */}
            <div className="space-y-5 pr-4">
              <LogoUnimus />
              <p className="text-[0.93rem] font-medium leading-relaxed opacity-95 max-w-lg shadow-black/10 drop-shadow-md">
                Menyediakan layanan kesehatan terpercaya dengan tim medis 
                profesional dan fasilitas modern untuk Anda dan keluarga.
              </p>
            </div>

            {/* Kanan: Layanan Unggulan */}
            <div className="pt-2">
              <h3 className="text-lg font-bold mb-4 drop-shadow-md">Layanan Unggulan</h3>
              
              <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-[0.9rem] font-bold">
                 <div>BPJS</div>
                 <div>Medical Check Up (MCU)</div>
                 <div>Khitan</div>
                 
                 <div>Prolanis</div>
                 <div>Pelayanan Persalinan</div>
                 <div>Rawat Inap</div>

                 <div className="col-span-3">Pemeriksaan Kandungan ANC dan USG</div>
              </div>
              
              <Link
                href="/layanan"
                className="inline-flex items-center gap-2 mt-4 text-[0.9rem] font-bold hover:underline"
              >
                Lihat Semua Layanan <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* === BAGIAN BAWAH: GRID KONTAK === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 pt-4 border-t border-white/20 mt-8">
            
            {/* Kolom 1 */}
            <div className="space-y-6">
               <div className="flex items-start gap-3">
                  <MapPinIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-[0.8rem] font-bold leading-snug">
                    Jl. Petek Kp. Gayam RT. 02 RW. 06,<br/>
                    Kel. Dadapsari, Kec. Semarang<br/>
                    Utara., Semarang, Indonesia
                  </span>
               </div>
               <div className="flex items-start gap-3">
                  <EnvelopeIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-[0.8rem] font-bold leading-tight">
                    klinikpratamarawatinap<br/>
                    <span className="font-normal opacity-90">@unimus.ac.id</span>
                  </span>
               </div>
            </div>

            {/* Kolom 2 */}
            <div className="space-y-6">
                <a href="#" className="flex items-start gap-3 group">
                   <div className="bg-white text-[#009B4C] p-1 rounded group-hover:bg-gray-100 transition mt-0.5">
                      <YoutubeIcon className="w-4 h-4" />
                   </div>
                   <span className="font-bold text-[0.8rem] leading-tight">
                     klinikpratama<br/>
                     unimus_official
                   </span>
                </a>
                <a href="#" className="flex items-start gap-3 group">
                   <div className="bg-white text-[#009B4C] p-1 rounded-full group-hover:bg-gray-100 transition mt-0.5">
                      <FacebookIcon className="w-4 h-4" />
                   </div>
                   <span className="font-bold text-[0.8rem] leading-tight">
                     Klinik Pratama<br/>
                     Unimus
                   </span>
                </a>
            </div>

            {/* Kolom 3 */}
            <div className="space-y-6">
                <div className="flex items-start gap-3">
                   <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
                   <div className="leading-none">
                     <p className="font-bold text-[0.85rem] mb-1">+{data.wa_reg}</p>
                     <p className="text-[0.7rem] font-medium opacity-90">(Pendaftaran)</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
                   <div className="leading-none">
                     <p className="font-bold text-[0.85rem] mb-1">+{data.wa_info}</p>
                     <p className="text-[0.7rem] font-medium opacity-90">(Informasi)</p>
                   </div>
                </div>
            </div>

            {/* Kolom 4 */}
            <div className="space-y-6">
                <a href="#" className="flex items-start gap-3 group">
                   <div className="mt-0.5">
                      <InstagramIcon className="w-5 h-5 group-hover:opacity-80 transition" />
                   </div>
                   <span className="font-bold text-[0.8rem] leading-tight">
                     klinikpratama<br/>
                     unimus_official
                   </span>
                </a>
                <a href="#" className="flex items-start gap-3 group">
                   <TiktokIcon className="w-5 h-5 mt-0.5 group-hover:opacity-80 transition" />
                   <span className="font-bold text-[0.8rem] mt-0.5">
                     Klinik Unimus
                   </span>
                </a>
            </div>

          </div>
        </div>
        
        {/* === COPYRIGHT === */}
        <div className="relative z-10 border-t border-white/30 mt-6 pt-4 text-center text-xs font-medium opacity-90">
          © {new Date().getFullYear()} Klinik Pratama Unimus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
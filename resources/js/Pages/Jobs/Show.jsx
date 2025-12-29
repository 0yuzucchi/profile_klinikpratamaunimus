import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ vacancy }) {

    // 1. Cek Apakah ada tanggal batas waktu
    const hasDeadline = !!vacancy.open_until_date;

    // 2. Logic Cek Status (Expired atau Closed by Admin)
    const isExpired = hasDeadline
        ? new Date(vacancy.open_until_date) < new Date().setHours(0, 0, 0, 0)
        : false;
    const isClosed = vacancy.status === 'closed' || isExpired;

    // 3. Filter kanal yang valid
    const availableChannels = (vacancy.submission_channels || []).filter(ch =>
        ['email', 'whatsapp'].includes(ch.type) && ch.value // Pastikan value tidak kosong
    );

    function handleApply(type) {
        if (isClosed) return;
        router.post(route('jobs.apply', vacancy.id), { type: type });
    }

    return (
        <>
            <Head title={`Lowongan: ${vacancy.profession}`} />

            <main>
                <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
                    <div className="mb-6">
                        <Link href={route('jobs.index')} className="text-indigo-600 hover:text-indigo-800">
                            &larr; Kembali ke semua lowongan
                        </Link>
                    </div>

                    {/* --- GAMBAR POSTER FULL (Hanya tampil jika ada) --- */}
                    {vacancy.poster_image && (
                        <div className="mb-8 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                            <img
                                src={vacancy.poster_image}
                                alt={`Poster ${vacancy.profession}`}
                                className="w-full h-auto max-h-[800px] object-contain bg-gray-50"
                            />
                        </div>
                    )}

                    <div className={`bg-white p-8 rounded-lg shadow-md border-t-4 ${isClosed ? 'border-gray-400' : 'border-indigo-600'}`}>
                        {/* Header & Badge Status */}
                        <div className="flex justify-between items-start flex-col sm:flex-row gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{vacancy.profession}</h1>
                                {isClosed ? (
                                    <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full mt-2 inline-block">Ditutup</span>
                                ) : (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mt-2 inline-block">Dibuka</span>
                                )}
                            </div>
                        </div>
                        {Array.isArray(vacancy.requirements) &&
                            vacancy.requirements.some(req => req?.requirement_text) && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold border-b pb-2 mb-3">
                                        Persyaratan Kualifikasi
                                    </h3>
                                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                        {vacancy.requirements
                                            .filter(req => req?.requirement_text)
                                            .map((req, index) => (
                                                <li key={index}>{req.requirement_text}</li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                        {Array.isArray(vacancy.required_documents) &&
                            vacancy.required_documents.some(doc => doc?.document_name) && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold border-b pb-2 mb-3">
                                        Berkas Dokumen Yang Diperlukan
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <ul className="list-decimal list-inside space-y-1 text-gray-700">
                                            {vacancy.required_documents
                                                .filter(doc => doc?.document_name)
                                                .map((doc, index) => (
                                                    <li key={index} className="font-medium">
                                                        {doc.document_name}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            )}


                        {/* --- BAGIAN BATAS WAKTU (Hanya tampil jika tanggal diatur) --- */}
                        {hasDeadline && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold border-b pb-2 mb-3">Batas Waktu</h3>
                                <p className={`font-medium ${isExpired ? 'text-red-600' : 'text-gray-700'}`}>
                                    {new Date(vacancy.open_until_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    {isExpired && ' (Sudah Berakhir)'}
                                </p>
                            </div>
                        )}

                        {/* --- BAGIAN AKSI / TOMBOL --- */}
                        <div className="mt-10 border-t pt-8">
                            {isClosed ? (
                                // KONDISI 1: Lowongan Ditutup
                                <div className="bg-gray-100 border border-gray-300 rounded-md p-6 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <h3 className="text-lg font-bold text-gray-700">Lowongan Ditutup</h3>
                                    <p className="text-gray-600 mt-1">Mohon maaf, masa pendaftaran untuk posisi ini sudah berakhir.</p>
                                </div>
                            ) : (
                                // KONDISI 2: Lowongan Dibuka
                                <>
                                    {availableChannels.length > 0 ? (
                                        // SUB-KONDISI A: Ada kanal otomatis (WA/Email)
                                        <>
                                            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                                                <p className="text-sm text-blue-800">
                                                    Tertarik? Pilih metode pengiriman lamaran di bawah ini.<br />
                                                    <strong>Pastikan dokumen sudah siap sebelum melanjutkan.</strong>
                                                </p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {availableChannels.map((channel, index) => {
                                                    if (channel.type === 'email') {
                                                        return (
                                                            <button key={index} onClick={() => handleApply('email')} className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                                                Lamar via Email
                                                            </button>
                                                        );
                                                    }
                                                    if (channel.type === 'whatsapp') {
                                                        return (
                                                            <button key={index} onClick={() => handleApply('whatsapp')} className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                                Lamar via WhatsApp
                                                            </button>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        // SUB-KONDISI B: Tidak ada kanal (Manual / Lihat Poster)
                                        <div className="bg-amber-50 border border-amber-200 rounded-md p-6 text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h3 className="text-lg font-bold text-amber-800">Tata Cara Melamar</h3>
                                            <p className="text-amber-700 mt-2">
                                                Untuk melamar posisi ini, silakan ikuti petunjuk atau instruksi pengiriman berkas yang tertera pada <strong>Gambar Poster</strong> di atas.
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
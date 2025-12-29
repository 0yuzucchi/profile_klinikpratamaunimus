import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

const Pagination = ({ links }) => {
    return (
        <div className="mt-8 flex justify-center flex-wrap gap-1">
            {links.map((link, key) => (
                <Link
                    key={key}
                    href={link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-3 py-2 text-sm border rounded-md transition-colors ${link.active
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                    as="button"
                    disabled={!link.url}
                />
            ))}
        </div>
    );
};

export default function Index({ vacancies, filters }) {
    const [search, setSearch] = React.useState(filters.search || '');
    const [statusFilter, setStatusFilter] = React.useState(filters.status || 'all');

    const handleFilterChange = (newSearch, newStatus) => {
        router.get(route('jobs.index'), { search: newSearch, status: newStatus }, { preserveState: true, replace: true });
    };

    const onSearchChange = (e) => setSearch(e.target.value);
    const onStatusChange = (e) => {
        const val = e.target.value;
        setStatusFilter(val);
        handleFilterChange(search, val);
    };
    const onSearchSubmit = (e) => {
        e.preventDefault();
        handleFilterChange(search, statusFilter);
    };

    return (
        <>
            <Head title="Lowongan Pekerjaan" />

            <main className="min-h-screen bg-gray-50">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Lowongan Tersedia</h1>

                    <div className="max-w-4xl mx-auto mb-8">
                        <form onSubmit={onSearchSubmit} className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-grow">
                                <input type="text" value={search} onChange={onSearchChange} placeholder="Cari berdasarkan profesi..." className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm py-2.5" />
                            </div>
                            <div className="sm:w-48">
                                <select value={statusFilter} onChange={onStatusChange} className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm py-2.5 cursor-pointer">
                                    <option value="all">Semua Status</option>
                                    <option value="open">Sedang Dibuka</option>
                                    <option value="closed">Sudah Ditutup</option>
                                </select>
                            </div>
                            <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">Cari</button>
                        </form>
                    </div>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {vacancies.data.length > 0 ? (
                            vacancies.data.map((vacancy) => {
                                const isExpired = vacancy.open_until_date && new Date(vacancy.open_until_date) < new Date().setHours(0, 0, 0, 0);
                                const isClosed = vacancy.status === 'closed' || isExpired;

                                return (
                                    <div key={vacancy.id} className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all flex flex-col sm:flex-row gap-4">

                                        {/* --- THUMBNAIL POSTER (Kiri) --- */}
                                        {vacancy.poster_image && (
                                            <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                                <img
                                                    src={vacancy.poster_image} // Langsung pakai URL dari DB
                                                    alt={vacancy.profession}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        {/* ------------------------------- */}

                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h2 className="text-xl font-semibold text-gray-800">{vacancy.profession}</h2>
                                                {isClosed ? (
                                                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded border border-gray-200">Ditutup</span>
                                                ) : (
                                                    <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded border border-green-200">Dibuka</span>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-600">
                                                Batas Waktu: {vacancy.open_until_date
                                                    ? new Date(vacancy.open_until_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
                                                    : 'Tidak ditentukan'}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-end sm:justify-start">
                                            <Link href={route('jobs.show', vacancy.id)} className="text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap flex items-center gap-1">
                                                Lihat Detail &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 text-lg">Tidak ada lowongan yang ditemukan.</p>
                                <p className="text-gray-400 text-sm">Coba ubah kata kunci atau status pencarian.</p>
                            </div>
                        )}
                    </div>

                    {vacancies.links.length > 3 && <Pagination links={vacancies.links} />}
                </div>
            </main>
        </>
    );
}
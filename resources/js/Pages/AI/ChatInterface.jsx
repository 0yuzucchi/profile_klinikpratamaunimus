// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// export default function ChatInterface() {
//     const [messages, setMessages] = useState([
//         { from: 'ai', text: 'Halo! Ada yang bisa saya bantu? Anda bisa menanyakan jadwal dokter, layanan klinik, atau informasi lainnya.' }
//     ]);
//     const [input, setInput] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
//     const messagesEndRef = useRef(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(scrollToBottom, [messages]);

//     const handleSend = async (e) => {
//         e.preventDefault();
//         if (!input.trim() || isLoading) return;

//         const userMessage = { from: 'user', text: input };
//         setMessages(prev => [...prev, userMessage]);
//         setInput('');
//         setIsLoading(true);

//         try {
//             const response = await axios.post(route('ai.ask'), { query: input });
//             const aiMessage = { from: 'ai', text: response.data.reply };
//             setMessages(prev => [...prev, aiMessage]);
//         } catch (error) {
//             const errorMessage = { from: 'ai', text: 'Maaf, terjadi kesalahan saat menghubungi server.' };
//             setMessages(prev => [...prev, errorMessage]);
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
//     // Komponen Disclaimer Modal/Overlay
//     const Disclaimer = () => (
//         <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
//             <div className="bg-white p-6 rounded-lg max-w-2xl text-sm">
//                 <h2 className="text-xl font-bold mb-4">Disclaimer Penggunaan AI Assistant</h2>
//                 <div className="space-y-2 max-h-80 overflow-y-auto">
//                    <p>Dengan melanjutkan, Anda setuju bahwa AI ini <strong>bukan pengganti konsultasi medis profesional</strong> dan hanya untuk informasi administratif. Klinik tidak bertanggung jawab atas keputusan yang diambil berdasarkan informasi dari AI ini.</p>
//                    <p>AI tidak memberikan diagnosis, saran pengobatan, atau informasi bersifat hukum. Selalu konfirmasi informasi penting dengan staf kami.</p>
//                 </div>
//                 <button 
//                     onClick={() => setDisclaimerAccepted(true)}
//                     className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                 >
//                     Saya Mengerti dan Setuju
//                 </button>
//             </div>
//         </div>
//     );

//     return (
//         <div className="flex flex-col h-screen bg-gray-100">
//             {!disclaimerAccepted && <Disclaimer />}
//             <div className="flex-1 p-4 overflow-y-auto">
//                 <div className="max-w-3xl mx-auto space-y-4">
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
//                             <div className={`p-3 rounded-lg max-w-lg ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
//                                 <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
//                             </div>
//                         </div>
//                     ))}
//                     {isLoading && <div className="flex justify-start"><div className="p-3 rounded-lg bg-white">...</div></div>}
//                     <div ref={messagesEndRef} />
//                 </div>
//             </div>
//             <div className="p-4 bg-white border-t">
//                 <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-2">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         className="flex-1 border rounded-full px-4 py-2"
//                         placeholder="Ketik pertanyaan Anda di sini..."
//                         disabled={isLoading}
//                     />
//                     <button type="submit" className="bg-blue-500 text-white rounded-full px-6 py-2" disabled={isLoading}>
//                         Kirim
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

























import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { 
            from: 'ai', 
            text: 'Halo! Ada yang bisa saya bantu? Anda bisa menanyakan jadwal dokter, layanan klinik, atau informasi lainnya.',
            suggestions: [
                'Jadwal dokter hari ini',
                'Layanan di Klinik Unimus',
                'Lokasi klinik di mana?'
            ]
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // [REFAKTOR] Logika pengiriman dipisah ke fungsi sendiri agar bisa dipakai ulang
    const submitQuery = async (queryText) => {
        if (!queryText.trim() || isLoading) return;

        const userMessage = { from: 'user', text: queryText };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await axios.post(route('ai.ask'), { query: queryText });
            
            // AI message sekarang berisi 'text' dan 'suggestions'
            const aiMessage = { 
                from: 'ai', 
                text: response.data.reply.text,
                suggestions: response.data.reply.suggestions || [] // Pastikan suggestions selalu array
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("AI request failed:", error); // Log error ke konsol untuk debug
            const errorMessage = { from: 'ai', text: 'Maaf, terjadi kesalahan saat menghubungi server AI kami.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        submitQuery(input);
        setInput('');
    };

    // [BARU] Fungsi untuk menangani klik pada tombol saran
    const handleSuggestionClick = (suggestion) => {
        if (isLoading) return;
        submitQuery(suggestion);
    };
    
    // Komponen Disclaimer Modal/Overlay
    const Disclaimer = () => (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-10">
            <div className="bg-white p-6 rounded-lg max-w-2xl text-sm shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Disclaimer Penggunaan AI Assistant</h2>
                <div className="space-y-3 max-h-80 overflow-y-auto text-gray-600">
                   <p>Dengan melanjutkan, Anda memahami dan setuju bahwa asisten AI ini bertujuan untuk memberikan informasi administratif (seperti jadwal, lokasi, dan layanan umum) dan <strong>bukan pengganti konsultasi medis profesional</strong>.</p>
                   <p>Informasi yang diberikan oleh AI tidak boleh dianggap sebagai diagnosis, saran pengobatan, atau anjuran medis. Klinik Pratama Unimus tidak bertanggung jawab atas keputusan atau tindakan yang Anda ambil berdasarkan informasi dari asisten AI ini.</p>
                   <p>Untuk masalah medis, silakan berkonsultasi langsung dengan dokter kami. Selalu konfirmasi informasi penting seperti jadwal praktik dengan staf kami melalui telepon atau kunjungan langsung.</p>
                </div>
                <button 
                    onClick={() => setDisclaimerAccepted(true)}
                    className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Saya Mengerti dan Setuju
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-gray-100 relative">
            {!disclaimerAccepted && <Disclaimer />}
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <div className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-lg shadow-sm ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
                                    {/* Menggunakan 'pre-wrap' untuk menjaga format teks dari AI (seperti baris baru) */}
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                </div>
                            </div>
                            
                            {/* [BARU] Render tombol saran jika ada dan merupakan pesan terakhir dari AI */}
                            {msg.from === 'ai' && msg.suggestions && msg.suggestions.length > 0 && index === messages.length - 1 && !isLoading && (
                                <div className="mt-2 flex flex-wrap gap-2 max-w-lg">
                                    {msg.suggestions.map((suggestion, sIndex) => (
                                        <button
                                            key={sIndex}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && <div className="flex justify-start"><div className="p-3 rounded-lg bg-white shadow-sm text-gray-500">...</div></div>}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 bg-white border-t">
                <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                        placeholder="Ketik pertanyaan Anda di sini..."
                        disabled={isLoading}
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded-full px-6 py-2 font-semibold hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={isLoading}>
                        Kirim
                    </button>
                </form>
            </div>
        </div>
    );
}
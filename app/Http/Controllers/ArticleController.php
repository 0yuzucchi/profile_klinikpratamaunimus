<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class ArticleController extends Controller
{
    /**
     * Menampilkan halaman daftar artikel.
     */
    public function index()
    {
        $articles = Article::query()
            ->where('status', 1) 
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->get()
            ->map(fn ($article) => [
                'id' => $article->id,
                'slug' => $article->slug,
                'title' => $article->title,
                'excerpt' => $article->excerpt,
                'image_url' => $article->image_url, 
                'date' => Carbon::parse($article->published_at)->isoFormat('D MMMM YYYY'),
            ]);

        return Inertia::render('Article/Index', [
            'articles' => $articles,
        ]);
    }

     /**
     * Menampilkan halaman detail artikel.
     */
    // Di dalam class ArticleController

    public function show($slug)
    {
        $currentArticle = Article::with('reviews')
            ->where('slug', $slug)
            ->where('status', 1) 
            ->where('published_at', '<=', now())
            ->firstOrFail();

        $otherArticles = Article::query()
            ->where('slug', '!=', $slug)
            ->where('status', 1) 
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->take(4)
            ->get()
            ->map(fn ($article) => [
                'id' => $article->id,
                'slug' => $article->slug,
                'title' => $article->title,
                'image_url' => $article->image_url,
                'date' => Carbon::parse($article->published_at)->isoFormat('D MMMM YYYY'),
            ]);

        // Penghitungan reaksi sudah benar karena $currentArticle->reviews hanya berisi yang visible
        $reactionCounts = [
            'grinning' => $currentArticle->reviews->where('reaction', '😄')->count(),
            'smiling'  => $currentArticle->reviews->where('reaction', '🙂')->count(),
            'neutral'  => $currentArticle->reviews->where('reaction', '😐')->count(),
            'frowning' => $currentArticle->reviews->where('reaction', '🙁')->count(),
            'angry'    => $currentArticle->reviews->where('reaction', '😠')->count(),
            'crying'   => $currentArticle->reviews->where('reaction', '😢')->count(),
        ];
        
        return Inertia::render('Article/Show', [
            'article' => [
                'id' => $currentArticle->id,
                'slug' => $currentArticle->slug,
                'title' => $currentArticle->title,
                'author' => $currentArticle->author,
                'content' => $currentArticle->content,
                'image_url' => $currentArticle->image_url,
                'date' => Carbon::parse($currentArticle->published_at)->isoFormat('D MMMM YYYY'),
            ],
            'otherArticles' => $otherArticles,
            // --- PERUBAHAN DI SINI: Kirim data balasan ke frontend ---
            'reviews' => $currentArticle->reviews->map(fn ($review) => [
                'id' => $review->id,
                'name' => $review->name ?? 'Pengunjung',
                'comment' => $review->comment,
                'reaction' => $review->reaction,
                'date' => $review->created_at->diffForHumans(),
                'admin_reply' => $review->admin_reply,
                'replied_at' => $review->replied_at ? $review->replied_at->diffForHumans() : null, // <-- Tambahkan ini
            ]),
            'reactionCounts' => $reactionCounts,
        ]);
    }

    /**
     * Menyimpan ulasan baru untuk sebuah artikel.
     */
    public function storeReview(Request $request, Article $article)
    {
        // --- PERUBAHAN DI SINI: Sesuaikan validasi dengan 6 emoji baru ---
        $request->validate([
            'name' => 'nullable|string|max:255',
            'comment' => 'nullable|string|max:2000',
            'reaction' => 'nullable|string|in:😄,🙂,😐,🙁,😠,😢', // Validasi baru
        ]);

        if (empty($request->comment) && empty($request->reaction)) {
            return back()->withErrors(['review' => 'Anda harus memberikan reaksi atau komentar.']);
        }

        $article->reviews()->create([
            'name' => $request->name,
            'comment' => $request->comment,
            'reaction' => $request->reaction,
        ]);

        return back()->with('success', 'Terima kasih atas ulasan Anda!');
    }
}
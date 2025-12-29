<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Models\Article;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Hidden; // Import Hidden
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Support\Colors\Color; // Import Color
use Illuminate\Support\HtmlString;

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Artikel & Berita';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Judul & Konten')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->reactive()
                                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                                
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->unique(Article::class, 'slug', ignoreRecord: true),

                                // --- BUILDER STRUKTUR ---
                                Builder::make('content')
                                    ->label('Isi Artikel')
                                    ->blocks([
                                        // 1. BLOK TEKS
                                        Builder\Block::make('paragraph')
                                            ->label('Paragraf')
                                            ->schema([
                                                Forms\Components\RichEditor::make('content')
                                                    ->label('Teks')
                                                    ->required(),
                                            ]),

                                        // 2. BLOK GAMBAR BANNER (FIXED: PREVIEW & REPLACE)
                                        Builder\Block::make('image_banner')
                                            ->label('Gambar Banner')
                                            ->schema([
                                                // A. Field Penyimpan URL (Hidden)
                                                Hidden::make('url'),

                                                // B. Preview Gambar Saat Ini
                                                Placeholder::make('preview_banner')
                                                    ->label('Preview Gambar Saat Ini')
                                                    ->content(function (Get $get) {
                                                        $url = $get('url'); // Ambil dari hidden field
                                                        if (!$url) {
                                                            return new HtmlString('<div style="padding:10px; background:#f3f4f6; border-radius:8px; color:#6b7280;">Belum ada gambar yang diupload.</div>');
                                                        }
                                                        return new HtmlString('
                                                            <div style="margin-bottom: 10px;">
                                                                <img src="'.$url.'" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
                                                                <div style="font-size: 0.8rem; color: #6b7280; margin-top: 4px;">Gambar aktif saat ini.</div>
                                                            </div>
                                                        ');
                                                    }),

                                                // C. Uploader (Hanya untuk GANTI gambar)
                                                Forms\Components\FileUpload::make('attachment')
                                                    ->label('Ganti Gambar (Opsional)')
                                                    ->helperText('Upload gambar baru HANYA jika ingin mengganti yang lama.')
                                                    ->image()
                                                    ->imageEditor()
                                                    // Logic Upload Supabase
                                                    ->saveUploadedFileUsing(fn (UploadedFile $file) => self::uploadToSupabase($file))
                                                    // Setelah upload sukses, set nilai ke Hidden Field 'url'
                                                    ->afterStateUpdated(function ($state, Set $set) {
                                                        if ($state) {
                                                            // Handle jika return array (kadang terjadi di Filament)
                                                            $newUrl = is_array($state) ? array_values($state)[0] : $state;
                                                            $set('url', $newUrl);
                                                        }
                                                    })
                                                    // Jangan simpan field 'attachment' ini ke database JSON, kita cuma butuh 'url'
                                                    ->dehydrated(false),
                                                
                                                Forms\Components\TextInput::make('caption')
                                                    ->label('Keterangan Gambar'),
                                            ]),

                                        // 3. BLOK GALERI
                                        Builder\Block::make('gallery')
                                            ->label('Galeri Foto')
                                            ->schema([
                                                // A. Simpan Array Gambar (Hidden tidak support array native di builder dgn mudah, kita pakai FileUpload langsung tapi dihandle hati-hati)
                                                // Khusus Gallery, kita pakai FileUpload biasa tapi dengan Preview Placeholder di atasnya agar user yakin datanya ada.
                                                
                                                Placeholder::make('gallery_preview')
                                                    ->label('Foto Tersimpan')
                                                    ->content(function (Get $get) {
                                                        $images = $get('images');
                                                        if (!$images) return 'Belum ada foto.';
                                                        // Pastikan array
                                                        if (!is_array($images)) $images = [$images];

                                                        $html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px; margin-bottom: 10px;">';
                                                        foreach ($images as $img) {
                                                            if(is_string($img)) {
                                                                $html .= '<a href="'.$img.'" target="_blank"><img src="'.$img.'" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 6px; border: 1px solid #eee;"></a>';
                                                            }
                                                        }
                                                        $html .= '</div>';
                                                        return new HtmlString($html);
                                                    }),

                                                Forms\Components\FileUpload::make('images')
                                                    ->label('Upload / Tambah Foto')
                                                    ->multiple()
                                                    ->image()
                                                    ->reorderable()
                                                    ->appendFiles() // Agar tidak menimpa langsung saat nambah
                                                    ->saveUploadedFileUsing(fn (UploadedFile $file) => self::uploadToSupabase($file)),
                                            ]),

                                        // 4. BLOK KUTIPAN
                                        Builder\Block::make('quote')
                                            ->label('Kutipan')
                                            ->schema([
                                                Forms\Components\Textarea::make('text')->rows(3),
                                                Forms\Components\TextInput::make('author'),
                                            ]),
                                    ])
                                    ->collapsible(),
                            ]),
                    ])->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Pengaturan')
                            ->schema([
                                Toggle::make('status')
                                    ->label('Tampilkan')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger'),

                                Forms\Components\DateTimePicker::make('published_at')->default(now()),
                                Forms\Components\TextInput::make('author')->required(),
                                
                                // --- PREVIEW & UPLOAD THUMBNAIL UTAMA ---
                                // 1. Simpan URL asli di Hidden Field
                                Hidden::make('image_path'),

                                // 2. Tampilkan Preview Gambar Lama
                                Placeholder::make('thumb_preview')
                                    ->label('Thumbnail Saat Ini')
                                    ->content(function ($record, Get $get) {
                                        // Coba ambil dari state form dulu (live), kalau null ambil dari record
                                        $url = $get('image_path'); 
                                        
                                        if (!$url && $record) $url = $record->image_path;

                                        if (!$url) {
                                            return new HtmlString('<div class="text-xs text-gray-500 italic">Belum ada thumbnail.</div>');
                                        }
                                        return new HtmlString('
                                            <div style="text-align:center; background: #f9fafb; padding: 10px; border-radius: 8px; border: 1px dashed #d1d5db;">
                                                <img src="'.$url.'" style="max-width: 100%; height: auto; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                                <p style="font-size: 10px; color: #6b7280; margin-top: 5px;">Gambar aktif</p>
                                            </div>
                                        ');
                                    }),

                                // 3. Uploader untuk GANTI gambar
                                Forms\Components\FileUpload::make('thumbnail_upload')
                                    ->label('Ganti Thumbnail')
                                    ->helperText('Kosongkan jika tidak ingin mengubah thumbnail.')
                                    ->image()
                                    ->imageEditor()
                                    // Logic Upload
                                    ->saveUploadedFileUsing(fn (UploadedFile $file) => self::uploadToSupabase($file))
                                    // Update hidden field 'image_path' setelah upload
                                    ->afterStateUpdated(function ($state, Set $set) {
                                        if ($state) {
                                             // Handle array return
                                             $url = is_array($state) ? array_values($state)[0] : $state;
                                             $set('image_path', $url);
                                        }
                                    })
                                    // Tidak disimpan ke DB kolom 'thumbnail_upload' (karena kolom itu gak ada)
                                    ->dehydrated(false)
                                    // Required hanya saat Create, tapi kita cek hidden fieldnya
                                    ->required(fn ($context) => $context === 'create' && request()->missing('image_path')), 
                                
                                Forms\Components\Textarea::make('excerpt')
                                    ->label('Ringkasan Singkat')
                                    ->rows(3)
                                    ->maxLength(160),
                            ]),
                    ])->columnSpan(['lg' => 1]),
            ])->columns(3);
    }

    // --- Helper Functions tetap sama ---
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_path')->square()->label('Thumb'),
                TextColumn::make('title')->searchable()->limit(30),
                ToggleColumn::make('status'),
                TextColumn::make('published_at')->date(),
            ])
            ->filters([])
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }

    protected static function uploadToSupabase(UploadedFile $file): ?string 
    {
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $response = Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'),
            'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
            'Content-Type' => $file->getMimeType(),
        ])->withBody(file_get_contents($file->getRealPath()), $file->getMimeType())
          ->post(env('SUPABASE_URL') . '/storage/v1/object/web-profile/' . $fileName);
        
        return $response->successful() 
            ? env('SUPABASE_URL') . '/storage/v1/object/public/web-profile/' . $fileName 
            : null;
    }
}
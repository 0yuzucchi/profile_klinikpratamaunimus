<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AnnouncementResource\Pages;
use App\Models\Announcement;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Placeholder;
use Illuminate\Support\HtmlString;

class AnnouncementResource extends Resource
{
    protected static ?string $model = Announcement::class;

    protected static ?string $navigationIcon = 'heroicon-o-megaphone';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Konten Utama')
                            ->schema([
                                Forms\Components\TextInput::make('title')->required()->maxLength(255)->live(onBlur: true)
                                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug(is_string($state) ? $state : ''))),

                                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                                
                                Forms\Components\Textarea::make('excerpt')->rows(3)->maxLength(300)->helperText('Ringkasan singkat dari pengumuman ini.'),

                                Builder::make('content')
                                    ->label('Isi Pengumuman')
                                    ->blocks([
                                        Builder\Block::make('paragraph')
                                            ->label('Paragraf Teks')
                                            ->schema([
                                                Forms\Components\RichEditor::make('content')->label(false)->required(),
                                            ]),
                                        
                                        // --- PERUBAHAN UTAMA DI SINI ---
                                        Builder\Block::make('gallery')
                                            ->label('Galeri Foto')
                                            ->schema([
                                                // 1. Tambahkan Placeholder untuk menampilkan pratinjau gambar yang sudah ada
                                                Placeholder::make('gallery_preview')
                                                    ->label('Pratinjau Gambar Tersimpan')
                                                    ->content(function (Get $get): ?HtmlString {
                                                        $images = $get('images');
                                                        if (empty($images)) {
                                                            return new HtmlString('<div class="text-sm text-gray-500">Belum ada foto yang diunggah.</div>');
                                                        }

                                                        if (!is_array($images)) $images = [$images];

                                                        $html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;">';
                                                        foreach ($images as $imageUrl) {
                                                            if (is_string($imageUrl) && !empty($imageUrl)) {
                                                               $html .= '<div><a href="' . e($imageUrl) . '" target="_blank" rel="noopener noreferrer"><img src="' . e($imageUrl) . '" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; border: 1px solid #d1d5db;"></a></div>';
                                                            }
                                                        }
                                                        $html .= '</div>';

                                                        return new HtmlString($html);
                                                    }),

                                                // 2. FileUpload sekarang berfungsi untuk menambah atau mengganti gambar
                                                Forms\Components\FileUpload::make('images')
                                                    ->label('Upload / Tambah Foto Baru')
                                                    ->helperText('Foto yang diunggah akan ditambahkan ke galeri di atas.')
                                                    ->multiple()->reorderable()->appendFiles()->image()->imageEditor()
                                                    ->saveUploadedFileUsing(fn (UploadedFile $file): ?string => self::uploadToSupabase($file))
                                                    ->deleteUploadedFileUsing(function (?string $state): void {
                                                        self::deleteFromSupabase($state);
                                                    }),
                                            ]),
                                    ])
                                    ->collapsible()
                                    ->required(),
                            ]),
                    ])->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Pengaturan')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([1 => 'Tampilkan', 0 => 'Sembunyikan (Draft)'])
                                    ->default(1)->required(),
                                
                                Forms\Components\DateTimePicker::make('published_at')->default(now())->required(),

                                Hidden::make('image_path'),

                                Placeholder::make('thumb_preview')
                                    ->label('Thumbnail Saat Ini')
                                    ->content(function ($record, Get $get) {
                                        $url = $get('image_path') ?: ($record ? $record->image_path : null);
                                        if (!$url) return new HtmlString('<div class="text-xs text-gray-500 italic">Belum ada thumbnail.</div>');
                                        return new HtmlString('<img src="'.$url.'" style="max-width: 100%; border-radius: 6px;">');
                                    }),

                                Forms\Components\FileUpload::make('thumbnail_upload')
                                    ->label('Ganti Thumbnail')
                                    ->helperText('Kosongkan jika tidak ingin mengubah.')
                                    ->image()->imageEditor()
                                    ->saveUploadedFileUsing(fn (UploadedFile $file): ?string => self::uploadToSupabase($file))
                                    ->afterStateUpdated(function ($state, Set $set) {
                                        if ($state) {
                                            $url = is_array($state) ? array_values($state)[0] : $state;
                                            $set('image_path', $url);
                                        }
                                    })
                                    ->dehydrated(false),
                            ]),
                    ])->columnSpan(['lg' => 1]),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        // ... (Tidak ada perubahan di sini, sudah benar)
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')->label('Thumbnail'),
                Tables\Columns\TextColumn::make('title')->searchable()->sortable()->limit(50),
                Tables\Columns\TextColumn::make('status')
                    ->formatStateUsing(fn (int $state): string => $state === 1 ? 'Ditampilkan' : 'Disembunyikan')
                    ->badge()->color(fn (int $state): string => $state === 1 ? 'success' : 'danger'),
                Tables\Columns\TextColumn::make('published_at')->dateTime()->sortable()->label('Dipublikasikan'),
            ])
            ->defaultSort('published_at', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->before(function (Announcement $record) {
                        if ($record->image_path) {
                            self::deleteFromSupabase($record->image_path);
                        }
                        if (is_array($record->content)) {
                            foreach ($record->content as $block) {
                                if ($block['type'] === 'gallery' && isset($block['data']['images'])) {
                                    foreach ($block['data']['images'] as $image) {
                                        self::deleteFromSupabase($image);
                                    }
                                }
                            }
                        }
                    }),
            ]);
    }

    public static function getPages(): array
    {
        // ... (Tidak ada perubahan di sini, sudah benar)
        return [
            'index' => Pages\ListAnnouncements::route('/'),
            'create' => Pages\CreateAnnouncement::route('/create'),
            'edit' => Pages\EditAnnouncement::route('/{record}/edit'),
        ];
    }

    // --- HELPER FUNCTIONS (Tidak ada perubahan di sini, sudah benar) ---
    protected static function uploadToSupabase(UploadedFile $file): ?string
    {
        $fileName = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
        $bucketFolder = 'web-profile';
        $response = Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'), 'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
        ])->withBody(file_get_contents($file->getRealPath()), $file->getMimeType())
          ->post(env('SUPABASE_URL') . '/storage/v1/object/' . $bucketFolder . '/' . $fileName);

        return $response->successful() ? env('SUPABASE_URL') . '/storage/v1/object/public/' . $bucketFolder . '/' . $fileName : null;
    }

    protected static function deleteFromSupabase(?string $fileUrl): void
    {
        if (blank($fileUrl)) return;
        $filePath = str_replace(env('SUPABASE_URL') . '/storage/v1/object/public/', '', $fileUrl);
        Http::withHeaders([
            'apikey' => env('SUPABASE_KEY'), 'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
        ])->delete(env('SUPABASE_URL') . '/storage/v1/object/' . $filePath);
    }
}
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FacilityResource\Pages;
use App\Models\Facility;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Filament\Forms\Components\Placeholder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\HtmlString;

class FacilityResource extends Resource
{
    protected static ?string $model = Facility::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationLabel = 'Fasilitas';
    protected static ?string $navigationGroup = 'Konten Website';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // --- KOLOM KIRI (KONTEN UTAMA) ---
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make()
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->label('Nama Fasilitas')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => 
                                        $operation === 'create' ? $set('slug', Str::slug($state)) : null),

                                Forms\Components\TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated()
                                    ->required()
                                    ->unique(Facility::class, 'slug', ignoreRecord: true),

                                // Pilihan Kategori (Sesuai Fasilitas)
                                Forms\Components\Select::make('category')
                                    ->label('Kategori Fasilitas')
                                    ->options([
                                        Facility::CATEGORY_PERAWATAN => 'Fasilitas Perawatan',
                                        Facility::CATEGORY_PENUNJANG => 'Fasilitas Penunjang',
                                    ])
                                    ->required()
                                    ->native(false),

                                Forms\Components\Textarea::make('excerpt')
                                    ->label('Ringkasan')
                                    ->rows(3)
                                    ->maxLength(300)
                                    ->columnSpanFull(),

                                // --- REPEATER DENGAN SAFETY CHECK ---
                                Forms\Components\Repeater::make('content')
                                    ->label('Daftar Fasilitas (Tersedia)')
                                    ->helperText('Tambahkan item fasilitas yang tersedia satu per satu.')
                                    ->schema([
                                        Forms\Components\TextInput::make('item') // Key: 'item'
                                            ->hiddenLabel()
                                            ->placeholder('Nama Item (misal: AC, Wi-Fi)')
                                            ->required(),
                                    ])
                                    ->addActionLabel('Tambah Item')
                                    ->grid(2)
                                    ->defaultItems(1)
                                    ->columnSpanFull()
                                    // PENTING: Mencegah error jika data lama masih berupa string HTML
                                    ->formatStateUsing(fn ($state) => is_array($state) ? $state : []),
                            ])
                    ])->columnSpan(['lg' => 2]),

                // --- KOLOM KANAN (GAMBAR & STATUS) ---
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Gambar Fasilitas')
                            ->schema([
                                Placeholder::make('image_preview')
                                    ->label('Preview Gambar Saat Ini')
                                    ->content(function (?Model $record): ?HtmlString {
                                        if ($record && $record->image_path) {
                                            $html = '<img src="' . e($record->image_path) . '" alt="Gambar" style="max-width: 100%; height: auto; border-radius: 8px;">';
                                            return new HtmlString($html);
                                        }
                                        return null;
                                    })
                                    ->visible(fn (?Model $record) => $record && $record->exists && $record->image_path),

                                Forms\Components\FileUpload::make('image_path')
                                    ->label('Unggah Gambar')
                                    ->image()
                                    ->imageEditor()
                                    ->required(fn (string $context): bool => $context === 'create')
                                    ->saveUploadedFileUsing(function (UploadedFile $file): ?string {
                                        $fileName = time() . '_' . Str::slug($file->getClientOriginalName());
                                        $bucketFolder = 'web-profile'; 

                                        $response = Http::withHeaders([
                                            'apikey' => env('SUPABASE_KEY'),
                                            'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
                                        ])->withBody(
                                            file_get_contents($file->getRealPath()),
                                            $file->getMimeType()
                                        )->post(env('SUPABASE_URL') . '/storage/v1/object/' . $bucketFolder . '/' . $fileName);

                                        if ($response->failed()) {
                                            throw new \Exception('Unggah gambar gagal: ' . $response->body());
                                        }
                                        
                                        return env('SUPABASE_URL') . '/storage/v1/object/public/' . $bucketFolder . '/' . $fileName;
                                    })
                                    ->deleteUploadedFileUsing(function (?string $state): void {
                                        if (blank($state)) return;
                                        $filePath = str_replace(env('SUPABASE_URL') . '/storage/v1/object/public/', '', $state);
                                        
                                        Http::withHeaders([
                                            'apikey' => env('SUPABASE_KEY'),
                                            'Authorization' => 'Bearer ' . env('SUPABASE_KEY'),
                                        ])->delete(env('SUPABASE_URL') . '/storage/v1/object/' . $filePath);
                                    }),
                            ]),

                        Forms\Components\Section::make('Pengaturan')
                            ->schema([
                                Forms\Components\Toggle::make('status')
                                    ->label('Tampilkan di Web')
                                    ->default(1)
                                    ->onColor('success')
                                    ->offColor('danger'),

                                Forms\Components\DateTimePicker::make('published_at')
                                    ->label('Tanggal Publish')
                                    ->default(now()),
                            ])
                    ])->columnSpan(['lg' => 1]),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('Gambar'),
                
                Tables\Columns\TextColumn::make('title')
                    ->label('Nama Fasilitas')
                    ->searchable()
                    ->sortable()
                    ->limit(30),

                Tables\Columns\TextColumn::make('category')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        Facility::CATEGORY_PERAWATAN => 'success', // Hijau
                        Facility::CATEGORY_PENUNJANG => 'info',    // Biru
                        default => 'gray',
                    })
                    ->sortable(),

                Tables\Columns\IconColumn::make('status')
                    ->label('Status')
                    ->boolean(),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('Rilis')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        Facility::CATEGORY_PERAWATAN => 'Fasilitas Perawatan',
                        Facility::CATEGORY_PENUNJANG => 'Fasilitas Penunjang',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFacilities::route('/'),
            'create' => Pages\CreateFacility::route('/create'),
            'edit' => Pages\EditFacility::route('/{record}/edit'),
        ];
    }
}
<?php

namespace App\Filament\Resources\AnnouncementResource\Pages;

use App\Filament\Resources\AnnouncementResource;
use App\Models\Announcement;
use App\Models\PushToken;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CreateAnnouncement extends CreateRecord
{
    protected static string $resource = AnnouncementResource::class;

    /**
     * Generate excerpt otomatis
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (empty($data['excerpt'])) {

            $text = '';

            if (!empty($data['content']) && is_array($data['content'])) {

                foreach ($data['content'] as $block) {

                    if (
                        ($block['type'] ?? null) === 'paragraph'
                        && !empty($block['data']['content'])
                    ) {

                        $text .= ' ' . strip_tags($block['data']['content']);
                    }
                }
            }

            $data['excerpt'] = Str::limit(trim($text), 150);
        }

        Log::info('📄 DATA SEBELUM CREATE', [
            'data' => $data,
        ]);

        return $data;
    }

    /**
     * Hook setelah announcement berhasil dibuat
     */
    protected function afterCreate(): void
    {
        try {

            self::sendExpoNotification($this->record);

        } catch (\Throwable $e) {

            Log::error('🔥 GAGAL KIRIM NOTIF', [
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Kirim push notification Expo
     */
    public static function sendExpoNotification(Announcement $record): array
    {
        Log::info('🚀 MULAI KIRIM EXPO NOTIFICATION');

        $tokens = PushToken::pluck('token')->toArray();

        Log::info('📱 TOKEN DITEMUKAN', [
            'total' => count($tokens),
        ]);

        if (empty($tokens)) {

            Log::warning('❌ TIDAK ADA TOKEN');

            return [
                'success' => false,
                'message' => 'Tidak ada token',
            ];
        }

        $responses = [];

        // Expo maksimal 100 token per request
        $chunks = array_chunk($tokens, 100);

        foreach ($chunks as $index => $chunk) {

            $payload = [
                'to' => $chunk,
                'title' => '📢 Pengumuman Baru!',
                'body' => $record->title,
                'sound' => 'default',
                'priority' => 'high',
                'data' => [
                    'slug' => $record->slug,
                    'type' => 'announcement',
                ],
            ];

            Log::info('📦 PAYLOAD EXPO', [
                'chunk' => $index,
                'payload' => $payload,
            ]);

            try {

                $response = Http::withHeaders([
                    'Accept' => 'application/json',
                    'Accept-encoding' => 'gzip, deflate',
                    'Content-Type' => 'application/json',
                ])->post(
                    'https://exp.host/--/api/v2/push/send',
                    $payload
                );

                Log::info('📡 RESPONSE STATUS', [
                    'status' => $response->status(),
                ]);

                Log::info('📨 RESPONSE BODY', [
                    'body' => $response->json(),
                ]);

                $responses[] = [
                    'status' => $response->status(),
                    'body' => $response->json(),
                ];

            } catch (\Throwable $e) {

                Log::error('🔥 EXPO ERROR', [
                    'message' => $e->getMessage(),
                ]);

                $responses[] = [
                    'error' => $e->getMessage(),
                ];
            }
        }

        return [
            'success' => true,
            'responses' => $responses,
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
<?php

namespace App\Filament\Resources\JobVacancyResource\Pages;

use App\Filament\Resources\JobVacancyResource;
use App\Models\JobVacancy;
use App\Models\PushToken;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CreateJobVacancy extends CreateRecord
{
    protected static string $resource = JobVacancyResource::class;

    /**
     * Setelah data berhasil dibuat
     */
    protected function afterCreate(): void
    {
        try {

            self::sendExpoNotification($this->record);

        } catch (\Throwable $e) {

            Log::error('🔥 GAGAL KIRIM NOTIF JOB VACANCY', [
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Kirim Push Notification Expo
     */
    public static function sendExpoNotification(JobVacancy $record): array
    {
        Log::info('🚀 MULAI KIRIM EXPO NOTIFICATION JOB');

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
                'title' => '💼 Lowongan Kerja Baru!',
                'body' => $record->profession,
                'sound' => 'default',
                'priority' => 'high',
                'data' => [
                    'type' => 'job_vacancy',
                    'job_id' => $record->id,
                    'screen' => "/notifications/job/{$record->id}",
                ],
            ];

            Log::info('📦 PAYLOAD JOB', [
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

                Log::info('📡 RESPONSE STATUS JOB', [
                    'status' => $response->status(),
                ]);

                Log::info('📨 RESPONSE BODY JOB', [
                    'body' => $response->json(),
                ]);

                $responses[] = [
                    'status' => $response->status(),
                    'body' => $response->json(),
                ];

            } catch (\Throwable $e) {

                Log::error('🔥 EXPO ERROR JOB', [
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
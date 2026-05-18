<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PushToken extends Model
{
    protected $fillable = [

        'user_id',

        'token',

        'device_name',

        'device_brand',
        'device_manufacturer',
        'device_model',
        'device_model_id',

        'os_name',
        'os_version',

        'device_type',
        'is_device',

        'device_info',
    ];

    protected $casts = [
        'device_info' => 'array',
        'is_device' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
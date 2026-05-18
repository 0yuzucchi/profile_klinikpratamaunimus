<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('push_tokens', function (Blueprint $table) {

            $table->id();

            // user login (optional)
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->onDelete('cascade');

            // expo push token
            $table->string('token')->unique();

            // human readable
            $table->string('device_name')->nullable();

            // device detail
            $table->string('device_brand')->nullable();
            $table->string('device_manufacturer')->nullable();
            $table->string('device_model')->nullable();
            $table->string('device_model_id')->nullable();

            // system info
            $table->string('os_name')->nullable();
            $table->string('os_version')->nullable();

            // misc
            $table->integer('device_type')->nullable();
            $table->boolean('is_device')->default(true);

            // raw payload json
            $table->json('device_info')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('push_tokens');
    }
};
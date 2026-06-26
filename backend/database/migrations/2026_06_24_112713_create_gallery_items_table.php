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
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->string('id')->primary(); // e.g. 'clinic-lobby'
            $table->string('type'); // 'image', 'video'
            $table->string('category'); // 'infrastructure', 'treatments'
            $table->string('title');
            $table->string('thumbnail_path');
            $table->string('video_path')->nullable();
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_items');
    }
};

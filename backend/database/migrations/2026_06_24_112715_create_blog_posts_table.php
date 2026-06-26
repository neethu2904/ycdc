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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->string('id')->primary(); // e.g. 'prp-hair-science'
            $table->string('category'); // 'skin', 'hair', 'anti-aging'
            $table->string('category_label'); // 'Skin Care', 'Hair Care', etc.
            $table->string('title');
            $table->string('author');
            $table->string('date'); // e.g. 'June 18, 2026'
            $table->string('read_time'); // e.g. '5 min read'
            $table->text('excerpt');
            $table->string('image_path');
            $table->json('body_content'); // JSON array of paragraphs
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};

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
        Schema::create('services', function (Blueprint $table) {
            $table->string('id')->primary(); // text identifier like 'acne-therapy'
            $table->string('category'); // 'skin', 'hair', 'laser', 'aesthetics'
            $table->string('category_name'); // 'Clinical Dermatology', 'Hair & Scalp Care', etc.
            $table->string('name');
            $table->string('duration'); // e.g. '45 mins'
            $table->string('price_range'); // e.g. '₹1,800 - ₹3,500'
            $table->text('description');
            $table->text('science'); // e.g. scientific details / how it works
            $table->text('treats'); // e.g. symptoms or concerns treated
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};

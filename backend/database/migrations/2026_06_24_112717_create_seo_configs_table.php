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
        Schema::create('seo_configs', function (Blueprint $table) {
            $table->id();
            $table->string('route_name')->unique(); // e.g. 'home', 'about', 'team', 'treatments', etc.
            $table->string('title');
            $table->text('meta_description');
            $table->string('keywords')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seo_configs');
    }
};

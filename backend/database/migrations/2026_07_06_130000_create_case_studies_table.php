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
        Schema::create('case_studies', function (Blueprint $table) {
            $table->string('id')->primary(); // e.g. 'gfc-treatment'
            $table->string('category');
            $table->string('category_label');
            $table->string('title');
            $table->text('description');
            $table->string('before_img_path');
            $table->string('after_img_path');
            $table->string('doctor');
            $table->string('technology');
            $table->string('sessions');
            $table->string('concern');
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_studies');
    }
};

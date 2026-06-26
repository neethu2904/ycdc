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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('branch'); // e.g. 'Whitefield, Bangalore' or 'Pattom, Trivandrum'
            $table->string('patient_name');
            $table->string('patient_phone');
            $table->string('patient_email')->nullable();
            $table->string('service_requested')->nullable(); // For Appointments
            $table->string('doctor_requested')->nullable();  // For Appointments
            $table->string('preferred_date')->nullable();   // For Appointments
            $table->string('preferred_time')->nullable();   // For Appointments
            $table->string('concern_type')->nullable();     // For Virtual Screenings
            $table->text('medical_history')->nullable();    // For Virtual Screenings
            $table->string('photo_attached')->nullable();   // For Virtual Screenings
            $table->string('status')->default('Pending');   // 'Pending', 'Contacted', 'Confirmed', 'Closed'
            $table->string('type');                         // 'Appointment' or 'Online Consultation' or 'Contact'
            $table->text('notes')->nullable();              // Admin internal notes
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};

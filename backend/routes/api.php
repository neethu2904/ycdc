<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorCrudController;
use App\Http\Controllers\TestimonialCrudController;
use App\Http\Controllers\TreatmentCrudController;
use App\Http\Controllers\GalleryCrudController;
use App\Http\Controllers\LeadCrudController;
use App\Http\Controllers\BlogCrudController;
use App\Http\Controllers\CaseStudyCrudController;
use App\Http\Controllers\SeoCrudController;

// Public APIs
Route::get('/doctors', [ApiController::class, 'getDoctors']);
Route::get('/services', [ApiController::class, 'getServices']);
Route::get('/gallery', [ApiController::class, 'getGallery']);
Route::get('/blog', [ApiController::class, 'getBlogs']);
Route::get('/seo', [ApiController::class, 'getSeo']);
Route::get('/case-studies', [ApiController::class, 'getCaseStudies']);
Route::post('/leads', [ApiController::class, 'createLead']);

// Public Testimonials
Route::get('/testimonials', function () {
    return response()->json(\App\Models\Testimonial::where('active', true)->orderBy('id', 'desc')->get());
});

// Authentication Routes
Route::post('/login', [AuthController::class, 'login']);

// Protected Admin APIs
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // CRUD Endpoints
    Route::apiResource('admin/doctors', DoctorCrudController::class);
    Route::apiResource('admin/testimonials', TestimonialCrudController::class);
    Route::apiResource('admin/services', TreatmentCrudController::class);
    Route::apiResource('admin/gallery', GalleryCrudController::class);
    Route::apiResource('admin/blogs', BlogCrudController::class);
    Route::apiResource('admin/case-studies', CaseStudyCrudController::class);
    Route::apiResource('admin/seo', SeoCrudController::class);
    
    // Scoped Leads CRM endpoints
    Route::get('/admin/leads', [LeadCrudController::class, 'index']);
    Route::post('/admin/leads', [LeadCrudController::class, 'store']);
    Route::get('/admin/leads/{id}', [LeadCrudController::class, 'show']);
    Route::put('/admin/leads/{id}', [LeadCrudController::class, 'update']);
    Route::put('/admin/leads/{id}/status', [LeadCrudController::class, 'updateStatus']);
    Route::put('/admin/leads/{id}/notes', [LeadCrudController::class, 'updateNotes']);
    Route::delete('/admin/leads/{id}', [LeadCrudController::class, 'destroy']);
    
    // DB Reset (for debugging)
    Route::post('/leads/reset', [ApiController::class, 'resetLeads']);
});

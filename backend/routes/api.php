<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/doctors', [ApiController::class, 'getDoctors']);
Route::get('/services', [ApiController::class, 'getServices']);
Route::get('/gallery', [ApiController::class, 'getGallery']);
Route::get('/blog', [ApiController::class, 'getBlogs']);
Route::get('/seo', [ApiController::class, 'getSeo']);
Route::post('/leads', [ApiController::class, 'createLead']);
Route::get('/leads', [ApiController::class, 'getLeads']);
Route::put('/leads/{id}/status', [ApiController::class, 'updateLeadStatus']);
Route::delete('/leads/{id}', [ApiController::class, 'deleteLead']);
Route::post('/leads/reset', [ApiController::class, 'resetLeads']);


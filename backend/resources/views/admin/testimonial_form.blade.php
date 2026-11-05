@extends('admin.layout')

@section('title', $testimonial ? 'Edit Testimonial' : 'Add Testimonial')
@section('header_title', $testimonial ? 'Edit Testimonial' : 'Add Testimonial')

@section('content')
    <div class="card" style="max-width: 650px; margin: 0 auto;">
        <div class="card-header">
            <h3 class="card-title">{{ $testimonial ? 'Modify Testimonial from ' . $testimonial->name : 'Add New Patient Testimonial' }}</h3>
            <a href="{{ route('admin.testimonials') }}" class="btn btn-outline btn-sm">Back to Testimonials</a>
        </div>

        <form action="{{ $testimonial ? route('admin.testimonials.update', $testimonial->id) : route('admin.testimonials.store') }}" method="POST">
            @csrf

            <div class="form-group">
                <label class="form-label" for="name">Patient Name</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="e.g. Ananya Sharma" value="{{ old('name', $testimonial ? $testimonial->name : '') }}" required>
                @error('name')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label class="form-label" for="rating">Rating (Stars)</label>
                    <select name="rating" id="rating" class="form-control" required>
                        <option value="5" {{ old('rating', $testimonial ? $testimonial->rating : 5) == 5 ? 'selected' : '' }}>★★★★★ (5 Stars)</option>
                        <option value="4" {{ old('rating', $testimonial ? $testimonial->rating : 5) == 4 ? 'selected' : '' }}>★★★★☆ (4 Stars)</option>
                        <option value="3" {{ old('rating', $testimonial ? $testimonial->rating : 5) == 3 ? 'selected' : '' }}>★★★☆☆ (3 Stars)</option>
                        <option value="2" {{ old('rating', $testimonial ? $testimonial->rating : 5) == 2 ? 'selected' : '' }}>★★☆☆☆ (2 Stars)</option>
                        <option value="1" {{ old('rating', $testimonial ? $testimonial->rating : 5) == 1 ? 'selected' : '' }}>★☆☆☆☆ (1 Star)</option>
                    </select>
                    @error('rating')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label" for="treatment">Treatment / Procedure Taken</label>
                    <input type="text" name="treatment" id="treatment" class="form-control" placeholder="e.g. Secret RF & Acne Resurfacing" value="{{ old('treatment', $testimonial ? $testimonial->treatment : '') }}">
                    @error('treatment')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="text">Patient Review & Feedback</label>
                <textarea name="text" id="text" class="form-control" placeholder="Enter patient feedback quote..." rows="5" required>{{ old('text', $testimonial ? $testimonial->text : '') }}</textarea>
                @error('text')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="checkbox-container">
                    <input type="checkbox" name="active" value="1" {{ old('active', $testimonial ? $testimonial->active : true) ? 'checked' : '' }}>
                    <span>Active Testimonial (Visible in frontend testimonials carousel)</span>
                </label>
            </div>

            <div style="border-top: 1px solid var(--silk-100); padding-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="{{ route('admin.testimonials') }}" class="btn btn-outline">Cancel</a>
                <button type="submit" class="btn btn-primary">{{ $testimonial ? 'Save Changes' : 'Publish Testimonial' }}</button>
            </div>
        </form>
    </div>
@endsection


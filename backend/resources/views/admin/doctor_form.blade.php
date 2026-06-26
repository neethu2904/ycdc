@extends('admin.layout')

@section('title', $doctor ? 'Edit Doctor Profile' : 'Add New Doctor')
@section('header_title', $doctor ? 'Edit Doctor Profile' : 'Add New Doctor')

@section('content')
    <div class="card" style="max-width: 700px; margin: 0 auto;">
        <div class="card-header">
            <h3 class="card-title">{{ $doctor ? 'Modify details for ' . $doctor->name : 'Register New Medical Professional' }}</h3>
            <a href="{{ route('admin.doctors') }}" class="btn btn-outline btn-sm">Back to Directory</a>
        </div>

        <form action="{{ $doctor ? route('admin.doctors.update', $doctor->id) : route('admin.doctors.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            <div class="form-group">
                <label class="form-label" for="name">Doctor Name</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="Dr. Niranjana Raj" value="{{ old('name', $doctor ? $doctor->name : '') }}" required>
                @error('name')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="qualification">Qualifications & Credentials</label>
                <input type="text" name="qualification" id="qualification" class="form-control" placeholder="FRGUHS, MD (Dermatology)" value="{{ old('qualification', $doctor ? $doctor->qualification : '') }}" required>
                @error('qualification')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="designation">Clinic Designation / Role</label>
                <input type="text" name="designation" id="designation" class="form-control" placeholder="Chief Consultant Dermatologist" value="{{ old('designation', $doctor ? $doctor->designation : '') }}">
                @error('designation')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="branch">Clinic Branch / Location</label>
                <select name="branch" id="branch" class="form-control" required>
                    <option value="bangalore" {{ old('branch', $doctor ? $doctor->branch : '') === 'bangalore' ? 'selected' : '' }}>Whitefield, Bangalore</option>
                    <option value="trivandrum" {{ old('branch', $doctor ? $doctor->branch : '') === 'trivandrum' ? 'selected' : '' }}>Pattom, Trivandrum</option>
                </select>
                @error('branch')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="instagram_url">Instagram Profile Link</label>
                <input type="url" name="instagram_url" id="instagram_url" class="form-control" placeholder="https://www.instagram.com/profile" value="{{ old('instagram_url', $doctor ? $doctor->instagram_url : '') }}">
                @error('instagram_url')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="bio">Professional Biography</label>
                <textarea name="bio" id="bio" class="form-control" placeholder="Provide details about their clinical experience, specialties, etc...">{{ old('bio', $doctor ? $doctor->bio : '') }}</textarea>
                @error('bio')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="image">Profile Photo</label>
                @if($doctor && $doctor->image_path)
                    <div style="margin-bottom: 12px;">
                        <img src="{{ $doctor->image_path }}" alt="Current Photo" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover; border: 1px solid var(--silk-200);">
                        <p style="font-size: 0.75rem; color: var(--muted-charcoal);">Leave blank to retain current photo</p>
                    </div>
                @endif
                <input type="file" name="image" id="image" class="form-control" accept="image/*">
                <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 6px;">Supported files: JPG, PNG, WEBP. Max size: 2MB.</p>
                @error('image')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="checkbox-container">
                    <input type="checkbox" name="active" value="1" {{ old('active', $doctor ? $doctor->active : true) ? 'checked' : '' }}>
                    <span>Active Profile (Visible in frontend clinician lists)</span>
                </label>
            </div>

            <div style="border-top: 1px solid var(--silk-100); padding-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="{{ route('admin.doctors') }}" class="btn btn-outline">Cancel</a>
                <button type="submit" class="btn btn-primary">{{ $doctor ? 'Save Changes' : 'Publish Profile' }}</button>
            </div>
        </form>
    </div>
@endsection

@extends('admin.layout')

@section('title', $item ? 'Edit Gallery Item' : 'Add Gallery Item')
@section('header_title', $item ? 'Edit Gallery Item' : 'Add Gallery Item')

@section('content')
    <div class="card" style="max-width: 700px; margin: 0 auto;">
        <div class="card-header">
            <h3 class="card-title">{{ $item ? 'Modify media details for ' . $item->title : 'Upload New Gallery Asset' }}</h3>
            <a href="{{ route('admin.gallery') }}" class="btn btn-outline btn-sm">Back to Gallery</a>
        </div>

        <form action="{{ $item ? route('admin.gallery.update', $item->id) : route('admin.gallery.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            @if(!$item)
                <div class="form-group">
                    <label class="form-label" for="id">Unique Key / URL Slug</label>
                    <input type="text" name="id" id="id" class="form-control" placeholder="e.g. lobby-tour" value="{{ old('id') }}" required>
                    @error('id')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            @endif

            <div class="form-group">
                <label class="form-label" for="title">Title / Headline</label>
                <input type="text" name="title" id="title" class="form-control" placeholder="e.g. Advanced Q-Switched Laser Room" value="{{ old('title', $item ? $item->title : '') }}" required>
                @error('title')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            @if(!$item)
                <div class="form-group">
                    <label class="form-label" for="type">Media Type</label>
                    <select name="type" id="type" class="form-control" onchange="toggleVideoField(this.value)" required>
                        <option value="" disabled selected>Select media type...</option>
                        <option value="image" {{ old('type') === 'image' ? 'selected' : '' }}>Photo / Image</option>
                        <option value="video" {{ old('type') === 'video' ? 'selected' : '' }}>Video Clip</option>
                    </select>
                    @error('type')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            @endif

            <div class="form-group">
                <label class="form-label" for="category">Media Category</label>
                <select name="category" id="category" class="form-control" required>
                    <option value="" disabled selected>Select category...</option>
                    <option value="infrastructure" {{ old('category', $item ? $item->category : '') === 'infrastructure' ? 'selected' : '' }}>Clinic Infrastructure / Facility</option>
                    <option value="treatments" {{ old('category', $item ? $item->category : '') === 'treatments' ? 'selected' : '' }}>Treatments & Clinical in Action</option>
                </select>
                @error('category')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="description">Short Description</label>
                <textarea name="description" id="description" class="form-control" placeholder="Briefly describe what this photo or video shows..." required>{{ old('description', $item ? $item->description : '') }}</textarea>
                @error('description')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="thumbnail">Thumbnail Image @if($item)(Optional)@endif</label>
                @if($item && $item->thumbnail_path)
                    <div style="margin-bottom: 12px;">
                        <img src="{{ $item->thumbnail_path }}" alt="Current Thumbnail" style="width: 120px; height: 80px; border-radius: 6px; object-fit: cover; border: 1px solid var(--silk-200);">
                    </div>
                @endif
                <input type="file" name="thumbnail" id="thumbnail" class="form-control" accept="image/*" {{ !$item ? 'required' : '' }}>
                <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 6px;">Required as cover image. Max size: 2MB.</p>
                @error('thumbnail')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group" id="video_field" style="display: {{ ($item && $item->type === 'video') || old('type') === 'video' ? 'block' : 'none' }};">
                <label class="form-label" for="video">Video File (MP4, WebM)</label>
                @if($item && $item->video_path)
                    <div style="margin-bottom: 12px; font-size: 0.85rem; color: var(--plum-800); font-weight: bold;">
                        Current Video: {{ basename($item->video_path) }}
                    </div>
                @endif
                <input type="file" name="video" id="video" class="form-control" accept="video/*">
                <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 6px;">Video file upload. Max size: 10MB.</p>
                @error('video')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div style="border-top: 1px solid var(--silk-100); padding-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="{{ route('admin.gallery') }}" class="btn btn-outline">Cancel</a>
                <button type="submit" class="btn btn-primary">{{ $item ? 'Save Changes' : 'Upload Media' }}</button>
            </div>
        </form>
    </div>
@endsection

@section('scripts')
<script>
    function toggleVideoField(val) {
        const field = document.getElementById('video_field');
        if (field) {
            field.style.display = (val === 'video') ? 'block' : 'none';
        }
    }
</script>
@endsection

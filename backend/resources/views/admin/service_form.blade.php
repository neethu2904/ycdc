@extends('admin.layout')

@section('title', $service ? 'Edit Treatment' : 'Add New Treatment')
@section('header_title', $service ? 'Edit Treatment' : 'Add New Treatment')

@section('content')
    <div class="card" style="max-width: 700px; margin: 0 auto;">
        <div class="card-header">
            <h3 class="card-title">{{ $service ? 'Modify details for ' . $service->name : 'Configure New Clinical Treatment' }}</h3>
            <a href="{{ route('admin.services') }}" class="btn btn-outline btn-sm">Back to Services</a>
        </div>

        <form action="{{ $service ? route('admin.services.update', $service->id) : route('admin.services.store') }}" method="POST">
            @csrf
            
            @if(!$service)
                <div class="form-group">
                    <label class="form-label" for="id">Unique Key / URL Slug</label>
                    <input type="text" name="id" id="id" class="form-control" placeholder="e.g. acne-therapy" value="{{ old('id') }}" required>
                    <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 4px;">Lower-case characters, digits, and hyphens only. Used inside the frontend URL structure.</p>
                    @error('id')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            @endif

            <div class="form-group">
                <label class="form-label" for="name">Treatment Name</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="e.g. PRP Hair Growth Therapy" value="{{ old('name', $service ? $service->name : '') }}" required>
                @error('name')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="category">Category Type</label>
                <select name="category" id="category" class="form-control" onchange="updateCategoryName(this.value)" required>
                    <option value="" disabled selected>Select category...</option>
                    <option value="skin" {{ old('category', $service ? $service->category : '') === 'skin' ? 'selected' : '' }}>Clinical Dermatology (skin)</option>
                    <option value="hair" {{ old('category', $service ? $service->category : '') === 'hair' ? 'selected' : '' }}>Hair & Scalp Care (hair)</option>
                    <option value="laser" {{ old('category', $service ? $service->category : '') === 'laser' ? 'selected' : '' }}>Lasers & RF (laser)</option>
                    <option value="aesthetics" {{ old('category', $service ? $service->category : '') === 'aesthetics' ? 'selected' : '' }}>Cosmetic Aesthetics (aesthetics)</option>
                </select>
                @error('category')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="category_name">Category Label</label>
                <input type="text" name="category_name" id="category_name" class="form-control" placeholder="e.g. Clinical Dermatology" value="{{ old('category_name', $service ? $service->category_name : '') }}" required>
                <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 4px;">Human readable text shown on the badges (e.g. "Clinical Dermatology", "Hair & Scalp Care", "Laser & Aesthetics", "Cosmetic Aesthetics")</p>
                @error('category_name')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="duration">Session Duration</label>
                <input type="text" name="duration" id="duration" class="form-control" placeholder="e.g. 45 mins" value="{{ old('duration', $service ? $service->duration : '') }}" required>
                @error('duration')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="price_range">Estimated Price / Range</label>
                <input type="text" name="price_range" id="price_range" class="form-control" placeholder="e.g. ₹1,800 - ₹3,500" value="{{ old('price_range', $service ? $service->price_range : '') }}" required>
                @error('price_range')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="description">Treatment Description</label>
                <textarea name="description" id="description" class="form-control" placeholder="Provide a summary of the treatment and benefits..." required>{{ old('description', $service ? $service->description : '') }}</textarea>
                @error('description')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="science">Scientific Explanation (How it works)</label>
                <textarea name="science" id="science" class="form-control" placeholder="Describe the science/mechanisms behind the treatment (e.g. Selective photothermolysis where...)" required>{{ old('science', $service ? $service->science : '') }}</textarea>
                @error('science')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="treats">Indications (What it treats)</label>
                <input type="text" name="treats" id="treats" class="form-control" placeholder="e.g. Active acne, rolling scars, dark spots." value="{{ old('treats', $service ? $service->treats : '') }}" required>
                @error('treats')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="checkbox-container">
                    <input type="checkbox" name="active" value="1" {{ old('active', $service ? $service->active : true) ? 'checked' : '' }}>
                    <span>Active Service (Visible in frontend lists)</span>
                </label>
            </div>

            <div style="border-top: 1px solid var(--silk-100); padding-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="{{ route('admin.services') }}" class="btn btn-outline">Cancel</a>
                <button type="submit" class="btn btn-primary">{{ $service ? 'Save Changes' : 'Publish Treatment' }}</button>
            </div>
        </form>
    </div>
@endsection

@section('scripts')
<script>
    function updateCategoryName(val) {
        const catMap = {
            'skin': 'Clinical Dermatology',
            'hair': 'Hair & Scalp Care',
            'laser': 'Laser & Aesthetics',
            'aesthetics': 'Cosmetic Aesthetics'
        };
        const labelInput = document.getElementById('category_name');
        if (labelInput && catMap[val]) {
            labelInput.value = catMap[val];
        }
    }
</script>
@endsection

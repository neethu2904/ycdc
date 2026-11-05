@extends('admin.layout')

@section('title', $caseStudy ? 'Edit Case Study' : 'Add Case Study')
@section('header_title', $caseStudy ? 'Edit Case Study' : 'Add Case Study')

@section('content')
    <div class="card" style="max-width: 750px; margin: 0 auto;">
        <div class="card-header">
            <h3 class="card-title">{{ $caseStudy ? 'Modify Case Study: ' . $caseStudy->title : 'Configure New Clinical Case Study' }}</h3>
            <a href="{{ route('admin.case_studies') }}" class="btn btn-outline btn-sm">Back to Case Studies</a>
        </div>

        <form action="{{ $caseStudy ? route('admin.case_studies.update', $caseStudy->id) : route('admin.case_studies.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            @if(!$caseStudy)
                <div class="form-group">
                    <label class="form-label" for="id">Unique Key / Slug</label>
                    <input type="text" name="id" id="id" class="form-control" placeholder="e.g. gfc-treatment or acne-correction" value="{{ old('id') }}" required>
                    <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 4px;">Lower-case characters and hyphens only.</p>
                    @error('id')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            @endif

            <div class="form-group">
                <label class="form-label" for="title">Case Study Title</label>
                <input type="text" name="title" id="title" class="form-control" placeholder="e.g. Growth Factor Concentrate (GFC) Treatment" value="{{ old('title', $caseStudy ? $caseStudy->title : '') }}" required>
                @error('title')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label class="form-label" for="category">Category</label>
                    <select name="category" id="category" class="form-control" onchange="updateCaseCategoryLabel(this.value)" required>
                        <option value="" disabled selected>Select category...</option>
                        <option value="skin" {{ old('category', $caseStudy ? $caseStudy->category : '') === 'skin' ? 'selected' : '' }}>Clinical Dermatology (skin)</option>
                        <option value="hair" {{ old('category', $caseStudy ? $caseStudy->category : '') === 'hair' ? 'selected' : '' }}>Hair & Scalp Care (hair)</option>
                        <option value="laser" {{ old('category', $caseStudy ? $caseStudy->category : '') === 'laser' ? 'selected' : '' }}>Lasers & RF (laser)</option>
                        <option value="aesthetics" {{ old('category', $caseStudy ? $caseStudy->category : '') === 'aesthetics' ? 'selected' : '' }}>Cosmetic Aesthetics (aesthetics)</option>
                    </select>
                    @error('category')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label" for="category_label">Category Label</label>
                    <input type="text" name="category_label" id="category_label" class="form-control" placeholder="e.g. GFC Therapy or Acne Resurfacing" value="{{ old('category_label', $caseStudy ? $caseStudy->category_label : '') }}" required>
                    @error('category_label')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label class="form-label" for="doctor">Supervising Clinician / Doctor</label>
                    <input type="text" name="doctor" id="doctor" class="form-control" placeholder="e.g. Dr. Niranjana Raj" value="{{ old('doctor', $caseStudy ? $caseStudy->doctor : '') }}" required>
                    @error('doctor')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label" for="technology">Technology / Procedure Used</label>
                    <input type="text" name="technology" id="technology" class="form-control" placeholder="e.g. Fractional RF Microneedling & Glycolic Peels" value="{{ old('technology', $caseStudy ? $caseStudy->technology : '') }}" required>
                    @error('technology')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label class="form-label" for="sessions">Sessions & Timeline</label>
                    <input type="text" name="sessions" id="sessions" class="form-control" placeholder="e.g. 3 Sessions (spaced 4 weeks apart)" value="{{ old('sessions', $caseStudy ? $caseStudy->sessions : '') }}" required>
                    @error('sessions')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label" for="concern">Target Concern / Diagnosis</label>
                    <input type="text" name="concern" id="concern" class="form-control" placeholder="e.g. Severe rolling scars, active blemishes" value="{{ old('concern', $caseStudy ? $caseStudy->concern : '') }}" required>
                    @error('concern')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="description">Case Description & Clinical Details</label>
                <textarea name="description" id="description" class="form-control" placeholder="Provide background on the patient's condition, treatment protocol, and clinical outcomes..." rows="4" required>{{ old('description', $caseStudy ? $caseStudy->description : '') }}</textarea>
                @error('description')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label class="form-label" for="before_image">Before Image {{ $caseStudy ? '(Optional replace)' : '' }}</label>
                    @if($caseStudy && $caseStudy->before_img_path)
                        <div style="margin-bottom: 8px;">
                            <img src="{{ $caseStudy->before_img_path }}" alt="Current Before" style="height: 70px; border-radius: 6px; border: 1px solid var(--silk-200); object-fit: cover;">
                        </div>
                    @endif
                    <input type="file" name="before_image" id="before_image" class="form-control" accept="image/jpeg,image/png,image/webp" {{ $caseStudy ? '' : 'required' }}>
                    <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 4px;">JPG, PNG, WebP (Max 2MB)</p>
                    @error('before_image')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label" for="after_image">After Image {{ $caseStudy ? '(Optional replace)' : '' }}</label>
                    @if($caseStudy && $caseStudy->after_img_path)
                        <div style="margin-bottom: 8px;">
                            <img src="{{ $caseStudy->after_img_path }}" alt="Current After" style="height: 70px; border-radius: 6px; border: 1px solid var(--silk-200); object-fit: cover;">
                        </div>
                    @endif
                    <input type="file" name="after_image" id="after_image" class="form-control" accept="image/jpeg,image/png,image/webp" {{ $caseStudy ? '' : 'required' }}>
                    <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 4px;">JPG, PNG, WebP (Max 2MB)</p>
                    @error('after_image')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="form-group">
                <label class="checkbox-container">
                    <input type="checkbox" name="active" value="1" {{ old('active', $caseStudy ? $caseStudy->active : true) ? 'checked' : '' }}>
                    <span>Active Case Study (Visible in frontend Before/After showcase)</span>
                </label>
            </div>

            <div style="border-top: 1px solid var(--silk-100); padding-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="{{ route('admin.case_studies') }}" class="btn btn-outline">Cancel</a>
                <button type="submit" class="btn btn-primary">{{ $caseStudy ? 'Save Changes' : 'Publish Case Study' }}</button>
            </div>
        </form>
    </div>
@endsection

@section('scripts')
<script>
    function updateCaseCategoryLabel(val) {
        const catMap = {
            'skin': 'Clinical Dermatology',
            'hair': 'GFC Therapy',
            'laser': 'Laser Resurfacing',
            'aesthetics': 'Cosmetic Aesthetics'
        };
        const labelInput = document.getElementById('category_label');
        if (labelInput && !labelInput.value && catMap[val]) {
            labelInput.value = catMap[val];
        }
    }
</script>
@endsection


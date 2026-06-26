@extends('admin.layout')

@section('title', $blog ? 'Edit Blog Article' : 'Write New Article')
@section('header_title', $blog ? 'Edit Blog Article' : 'Write New Article')

@section('content')
    <div class="card" style="max-width: 800px; margin: 0 auto;">
        <div class="card-header">
            <h3 class="card-title">{{ $blog ? 'Modify article: ' . $blog->title : 'Compose New Clinical Insight' }}</h3>
            <a href="{{ route('admin.blog') }}" class="btn btn-outline btn-sm">Back to Articles</a>
        </div>

        <form action="{{ $blog ? route('admin.blog.update', $blog->id) : route('admin.blog.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            @if(!$blog)
                <div class="form-group">
                    <label class="form-label" for="id">Unique Key / URL Slug</label>
                    <input type="text" name="id" id="id" class="form-control" placeholder="e.g. prp-hair-science" value="{{ old('id') }}" required>
                    @error('id')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            @endif

            <div class="form-group">
                <label class="form-label" for="title">Article Title</label>
                <input type="text" name="title" id="title" class="form-control" placeholder="e.g. Understanding PRP Hair Growth Therapy: Science & Expected Results" value="{{ old('title', $blog ? $blog->title : '') }}" required>
                @error('title')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label class="form-label" for="author">Author Profile / Name</label>
                    <input type="text" name="author" id="author" class="form-control" placeholder="e.g. Dr. Niranjana Raj (Chief Consultant)" value="{{ old('author', $blog ? $blog->author : '') }}" required>
                    @error('author')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
                <div>
                    <label class="form-label" for="read_time">Estimated Read Time</label>
                    <input type="text" name="read_time" id="read_time" class="form-control" placeholder="e.g. 5 min read" value="{{ old('read_time', $blog ? $blog->read_time : '') }}" required>
                    @error('read_time')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label class="form-label" for="category">Category Type</label>
                    <select name="category" id="category" class="form-control" onchange="updateCategoryLabel(this.value)" required>
                        <option value="" disabled selected>Select category...</option>
                        <option value="skin" {{ old('category', $blog ? $blog->category : '') === 'skin' ? 'selected' : '' }}>Skin Care (skin)</option>
                        <option value="hair" {{ old('category', $blog ? $blog->category : '') === 'hair' ? 'selected' : '' }}>Hair Care (hair)</option>
                        <option value="anti-aging" {{ old('category', $blog ? $blog->category : '') === 'anti-aging' ? 'selected' : '' }}>Anti-Aging (anti-aging)</option>
                    </select>
                    @error('category')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
                <div>
                    <label class="form-label" for="category_label">Category Label</label>
                    <input type="text" name="category_label" id="category_label" class="form-control" placeholder="e.g. Skin Care" value="{{ old('category_label', $blog ? $blog->category_label : '') }}" required>
                    @error('category_label')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="excerpt">Article Excerpt / Summary</label>
                <textarea name="excerpt" id="excerpt" class="form-control" placeholder="Provide a 1-2 sentence compelling summary of this article..." required>{{ old('excerpt', $blog ? $blog->excerpt : '') }}</textarea>
                @error('excerpt')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="image">Cover Image @if($blog)(Optional)@endif</label>
                @if($blog && $blog->image_path)
                    <div style="margin-bottom: 12px;">
                        <img src="{{ $blog->image_path }}" alt="Current Image" style="width: 150px; height: 100px; border-radius: 6px; object-fit: cover; border: 1px solid var(--silk-200);">
                    </div>
                @endif
                <input type="file" name="image" id="image" class="form-control" accept="image/*" {{ !$blog ? 'required' : '' }}>
                <p style="font-size: 0.75rem; color: var(--muted-charcoal); margin-top: 6px;">Supported: JPG, PNG, WEBP. Max: 2MB.</p>
                @error('image')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="body_content">Article Body Content (Paragraphs)</label>
                <textarea name="body_content" id="body_content" class="form-control" style="min-height: 350px;" placeholder="Write your paragraphs here. Separate each paragraph by pressing ENTER (newline). A double enter or single enter translates into separate paragraph blocks in the React app." required>{{ old('body_content', $blog ? $bodyString : '') }}</textarea>
                @error('body_content')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div style="border-top: 1px solid var(--silk-100); padding-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="{{ route('admin.blog') }}" class="btn btn-outline">Cancel</a>
                <button type="submit" class="btn btn-primary">{{ $blog ? 'Save Changes' : 'Publish Article' }}</button>
            </div>
        </form>
    </div>
@endsection

@section('scripts')
<script>
    function updateCategoryLabel(val) {
        const catMap = {
            'skin': 'Skin Care',
            'hair': 'Hair Care',
            'anti-aging': 'Anti-Aging'
        };
        const labelInput = document.getElementById('category_label');
        if (labelInput && catMap[val]) {
            labelInput.value = catMap[val];
        }
    }
</script>
@endsection

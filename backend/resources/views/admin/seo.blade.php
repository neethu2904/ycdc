@extends('admin.layout')

@section('title', 'Manage SEO Settings')
@section('header_title', 'SEO Management')

@section('content')
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Search Engine Optimization (SEO) Configs</h3>
            <p style="font-size: 0.85rem; color: var(--muted-charcoal); max-width: 600px; margin-top: 4px;">
                Configure the browser meta tags injected dynamically on each page of the React frontend app.
            </p>
        </div>

        @if($configs->count() > 0)
            <div style="display: flex; flex-direction: column; gap: 30px;">
                @foreach($configs as $config)
                    <div style="background-color: white; border: 1px solid var(--silk-200); border-radius: 8px; padding: 24px; box-shadow: var(--shadow-sm);">
                        
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--silk-100); padding-bottom: 10px;">
                            <div>
                                <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: bold; color: var(--gold-600);">Route Key: {{ $config->route_name }}</span>
                                <h4 style="font-family: 'Playfair Display', serif; font-size: 1.25rem; color: var(--plum-900); margin-top: 4px;">
                                    {{ ucfirst(str_replace('-', ' ', $config->route_name)) }} Page Settings
                                </h4>
                            </div>
                            <span class="badge" style="background-color: var(--plum-100); color: var(--plum-800);">Active API</span>
                        </div>

                        <form action="{{ route('admin.seo.update', $config->id) }}" method="POST">
                            @csrf
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px;">
                                <div class="form-group" style="margin-bottom: 0;">
                                    <label class="form-label" for="title_{{ $config->id }}">Browser Title Tag (&lt;title&gt;)</label>
                                    <input type="text" name="title" id="title_{{ $config->id }}" class="form-control" value="{{ old('title', $config->title) }}" required>
                                    @error('title')
                                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="form-group" style="margin-bottom: 0;">
                                    <label class="form-label" for="keywords_{{ $config->id }}">Keywords Meta Tag (Comma-separated)</label>
                                    <input type="text" name="keywords" id="keywords_{{ $config->id }}" class="form-control" value="{{ old('keywords', $config->keywords) }}">
                                    @error('keywords')
                                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 20px;">
                                <label class="form-label" for="desc_{{ $config->id }}">Meta Description Tag</label>
                                <textarea name="meta_description" id="desc_{{ $config->id }}" class="form-control" style="min-height: 80px;" required>{{ old('meta_description', $config->meta_description) }}</textarea>
                                @error('meta_description')
                                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                                @enderror
                            </div>

                            <div style="display: flex; justify-content: flex-end;">
                                <button type="submit" class="btn btn-primary btn-sm">Update SEO Config</button>
                            </div>
                        </form>

                    </div>
                @endforeach
            </div>
        @else
            <div style="text-align: center; padding: 40px; color: var(--muted-charcoal);">
                <p>No SEO configuration routes seeded in the database.</p>
            </div>
        @endif
    </div>
@endsection

@extends('admin.layout')

@section('title', 'Before & After Case Studies')
@section('header_title', 'Clinical Case Studies')

@section('content')
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Before & After Transformations</h3>
            <a href="{{ route('admin.case_studies.create') }}" class="btn btn-primary">Add New Case Study</a>
        </div>

        @if($caseStudies->count() > 0)
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Images (Before / After)</th>
                            <th>Case Title & Category</th>
                            <th>Doctor & Technology</th>
                            <th>Sessions & Concern</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($caseStudies as $cs)
                            <tr>
                                <td>
                                    <div style="display: flex; gap: 8px; align-items: center;">
                                        <div style="text-align: center;">
                                            <img src="{{ $cs->before_img_path }}" alt="Before" style="width: 55px; height: 55px; object-fit: cover; border-radius: 6px; border: 1px solid var(--silk-200);" onerror="this.src='/logo.png'">
                                            <div style="font-size: 0.65rem; color: var(--muted-charcoal); font-weight: 600; text-transform: uppercase;">Before</div>
                                        </div>
                                        <span style="color: var(--gold-600); font-weight: bold;">➔</span>
                                        <div style="text-align: center;">
                                            <img src="{{ $cs->after_img_path }}" alt="After" style="width: 55px; height: 55px; object-fit: cover; border-radius: 6px; border: 1px solid var(--silk-200);" onerror="this.src='/logo.png'">
                                            <div style="font-size: 0.65rem; color: var(--muted-charcoal); font-weight: 600; text-transform: uppercase;">After</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style="margin-bottom: 4px;">
                                        <span class="badge badge-{{ $cs->category }}">
                                            {{ $cs->category_label }}
                                        </span>
                                    </div>
                                    <div style="font-weight: 600; color: var(--plum-900); font-size: 0.95rem;">{{ $cs->title }}</div>
                                    <div style="font-size: 0.75rem; color: var(--muted-charcoal);">Slug: {{ $cs->id }}</div>
                                </td>
                                <td>
                                    <div style="font-weight: 500; color: var(--charcoal); font-size: 0.9rem;">{{ $cs->doctor }}</div>
                                    <div style="font-size: 0.75rem; color: var(--muted-charcoal);">Tech: {{ $cs->technology }}</div>
                                </td>
                                <td>
                                    <div style="font-size: 0.85rem; font-weight: 500; color: var(--gold-600);">{{ $cs->sessions }}</div>
                                    <div style="font-size: 0.75rem; color: var(--muted-charcoal); max-width: 220px;">{{ Str::limit($cs->concern, 50) }}</div>
                                </td>
                                <td>
                                    <span class="badge" style="background-color: {{ $cs->active ? 'rgba(0,128,0,0.1)' : 'rgba(0,0,0,0.05)' }}; color: {{ $cs->active ? 'green' : 'var(--muted-charcoal)' }};">
                                        {{ $cs->active ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; gap: 8px;">
                                        <a href="{{ route('admin.case_studies.edit', $cs->id) }}" class="btn btn-outline btn-sm">Edit</a>
                                        <form action="{{ route('admin.case_studies.delete', $cs->id) }}" method="POST" style="display: inline;" onsubmit="return confirm('Are you sure you want to remove this case study?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div style="text-align: center; padding: 40px; color: var(--muted-charcoal);">
                <p>No case studies configured. Click "Add New Case Study" to showcase patient transformations.</p>
            </div>
        @endif
    </div>
@endsection


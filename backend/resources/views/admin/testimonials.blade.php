@extends('admin.layout')

@section('title', 'Manage Testimonials')
@section('header_title', 'Patient Testimonials')

@section('content')
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Patient Reviews & Feedback</h3>
            <a href="{{ route('admin.testimonials.create') }}" class="btn btn-primary">Add New Testimonial</a>
        </div>

        @if($testimonials->count() > 0)
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Rating</th>
                            <th>Treatment / Service</th>
                            <th>Review</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($testimonials as $t)
                            <tr>
                                <td>
                                    <div style="font-weight: 600; color: var(--plum-900); font-size: 0.95rem;">{{ $t->name }}</div>
                                </td>
                                <td>
                                    <div style="color: #ffb400; font-size: 1rem; letter-spacing: 2px;">
                                        @for($i = 1; $i <= 5; $i++)
                                            {{ $i <= $t->rating ? '★' : '☆' }}
                                        @endfor
                                    </div>
                                    <span style="font-size: 0.75rem; color: var(--muted-charcoal);">{{ $t->rating }}/5 stars</span>
                                </td>
                                <td>
                                    <span class="badge" style="background-color: var(--gold-100); color: var(--gold-600); font-weight: 500;">
                                        {{ $t->treatment ?: 'General Consultation' }}
                                    </span>
                                </td>
                                <td style="max-width: 320px; font-size: 0.85rem; color: var(--charcoal); line-height: 1.4;">
                                    "{{ Str::limit($t->text, 120) }}"
                                </td>
                                <td>
                                    <span class="badge" style="background-color: {{ $t->active ? 'rgba(0,128,0,0.1)' : 'rgba(0,0,0,0.05)' }}; color: {{ $t->active ? 'green' : 'var(--muted-charcoal)' }};">
                                        {{ $t->active ? 'Active' : 'Hidden' }}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; gap: 8px;">
                                        <a href="{{ route('admin.testimonials.edit', $t->id) }}" class="btn btn-outline btn-sm">Edit</a>
                                        <form action="{{ route('admin.testimonials.delete', $t->id) }}" method="POST" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this testimonial?')">
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
                <p>No patient testimonials configured. Click "Add New Testimonial" to add patient feedback.</p>
            </div>
        @endif
    </div>
@endsection


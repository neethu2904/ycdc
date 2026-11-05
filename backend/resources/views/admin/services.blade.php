@extends('admin.layout')

@section('title', 'Manage Services')
@section('header_title', 'Services Directory')

@section('content')
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Dermatology & Cosmetology Treatments</h3>
            <a href="{{ route('admin.services.create') }}" class="btn btn-primary">Add New Treatment</a>
        </div>

        @if($services->count() > 0)
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Treatment Name</th>
                            <th>Branch</th>
                            <th>Type</th>
                            <th>Estimated Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($services as $service)
                            <tr>
                                <td>
                                    <span class="badge badge-{{ $service->category }}">
                                        {{ $service->category_name }}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        @if($service->image_path)
                                            <img src="{{ $service->image_path }}" alt="{{ $service->name }}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover; border: 1px solid var(--silk-200);">
                                        @endif
                                        <div>
                                            <div style="font-weight: 600; color: var(--plum-900);">{{ $service->name }}</div>
                                            <div style="font-size: 0.75rem; color: var(--muted-charcoal);">Key: {{ $service->id }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    @php
                                        $branch = $service->branch ?? 'trivandrum';
                                    @endphp
                                    <span class="badge" style="background-color: {{ $branch === 'bangalore' ? 'rgba(76, 175, 80, 0.1)' : ($branch === 'both' ? 'rgba(156, 39, 176, 0.1)' : 'rgba(33, 150, 243, 0.1)') }}; color: {{ $branch === 'bangalore' ? '#2e7d32' : ($branch === 'both' ? '#7b1fa2' : '#1565c0') }};">
                                        {{ ucfirst($branch) }}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge" style="background-color: {{ ($service->procedure_type ?? 'cosmetic') === 'dermatic' ? 'rgba(230, 81, 0, 0.1)' : 'rgba(0, 150, 136, 0.1)' }}; color: {{ ($service->procedure_type ?? 'cosmetic') === 'dermatic' ? '#e65100' : '#00796b' }};">
                                        {{ ucfirst($service->procedure_type ?? 'cosmetic') }}
                                    </span>
                                </td>
                                <td style="font-weight: bold; color: var(--gold-600);">{{ $service->price_range }}</td>
                                <td>
                                    <span class="badge" style="background-color: {{ $service->active ? 'rgba(0,128,0,0.1)' : 'rgba(0,0,0,0.05)' }}; color: {{ $service->active ? 'green' : 'var(--muted-charcoal)' }};">
                                        {{ $service->active ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; gap: 8px;">
                                        <a href="{{ route('admin.services.edit', $service->id) }}" class="btn btn-outline btn-sm">Edit</a>
                                        <form action="{{ route('admin.services.delete', $service->id) }}" method="POST" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this service?')">@csrf @method('DELETE')<button type="submit" class="btn btn-danger btn-sm">Delete</button></form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div style="text-align: center; padding: 40px; color: var(--muted-charcoal);">
                <p>No treatment services configured. Click "Add New Treatment" to add a clinic service.</p>
            </div>
        @endif
    </div>
@endsection

@extends('admin.layout')

@section('title', 'Manage Staff Accounts')
@section('header_title', 'Staff & User Management')

@section('content')
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Staff Members & Administrators</h3>
            <a href="{{ route('admin.users.create') }}" class="btn btn-primary">Add Staff Member</a>
        </div>

        @if($users->count() > 0)
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Staff Member</th>
                            <th>Email Address</th>
                            <th>Assigned Branch</th>
                            <th>Role & Access</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($users as $user)
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="width: 38px; height: 38px; border-radius: 50%; background-color: var(--plum-100); color: var(--plum-800); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem;">
                                            {{ substr($user->name, 0, 2) }}
                                        </div>
                                        <div>
                                            <div style="font-weight: 600; color: var(--plum-900);">{{ $user->name }}</div>
                                            @if($user->id === session('admin_user_id'))
                                                <span style="font-size: 0.7rem; color: var(--gold-600); font-weight: bold;">(Current Session)</span>
                                            @endif
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span style="font-size: 0.9rem; color: var(--charcoal);">{{ $user->email }}</span>
                                </td>
                                <td>
                                    @php
                                        $userBranch = $user->branch;
                                    @endphp
                                    @if($userBranch)
                                        <span class="badge" style="background-color: {{ $userBranch === 'bangalore' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(33, 150, 243, 0.1)' }}; color: {{ $userBranch === 'bangalore' ? '#2e7d32' : '#1565c0' }};">
                                            {{ ucfirst($userBranch) }}
                                        </span>
                                    @else
                                        <span class="badge" style="background-color: rgba(156, 39, 176, 0.1); color: #7b1fa2;">
                                            All Branches
                                        </span>
                                    @endif
                                </td>
                                <td>
                                    @foreach($user->roles as $role)
                                        <span class="badge" style="background-color: {{ $role->name === 'super-admin' ? 'var(--gold-100)' : 'rgba(0,0,0,0.06)' }}; color: {{ $role->name === 'super-admin' ? 'var(--gold-600)' : 'var(--charcoal)' }}; font-weight: 600;">
                                            {{ $role->name }}
                                        </span>
                                    @endforeach
                                </td>
                                <td style="font-size: 0.85rem; color: var(--muted-charcoal);">
                                    {{ $user->created_at ? $user->created_at->format('M d, Y') : '—' }}
                                </td>
                                <td>
                                    <div style="display: flex; gap: 8px;">
                                        <a href="{{ route('admin.users.edit', $user->id) }}" class="btn btn-outline btn-sm">Edit</a>
                                        @if($user->id !== session('admin_user_id'))
                                            <form action="{{ route('admin.users.delete', $user->id) }}" method="POST" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this staff account?')">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                                            </form>
                                        @endif
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div style="text-align: center; padding: 40px; color: var(--muted-charcoal);">
                <p>No staff accounts configured.</p>
            </div>
        @endif
    </div>
@endsection


@extends('admin.layout')

@section('title', $user ? 'Edit Staff Member' : 'Add Staff Member')
@section('header_title', $user ? 'Edit Staff Member' : 'Add Staff Member')

@section('content')
    <div class="card" style="max-width: 650px; margin: 0 auto;">
        <div class="card-header">
            <h3 class="card-title">{{ $user ? 'Modify Account: ' . $user->name : 'Create New Staff Account' }}</h3>
            <a href="{{ route('admin.users') }}" class="btn btn-outline btn-sm">Back to Staff Accounts</a>
        </div>

        <form action="{{ $user ? route('admin.users.update', $user->id) : route('admin.users.store') }}" method="POST">
            @csrf

            <div class="form-group">
                <label class="form-label" for="name">Staff Member Full Name</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="e.g. Dr. Niranjana Raj or Frontdesk Bangalore" value="{{ old('name', $user ? $user->name : '') }}" required>
                @error('name')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="email">Email Address</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="e.g. staff@ycdc.in" value="{{ old('email', $user ? $user->email : '') }}" required>
                @error('email')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label class="form-label" for="password">Password {{ $user ? '(Leave blank to keep unchanged)' : '' }}</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="{{ $user ? 'Enter new password to reset...' : 'Minimum 6 characters' }}" {{ $user ? '' : 'required' }}>
                @error('password')
                    <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label class="form-label" for="branch">Assigned Branch</label>
                    <select name="branch" id="branch" class="form-control">
                        <option value="" {{ old('branch', $user ? $user->branch : '') === null ? 'selected' : '' }}>All Branches (Super Admin / Management)</option>
                        <option value="trivandrum" {{ old('branch', $user ? $user->branch : '') === 'trivandrum' ? 'selected' : '' }}>Trivandrum (Pattom)</option>
                        <option value="bangalore" {{ old('branch', $user ? $user->branch : '') === 'bangalore' ? 'selected' : '' }}>Bangalore (Whitefield)</option>
                    </select>
                    @error('branch')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label" for="role">Role & Security Level</label>
                    <select name="role" id="role" class="form-control" required>
                        <option value="" disabled {{ !$user ? 'selected' : '' }}>Select role...</option>
                        @foreach($roles as $role)
                            <option value="{{ $role->name }}" {{ old('role', ($user && $user->roles->first()) ? $user->roles->first()->name : '') === $role->name ? 'selected' : '' }}>
                                {{ ucfirst(str_replace('-', ' ', $role->name)) }}
                            </option>
                        @endforeach
                    </select>
                    @error('role')
                        <span style="color: red; font-size: 0.8rem; margin-top: 4px; display: block;">{{ $message }}</span>
                    @enderror
                </div>
            </div>

            <div style="border-top: 1px solid var(--silk-100); padding-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="{{ route('admin.users') }}" class="btn btn-outline">Cancel</a>
                <button type="submit" class="btn btn-primary">{{ $user ? 'Save Changes' : 'Create Staff Account' }}</button>
            </div>
        </form>
    </div>
@endsection


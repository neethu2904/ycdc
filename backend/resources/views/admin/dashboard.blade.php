@extends('admin.layout')

@section('title', 'Overview')
@section('header_title', 'System Overview')

@section('content')
    <!-- Statistics Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-bottom: 40px;">
        <!-- Card 1 -->
        <div class="card" style="margin-bottom: 0; padding: 24px; display: flex; align-items: center; justify-content: space-between;">
            <div>
                <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: bold; color: var(--muted-charcoal);">Total Leads</span>
                <h3 style="font-size: 2.2rem; font-family: 'Playfair Display', serif; color: var(--plum-900); margin-top: 4px;">{{ $stats['leads_total'] }}</h3>
            </div>
            <div style="background-color: var(--plum-100); color: var(--plum-800); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                👥
            </div>
        </div>

        <!-- Card 2 -->
        <div class="card" style="margin-bottom: 0; padding: 24px; display: flex; align-items: center; justify-content: space-between;">
            <div>
                <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: bold; color: var(--muted-charcoal);">Pending Review</span>
                <h3 style="font-size: 2.2rem; font-family: 'Playfair Display', serif; color: orange; margin-top: 4px;">{{ $stats['leads_pending'] }}</h3>
            </div>
            <div style="background-color: rgba(255, 165, 0, 0.1); color: orange; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                ⏳
            </div>
        </div>

        <!-- Card 3 -->
        <div class="card" style="margin-bottom: 0; padding: 24px; display: flex; align-items: center; justify-content: space-between;">
            <div>
                <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: bold; color: var(--muted-charcoal);">Clinicians</span>
                <h3 style="font-size: 2.2rem; font-family: 'Playfair Display', serif; color: var(--gold-600); margin-top: 4px;">{{ $stats['doctors'] }}</h3>
            </div>
            <div style="background-color: var(--gold-100); color: var(--gold-600); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                🩺
            </div>
        </div>

        <!-- Card 4 -->
        <div class="card" style="margin-bottom: 0; padding: 24px; display: flex; align-items: center; justify-content: space-between;">
            <div>
                <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: bold; color: var(--muted-charcoal);">Treatments</span>
                <h3 style="font-size: 2.2rem; font-family: 'Playfair Display', serif; color: #2eaf64; margin-top: 4px;">{{ $stats['services'] }}</h3>
            </div>
            <div style="background-color: rgba(46, 175, 100, 0.1); color: #1f7a45; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                💆
            </div>
        </div>
    </div>

    <!-- Quick Navigation Panel -->
    <div class="card" style="padding: 24px; margin-bottom: 40px; background-color: var(--plum-900); background: linear-gradient(135deg, var(--plum-900) 0%, var(--plum-800) 100%); border: none; color: white;">
        <div style="max-width: 600px;">
            <span style="color: var(--gold-500); font-size: 0.8rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">Quick Actions</span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 8px 0 12px; color: white;">YCDC Clinic Administration</h2>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">
                Use the sidebar or the quick links below to manage active medical staff, chemical resurfacing and laser services, gallery portfolios, clinical publications, or to process patient inquiries.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <a href="{{ route('admin.leads') }}" class="btn btn-gold">Manage Leads CRM</a>
                <a href="{{ route('admin.doctors.create') }}" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.25);">Add New Doctor</a>
                <a href="{{ route('admin.blog.create') }}" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.25);">Write Blog Post</a>
            </div>
        </div>
    </div>

    <!-- Recent Leads Section -->
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Recent Patient Inquiries</h3>
            <a href="{{ route('admin.leads') }}" class="btn btn-primary btn-sm">View All Leads</a>
        </div>

        @if($recentLeads->count() > 0)
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Received At</th>
                            <th>Patient Details</th>
                            <th>Type</th>
                            <th>Requested Service / Concern</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($recentLeads as $lead)
                            <tr>
                                <td>
                                    <div style="font-weight: 500;">{{ $lead->created_at->format('M d, Y') }}</div>
                                    <div style="font-size: 0.75rem; color: var(--muted-charcoal);">{{ $lead->created_at->format('h:i A') }}</div>
                                </td>
                                <td>
                                    <div style="font-weight: 600; color: var(--plum-900);">{{ $lead->patient_name }}</div>
                                    <div style="font-size: 0.8rem; color: var(--muted-charcoal);">+91 {{ $lead->patient_phone }}</div>
                                </td>
                                <td>
                                    <span class="badge" style="background-color: var(--silk-200); color: var(--charcoal);">{{ $lead->type }}</span>
                                </td>
                                <td>
                                    @if($lead->type === 'Appointment')
                                        <div style="font-weight: 500; color: var(--plum-800);">{{ $lead->service_requested }}</div>
                                        <div style="font-size: 0.75rem; color: var(--gold-600);">{{ $lead->doctor_requested }}</div>
                                    @else
                                        <div style="font-weight: 500; color: var(--gold-600);">{{ $lead->concern_type }}</div>
                                    @endif
                                </td>
                                <td>
                                    <span class="badge badge-{{ strtolower($lead->status) }}">{{ $lead->status }}</span>
                                </td>
                                <td>
                                    <a href="{{ route('admin.leads.view', $lead->id) }}" class="btn btn-outline btn-sm">Open CRM</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div style="text-align: center; padding: 40px; color: var(--muted-charcoal);">
                <p>No leads found in the database. Inquiries submitted via the React app will appear here.</p>
            </div>
        @endif
    </div>
@endsection

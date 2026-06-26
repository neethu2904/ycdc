<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\Service;
use App\Models\GalleryItem;
use App\Models\BlogPost;
use App\Models\Lead;
use App\Models\SeoConfig;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function getDoctors()
    {
        return response()->json(Doctor::where('active', true)->get());
    }

    public function getServices()
    {
        return response()->json(Service::where('active', true)->get());
    }

    public function getGallery()
    {
        return response()->json(GalleryItem::all());
    }

    public function getBlogs()
    {
        return response()->json(BlogPost::all());
    }

    public function getSeo()
    {
        // Return key-value pair of route_name -> seo settings
        return response()->json(SeoConfig::all()->keyBy('route_name'));
    }

    public function createLead(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'required|string|max:20',
            'branch' => 'required|string|max:255',
            'type' => 'required|string|in:Appointment,Online Consultation,Contact',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle uploaded photo if any
        $photoName = null;
        if ($request->hasFile('photo_attached')) {
            $file = $request->file('photo_attached');
            $photoName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/leads'), $photoName);
        } elseif ($request->input('photo_attached')) {
            // In case a mockup file name is sent
            $photoName = $request->input('photo_attached');
        }

        $lead = Lead::create([
            'patient_name' => $request->input('patient_name'),
            'patient_phone' => $request->input('patient_phone'),
            'patient_email' => $request->input('patient_email'),
            'branch' => $request->input('branch'),
            'type' => $request->input('type'),
            'service_requested' => $request->input('service_requested'),
            'doctor_requested' => $request->input('doctor_requested'),
            'preferred_date' => $request->input('preferred_date'),
            'preferred_time' => $request->input('preferred_time'),
            'concern_type' => $request->input('concern_type'),
            'medical_history' => $request->input('medical_history'),
            'photo_attached' => $photoName,
            'status' => 'Pending',
            'notes' => $request->input('notes'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your inquiry has been submitted successfully!',
            'lead' => $lead
        ], 201);
    }

    public function getLeads()
    {
        return response()->json(Lead::orderBy('created_at', 'desc')->get());
    }

    public function updateLeadStatus(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);
        $lead->status = $request->input('status');
        $lead->save();

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'lead' => $lead
        ]);
    }

    public function deleteLead($id)
    {
        $lead = Lead::findOrFail($id);
        $lead->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lead deleted successfully'
        ]);
    }

    public function resetLeads()
    {
        Lead::truncate();

        $leads = [
            [
                'branch' => 'Whitefield, Bangalore',
                'patient_name' => 'Ramesh Kumar',
                'patient_phone' => '9845012345',
                'patient_email' => 'ramesh.k@gmail.com',
                'service_requested' => 'PRP Hair Growth Therapy',
                'doctor_requested' => 'Dr. Vennela Reddy',
                'preferred_date' => '2026-06-25',
                'preferred_time' => '11:00 AM',
                'concern_type' => 'Hair & Scalp',
                'medical_history' => 'Experiencing severe hair thinning on the crown for the past 6 months.',
                'photo_attached' => null,
                'status' => 'Confirmed',
                'type' => 'Appointment',
                'notes' => 'Confirmed slot, patient notified.'
            ],
            [
                'branch' => 'Pattom, Trivandrum',
                'patient_name' => 'Ananya Pillai',
                'patient_phone' => '9447012345',
                'patient_email' => 'ananya.p@yahoo.com',
                'service_requested' => 'Premium Chemical Peels',
                'doctor_requested' => 'Dr. Maya Vincent',
                'preferred_date' => '2026-06-26',
                'preferred_time' => '02:45 PM',
                'concern_type' => 'Skin Care',
                'medical_history' => 'Looking to treat post-acne pigmentation and uneven skin tone.',
                'photo_attached' => null,
                'status' => 'Contacted',
                'type' => 'Appointment',
                'notes' => 'Called, left voicemail. Scheduled follow-up email.'
            ],
            [
                'branch' => 'Whitefield, Bangalore',
                'patient_name' => 'Rohit Sharma',
                'patient_phone' => '9900012345',
                'patient_email' => 'rohit.s@gmail.com',
                'service_requested' => null,
                'doctor_requested' => null,
                'preferred_date' => null,
                'preferred_time' => null,
                'concern_type' => 'Acne, Pimples & Scars',
                'medical_history' => 'Frequent cystic acne breakouts on cheeks and jawline. No previous clinical treatments.',
                'photo_attached' => 'jawline_acne_left.jpg',
                'status' => 'Pending',
                'type' => 'Online Consultation',
                'notes' => null
            ],
            [
                'branch' => 'Pattom, Trivandrum',
                'patient_name' => 'Meera Nair',
                'patient_phone' => '9496054321',
                'patient_email' => 'meera.nair@hotmail.com',
                'service_requested' => null,
                'doctor_requested' => null,
                'preferred_date' => null,
                'preferred_time' => null,
                'concern_type' => 'Fine Lines, Wrinkles & Anti-Aging',
                'medical_history' => 'Interested in non-surgical anti-aging solutions. Noticeable fine lines around eyes.',
                'photo_attached' => 'forehead_wrinkles.jpg',
                'status' => 'Contacted',
                'type' => 'Online Consultation',
                'notes' => 'Discussed Botox vs Hydrafacial.'
            ]
        ];

        foreach ($leads as $l) {
            Lead::create($l);
        }

        return response()->json([
            'success' => true,
            'message' => 'Leads database reset successfully',
            'leads' => Lead::orderBy('created_at', 'desc')->get()
        ]);
    }
}


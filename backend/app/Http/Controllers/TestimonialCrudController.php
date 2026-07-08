<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Validator;

class TestimonialCrudController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'text' => 'required|string',
            'treatment' => 'nullable|string|max:255',
            'active' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $active = filter_var($request->input('active', true), FILTER_VALIDATE_BOOLEAN);

        $testimonial = Testimonial::create([
            'name' => $request->name,
            'rating' => $request->rating,
            'text' => $request->text,
            'treatment' => $request->treatment,
            'active' => $active
        ]);

        return response()->json(['success' => true, 'data' => $testimonial]);
    }

    public function show($id)
    {
        return response()->json(Testimonial::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'text' => 'required|string',
            'treatment' => 'nullable|string|max:255',
            'active' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $active = filter_var($request->input('active', $testimonial->active), FILTER_VALIDATE_BOOLEAN);

        $testimonial->update([
            'name' => $request->name,
            'rating' => $request->rating,
            'text' => $request->text,
            'treatment' => $request->treatment,
            'active' => $active
        ]);

        return response()->json(['success' => true, 'data' => $testimonial]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();
        return response()->json(['success' => true]);
    }
}

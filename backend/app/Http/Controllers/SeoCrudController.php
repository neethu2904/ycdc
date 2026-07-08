<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SeoConfig;
use Illuminate\Support\Facades\Validator;

class SeoCrudController extends Controller
{
    public function index()
    {
        return response()->json(SeoConfig::all());
    }

    public function show($id)
    {
        return response()->json(SeoConfig::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $config = SeoConfig::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'meta_description' => 'required|string',
            'keywords' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $config->update([
            'title' => $request->title,
            'meta_description' => $request->meta_description,
            'keywords' => $request->keywords,
        ]);

        return response()->json(['success' => true, 'data' => $config]);
    }
}

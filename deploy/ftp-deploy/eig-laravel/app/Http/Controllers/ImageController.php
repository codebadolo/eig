<?php
namespace App\Http\Controllers;
use App\Models\SiteImage;
use Illuminate\Http\Request;

class ImageController extends Controller {
    public function index(Request $request) {
        $q = SiteImage::orderBy('section')->orderBy('ordre');
        if ($request->section) $q->where('section', $request->section);
        if ($request->has('actif')) $q->where('actif', $request->actif === 'true');
        return response()->json($q->get());
    }

    public function store(Request $request) {
        $img = SiteImage::create($request->all());
        return response()->json($img, 201);
    }

    public function update(Request $request, $id) {
        $img = SiteImage::findOrFail($id);
        $img->update($request->all());
        return response()->json($img);
    }

    public function destroy($id) {
        SiteImage::findOrFail($id)->delete();
        return response()->json(['message' => 'Image supprimée']);
    }
}

<?php
namespace App\Http\Controllers;
use App\Models\Carriere;
use Illuminate\Http\Request;

class CarriereController extends Controller {
    public function index(Request $request) {
        $q = Carriere::orderBy('created_at', 'desc');
        if ($request->has('actif')) $q->where('actif', $request->actif === 'true');
        return response()->json($q->get());
    }

    public function show($id) {
        $c = Carriere::find($id);
        if (!$c) return response()->json(['error' => 'Offre non trouvée'], 404);
        return response()->json($c);
    }

    public function store(Request $request) {
        $c = Carriere::create($request->all());
        return response()->json($c, 201);
    }

    public function update(Request $request, $id) {
        $c = Carriere::findOrFail($id);
        $c->update($request->all());
        return response()->json($c);
    }

    public function destroy($id) {
        Carriere::findOrFail($id)->delete();
        return response()->json(['message' => 'Offre supprimée']);
    }
}

<?php
namespace App\Http\Controllers;
use App\Models\Filiale;
use Illuminate\Http\Request;

class FilialeController extends Controller {
    public function index(Request $request) {
        $q = Filiale::orderBy('ordre');
        if ($request->secteur) $q->where('secteur', $request->secteur);
        if ($request->pays) $q->where('pays', $request->pays);
        if ($request->has('actif')) $q->where('actif', $request->actif === 'true');
        return response()->json($q->get());
    }

    public function show($id) {
        $f = Filiale::find($id);
        if (!$f) return response()->json(['error' => 'Filiale non trouvée'], 404);
        return response()->json($f);
    }

    public function store(Request $request) {
        $f = Filiale::create($request->all());
        return response()->json($f, 201);
    }

    public function update(Request $request, $id) {
        $f = Filiale::findOrFail($id);
        $f->update($request->all());
        return response()->json($f);
    }

    public function destroy($id) {
        Filiale::findOrFail($id)->delete();
        return response()->json(['message' => 'Filiale supprimée']);
    }
}

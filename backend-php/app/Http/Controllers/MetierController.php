<?php
namespace App\Http\Controllers;
use App\Models\Metier;
use Illuminate\Http\Request;

class MetierController extends Controller {
    public function index() {
        return response()->json(Metier::orderBy('ordre')->get());
    }

    public function show($slug) {
        $m = Metier::where('slug', $slug)->orWhere('id', $slug)->first();
        if (!$m) return response()->json(['error' => 'Métier non trouvé'], 404);
        return response()->json($m);
    }

    public function store(Request $request) {
        $data = $request->all();
        if (isset($data['filialesIds'])) { $data['filiales_ids'] = json_encode($data['filialesIds']); unset($data['filialesIds']); }
        $m = Metier::create($data);
        return response()->json($m, 201);
    }

    public function update(Request $request, $id) {
        $m = Metier::findOrFail($id);
        $data = $request->all();
        if (isset($data['filialesIds'])) { $data['filiales_ids'] = json_encode($data['filialesIds']); unset($data['filialesIds']); }
        $m->update($data);
        return response()->json($m);
    }

    public function destroy($id) {
        Metier::findOrFail($id)->delete();
        return response()->json(['message' => 'Métier supprimé']);
    }
}

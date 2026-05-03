<?php
namespace App\Http\Controllers;
use App\Models\Dirigeant;
use Illuminate\Http\Request;

class DirigeantController extends Controller {
    public function index() {
        return response()->json(Dirigeant::orderBy('ordre')->get());
    }

    public function show($id) {
        $d = Dirigeant::find($id);
        if (!$d) return response()->json(['error' => 'Dirigeant non trouvé'], 404);
        return response()->json($d);
    }

    public function store(Request $request) {
        $d = Dirigeant::create($request->all());
        return response()->json($d, 201);
    }

    public function update(Request $request, $id) {
        $d = Dirigeant::findOrFail($id);
        $d->update($request->all());
        return response()->json($d);
    }

    public function destroy($id) {
        Dirigeant::findOrFail($id)->delete();
        return response()->json(['message' => 'Dirigeant supprimé']);
    }
}

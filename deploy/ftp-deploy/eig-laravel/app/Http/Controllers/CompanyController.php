<?php
namespace App\Http\Controllers;
use App\Models\CompanyInfo;
use Illuminate\Http\Request;

class CompanyController extends Controller {
    public function show() {
        $r = CompanyInfo::find('main');
        if (!$r) return response()->json(['error' => 'Données non trouvées'], 404);
        return response()->json($r->data);
    }

    public function update(Request $request) {
        $r = CompanyInfo::firstOrCreate(['id' => 'main'], ['data' => []]);
        $existing = is_array($r->data) ? $r->data : [];
        $merged = array_merge($existing, $request->all());
        $r->update(['data' => $merged]);
        return response()->json($r->data);
    }
}

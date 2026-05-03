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
        $r = CompanyInfo::updateOrCreate(['id' => 'main'], ['data' => $request->all()]);
        return response()->json($r->data);
    }
}

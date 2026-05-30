<?php
namespace App\Http\Controllers;
use App\Models\CompanyInfo;
use Illuminate\Http\Request;

class TranslationController extends Controller {
    public function show() {
        $r = CompanyInfo::find('translations');
        if (!$r) return response()->json(null);
        return response()->json($r->data);
    }

    public function update(Request $request) {
        $r = CompanyInfo::updateOrCreate(
            ['id' => 'translations'],
            ['data' => $request->all()]
        );
        return response()->json($r->data);
    }
}

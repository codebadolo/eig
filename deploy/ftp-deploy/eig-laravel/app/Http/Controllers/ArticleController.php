<?php
namespace App\Http\Controllers;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller {
    public function index(Request $request) {
        $q = Article::orderBy('created_at', 'desc');
        if ($request->categorie) $q->where('categorie', $request->categorie);
        if ($request->has('publie')) $q->where('publie', $request->publie === 'true');
        if ($request->has('featured')) $q->where('featured', $request->featured === 'true');
        return response()->json($q->get());
    }

    public function show($slug) {
        $a = Article::where('slug', $slug)->orWhere('id', $slug)->first();
        if (!$a) return response()->json(['error' => 'Article non trouvé'], 404);
        return response()->json($a);
    }

    public function store(Request $request) {
        $a = Article::create($request->all());
        return response()->json($a, 201);
    }

    public function update(Request $request, $id) {
        $a = Article::findOrFail($id);
        $a->update($request->all());
        return response()->json($a);
    }

    public function destroy($id) {
        Article::findOrFail($id)->delete();
        return response()->json(['message' => 'Article supprimé']);
    }
}

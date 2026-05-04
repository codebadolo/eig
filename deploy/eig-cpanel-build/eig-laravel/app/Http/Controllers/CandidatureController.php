<?php
namespace App\Http\Controllers;

use App\Models\Candidature;
use App\Models\Carriere;
use Illuminate\Http\Request;

class CandidatureController extends Controller {

    private function cvDir(): string {
        $base = env('UPLOAD_DIR', public_path('uploads'));
        $dir = $base . '/cvs';
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        return $dir;
    }

    public function store(Request $request) {
        $request->validate([
            'nom'         => 'required|string|max:100',
            'prenom'      => 'required|string|max:100',
            'email'       => 'required|email',
            'telephone'   => 'nullable|string|max:30',
            'lettre'      => 'nullable|string|max:5000',
            'cv'          => 'nullable|file|max:5120|mimetypes:application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/octet-stream',
            'carriere_id' => 'nullable|string',
        ]);

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $file = $request->file('cv');
            $filename = time() . '-' . rand(100000, 999999) . '.' . $file->getClientOriginalExtension();
            $file->move($this->cvDir(), $filename);
            $cvPath = '/uploads/cvs/' . $filename;
        }

        $carriereId    = $request->input('carriere_id');
        $carriereTitre = null;
        if ($carriereId) {
            $carriere = Carriere::find($carriereId);
            $carriereTitre = $carriere?->titre;
        }

        $candidature = Candidature::create([
            'nom'            => $request->nom,
            'prenom'         => $request->prenom,
            'email'          => $request->email,
            'telephone'      => $request->telephone,
            'lettre'         => $request->lettre,
            'cv_path'        => $cvPath,
            'carriere_id'    => $carriereId,
            'carriere_titre' => $carriereTitre,
            'statut'         => 'recue',
        ]);

        return response()->json(['message' => 'Candidature envoyée', 'id' => $candidature->id], 201);
    }

    public function index(Request $request) {
        $q = Candidature::orderBy('created_at', 'desc');
        if ($request->has('statut'))     $q->where('statut', $request->statut);
        if ($request->has('carriere_id')) $q->where('carriere_id', $request->carriere_id);
        return response()->json($q->get());
    }

    public function show($id) {
        $c = Candidature::find($id);
        if (!$c) return response()->json(['error' => 'Candidature introuvable'], 404);
        return response()->json($c);
    }

    public function update(Request $request, $id) {
        $c = Candidature::findOrFail($id);
        $request->validate(['statut' => 'required|in:recue,en_cours,acceptee,refusee']);
        $c->update(['statut' => $request->statut]);
        return response()->json($c);
    }

    public function destroy($id) {
        $c = Candidature::findOrFail($id);
        if ($c->cv_path) {
            $base = env('UPLOAD_DIR', public_path('uploads'));
            $full = $base . '/cvs/' . basename($c->cv_path);
            if (file_exists($full)) unlink($full);
        }
        $c->delete();
        return response()->json(['message' => 'Candidature supprimée']);
    }
}

<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class UploadController extends Controller {
    private function uploadDir(): string {
        // Priorité 1 : UPLOAD_DIR explicite dans .env
        if ($dir = env('UPLOAD_DIR')) {
            if (!is_dir($dir)) mkdir($dir, 0755, true);
            return $dir;
        }

        // Priorité 2 : calculé depuis l'emplacement du script d'entrée
        // api/index.php est toujours au même niveau que le dossier uploads/
        // ex : public_html/excellis-invest-group/api/  →  ../uploads/
        $script = $_SERVER['SCRIPT_FILENAME'] ?? '';
        if ($script && is_file($script)) {
            $dir = dirname(realpath(dirname($script))) . '/uploads';
            if (!is_dir($dir)) mkdir($dir, 0755, true);
            return $dir;
        }

        // Priorité 3 : fallback Laravel standard
        $dir = public_path('uploads');
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        return $dir;
    }

    public function store(Request $request) {
        $request->validate([
            'file' => 'required|file|max:102400|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm,video/quicktime,application/octet-stream',
        ]);

        $file     = $request->file('file');
        $ext      = strtolower($file->getClientOriginalExtension());
        $filename = time() . '-' . rand(100000, 999999) . '.' . $ext;

        $dir = $this->uploadDir();
        try {
            $file->move($dir, $filename);
            // Garantir que le fichier est lisible par Apache
            @chmod($dir . '/' . $filename, 0644);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Impossible d\'écrire le fichier : ' . $e->getMessage()], 500);
        }

        return response()->json(['url' => '/uploads/' . $filename, 'filename' => $filename]);
    }

    public function destroy($filename) {
        $path = $this->uploadDir() . '/' . $filename;
        if (!file_exists($path))
            return response()->json(['error' => 'Fichier non trouvé'], 404);
        unlink($path);
        return response()->json(['message' => 'Fichier supprimé']);
    }
}

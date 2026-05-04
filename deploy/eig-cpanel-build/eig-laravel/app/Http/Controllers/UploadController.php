<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class UploadController extends Controller {
    private function uploadDir(): string {
        $dir = env('UPLOAD_DIR', public_path('uploads'));
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        return $dir;
    }

    public function store(Request $request) {
        $request->validate(['file' => 'required|file|max:102400|mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm,video/quicktime,application/octet-stream']);
        $file = $request->file('file');
        $filename = time() . '-' . rand(100000, 999999) . '.' . $file->getClientOriginalExtension();
        $file->move($this->uploadDir(), $filename);
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

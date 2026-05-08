<?php
namespace App\Http\Controllers;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller {
    public function store(Request $request) {
        $request->validate(['nom' => 'required', 'email' => 'required|email', 'sujet' => 'required', 'message' => 'required']);
        $msg = ContactMessage::create($request->only('nom','email','telephone','sujet','message'));
        return response()->json(['message' => 'Message envoyé', 'id' => $msg->id], 201);
    }

    public function index(Request $request) {
        $q = ContactMessage::orderBy('created_at', 'desc');
        if ($request->has('lu')) $q->where('lu', $request->lu === 'true');
        if ($request->has('traite')) $q->where('traite', $request->traite === 'true');
        return response()->json($q->get());
    }

    public function markRead($id) {
        $msg = ContactMessage::findOrFail($id);
        $msg->update(['lu' => true]);
        return response()->json($msg);
    }

    public function markTraite($id) {
        $msg = ContactMessage::findOrFail($id);
        $msg->update(['traite' => !$msg->traite, 'lu' => true]);
        return response()->json($msg);
    }

    public function saveNote(Request $request, $id) {
        $msg = ContactMessage::findOrFail($id);
        $msg->update(['note' => $request->note]);
        return response()->json($msg);
    }

    public function destroy($id) {
        ContactMessage::findOrFail($id)->delete();
        return response()->json(['message' => 'Message supprimé']);
    }
}

<?php
namespace App\Http\Controllers;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller {
    public function index() {
        return AdminUser::select('id', 'email', 'nom', 'created_at')->get();
    }

    public function store(Request $request) {
        $request->validate([
            'email' => 'required|email|unique:admin_users,email',
            'nom' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);
        $user = AdminUser::create([
            'email' => $request->email,
            'nom' => $request->nom,
            'password' => Hash::make($request->password),
        ]);
        return response()->json(['id' => $user->id, 'email' => $user->email, 'nom' => $user->nom], 201);
    }

    public function update(Request $request, $id) {
        $user = AdminUser::findOrFail($id);
        $request->validate([
            'email' => 'sometimes|email|unique:admin_users,email,' . $id,
            'nom' => 'sometimes|string|max:255',
            'password' => 'sometimes|string|min:8',
        ]);
        $data = $request->only(['email', 'nom']);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }
        $user->update($data);
        return response()->json(['id' => $user->id, 'email' => $user->email, 'nom' => $user->nom]);
    }

    public function destroy(Request $request, $id) {
        if ($request->user()->id === $id) {
            return response()->json(['error' => 'Vous ne pouvez pas supprimer votre propre compte'], 422);
        }
        AdminUser::findOrFail($id)->delete();
        return response()->json(['message' => 'Compte supprimé']);
    }
}

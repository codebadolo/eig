<?php
namespace App\Http\Controllers;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {
    public function login(Request $request) {
        $request->validate(['email' => 'required|email', 'password' => 'required']);
        $user = AdminUser::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password))
            return response()->json(['error' => 'Identifiants incorrects'], 401);
        $token = JWTAuth::fromUser($user);
        return response()->json(['token' => $token, 'user' => ['id' => $user->id, 'email' => $user->email, 'nom' => $user->nom]]);
    }

    public function me(Request $request) {
        $user = $request->user();
        return response()->json(['id' => $user->id, 'email' => $user->email, 'nom' => $user->nom, 'createdAt' => $user->created_at]);
    }

    public function password(Request $request) {
        $request->validate(['currentPassword' => 'required', 'newPassword' => 'required|min:6']);
        $user = $request->user();
        if (!Hash::check($request->currentPassword, $user->password))
            return response()->json(['error' => 'Mot de passe actuel incorrect'], 400);
        $user->update(['password' => Hash::make($request->newPassword)]);
        return response()->json(['message' => 'Mot de passe mis à jour']);
    }
}

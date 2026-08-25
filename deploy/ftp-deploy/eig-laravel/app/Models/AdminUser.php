<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class AdminUser extends Authenticatable implements JWTSubject {
    protected $table = 'admin_users';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'email', 'password', 'nom'];
    protected $hidden = ['password'];

    protected static function boot() {
        parent::boot();
        static::creating(fn($m) => $m->id = $m->id ?: Str::random(25));
    }

    public function getJWTIdentifier() { return $this->getKey(); }
    public function getJWTCustomClaims() { return ['email' => $this->email, 'nom' => $this->nom]; }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Candidature extends Model {
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'id', 'carriere_id', 'carriere_titre',
        'nom', 'prenom', 'email', 'telephone',
        'lettre', 'cv_path', 'statut',
    ];

    protected static function boot() {
        parent::boot();
        static::creating(fn($m) => $m->id = $m->id ?: Str::random(25));
    }

    public function carriere() {
        return $this->belongsTo(Carriere::class);
    }
}

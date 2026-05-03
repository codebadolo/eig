<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Carriere extends Model {
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id','titre','departement','lieu','type','description','missions','profil','avantages','salaire','date_expiration','actif'];
    protected $casts = ['actif' => 'boolean'];

    protected static function boot() {
        parent::boot();
        static::creating(fn($m) => $m->id = $m->id ?: Str::random(25));
    }

    public function toArray() {
        $arr = parent::toArray();
        $arr['dateExpiration'] = $arr['date_expiration'] ?? null;
        unset($arr['date_expiration']);
        return $arr;
    }
}

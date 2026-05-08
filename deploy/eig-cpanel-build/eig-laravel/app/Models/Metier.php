<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Metier extends Model {
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id','slug','titre','titre_en','icone','couleur','image','description','description_en','enjeux','enjeux_en','contribution','contribution_en','filiales_ids','ordre','actif'];
    protected $casts = ['actif' => 'boolean', 'ordre' => 'integer'];

    protected static function boot() {
        parent::boot();
        static::creating(fn($m) => $m->id = $m->id ?: Str::random(25));
    }

    public function toArray() {
        $arr = parent::toArray();
        $arr['filialesIds'] = json_decode($arr['filiales_ids'] ?? '[]', true) ?: [];
        unset($arr['filiales_ids']);
        return $arr;
    }

    public function setFilialesIdsAttribute($value) {
        $this->attributes['filiales_ids'] = is_array($value) ? json_encode($value) : $value;
    }
}

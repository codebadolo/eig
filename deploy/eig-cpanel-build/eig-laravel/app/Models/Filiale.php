<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Filiale extends Model {
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id','sigle','nom','secteur','secteur_slug','pays','description','description_en','logo','ordre','actif'];
    protected $casts = ['actif' => 'boolean', 'ordre' => 'integer'];

    public function toArray() {
        $arr = parent::toArray();
        // rename secteur_slug → secteurSlug for frontend compatibility
        $arr['secteurSlug'] = $arr['secteur_slug'] ?? null;
        unset($arr['secteur_slug']);
        return $arr;
    }
}

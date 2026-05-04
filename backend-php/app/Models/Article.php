<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model {
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id','slug','titre','titre_en','categorie','date','extrait','extrait_en','contenu','contenu_en','couleur','featured','image','publie'];
    protected $casts = ['featured' => 'boolean', 'publie' => 'boolean'];

    protected static function boot() {
        parent::boot();
        static::creating(fn($m) => $m->id = $m->id ?: Str::random(25));
    }
}

<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SiteImage extends Model {
    protected $table = 'site_images';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id','section','url','titre','alt','ordre','actif'];
    protected $casts = ['actif' => 'boolean', 'ordre' => 'integer'];

    protected static function boot() {
        parent::boot();
        static::creating(fn($m) => $m->id = $m->id ?: Str::random(25));
    }
}

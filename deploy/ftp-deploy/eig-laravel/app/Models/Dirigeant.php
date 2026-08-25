<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Dirigeant extends Model {
    public $incrementing = false;
    public $timestamps = false;
    protected $keyType = 'string';
    protected $fillable = ['id','nom','role','role_en','bio','bio_en','mot','mot_en','expertise','responsabilites','formation','experiences','linkedin','photo','ordre','actif','categorie'];
    protected $casts = ['actif' => 'boolean', 'ordre' => 'integer'];
}

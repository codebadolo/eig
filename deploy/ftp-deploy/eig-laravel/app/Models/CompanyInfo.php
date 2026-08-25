<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class CompanyInfo extends Model {
    protected $table = 'company_infos';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'data'];
    protected $casts = ['data' => 'array'];
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsletterSubscriber extends Model {
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'email', 'locale', 'unsubscribe_token'];

    protected static function boot() {
        parent::boot();
        static::creating(function ($m) {
            $m->id = $m->id ?: Str::random(25);
            $m->unsubscribe_token = $m->unsubscribe_token ?: Str::random(40);
        });
    }
}

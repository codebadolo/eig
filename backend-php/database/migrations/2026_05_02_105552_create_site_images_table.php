<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        if (!Schema::hasTable('site_images')) {
        Schema::create('site_images', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('section');
            $table->string('url');
            $table->string('titre')->default('');
            $table->string('alt')->default('');
            $table->integer('ordre')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
            $table->index('section');
        });
        }
    }
    public function down(): void { Schema::dropIfExists('site_images'); }
};

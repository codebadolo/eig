<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        if (!Schema::hasTable('articles')) {
        Schema::create('articles', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('slug')->unique();
            $table->string('titre');
            $table->string('categorie');
            $table->string('date');
            $table->text('extrait');
            $table->longText('contenu');
            $table->string('couleur');
            $table->boolean('featured')->default(false);
            $table->string('image')->nullable();
            $table->boolean('publie')->default(true);
            $table->timestamps();
        });
        }
    }
    public function down(): void { Schema::dropIfExists('articles'); }
};

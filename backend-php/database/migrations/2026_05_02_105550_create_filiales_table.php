<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('filiales', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('sigle');
            $table->string('nom');
            $table->string('secteur');
            $table->string('secteur_slug');
            $table->string('pays');
            $table->text('description');
            $table->string('logo')->nullable();
            $table->integer('ordre')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('filiales'); }
};

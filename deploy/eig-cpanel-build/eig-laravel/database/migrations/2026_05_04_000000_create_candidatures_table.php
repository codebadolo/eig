<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('candidatures', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('carriere_id')->nullable();
            $table->string('carriere_titre')->nullable();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email');
            $table->string('telephone')->nullable();
            $table->text('lettre')->nullable();
            $table->string('cv_path')->nullable();
            $table->string('statut')->default('recue'); // recue, en_cours, acceptee, refusee
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('candidatures');
    }
};

<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        if (!Schema::hasTable('carrieres')) {
        Schema::create('carrieres', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('titre');
            $table->string('departement');
            $table->string('lieu');
            $table->string('type');
            $table->text('description');
            $table->text('missions')->nullable();
            $table->text('profil')->nullable();
            $table->text('avantages')->nullable();
            $table->string('salaire')->nullable();
            $table->string('date_expiration')->nullable();
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
        }
    }
    public function down(): void { Schema::dropIfExists('carrieres'); }
};

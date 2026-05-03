<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('dirigeants', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('nom');
            $table->string('role');
            $table->text('bio');
            $table->text('expertise')->nullable();
            $table->text('formation')->nullable();
            $table->text('experiences')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('photo')->nullable();
            $table->integer('ordre')->default(0);
            $table->boolean('actif')->default(true);
        });
    }
    public function down(): void { Schema::dropIfExists('dirigeants'); }
};

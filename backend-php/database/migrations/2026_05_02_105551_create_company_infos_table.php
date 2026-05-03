<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('company_infos', function (Blueprint $table) {
            $table->string('id')->primary()->default('main');
            $table->json('data');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('company_infos'); }
};

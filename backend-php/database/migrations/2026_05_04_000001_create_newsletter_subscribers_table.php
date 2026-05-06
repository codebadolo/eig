<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        if (!Schema::hasTable('newsletter_subscribers')) {
        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('email')->unique();
            $table->string('locale', 2)->default('fr');
            $table->string('unsubscribe_token')->unique();
            $table->timestamps();
        });
        }
    }

    public function down(): void {
        Schema::dropIfExists('newsletter_subscribers');
    }
};

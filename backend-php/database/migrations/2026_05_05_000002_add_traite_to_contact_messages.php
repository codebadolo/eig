<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->boolean('traite')->default(false)->after('lu');
            $table->text('note')->nullable()->after('traite');
        });
    }
    public function down(): void {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropColumn(['traite', 'note']);
        });
    }
};

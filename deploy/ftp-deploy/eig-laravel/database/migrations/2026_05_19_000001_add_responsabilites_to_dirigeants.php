<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('dirigeants', function (Blueprint $table) {
            if (!Schema::hasColumn('dirigeants', 'responsabilites'))
                $table->json('responsabilites')->nullable()->after('categorie');
        });
    }

    public function down(): void {
        Schema::table('dirigeants', function (Blueprint $table) {
            if (Schema::hasColumn('dirigeants', 'responsabilites'))
                $table->dropColumn('responsabilites');
        });
    }
};

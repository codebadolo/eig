<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('filiales', function (Blueprint $table) {
            if (!Schema::hasColumn('filiales', 'vision')) {
                $table->text('vision')->nullable()->after('mission_en');
            }
            if (!Schema::hasColumn('filiales', 'valeurs')) {
                $table->text('valeurs')->nullable()->after('vision');
            }
            if (!Schema::hasColumn('filiales', 'commentaires')) {
                $table->longText('commentaires')->nullable()->after('valeurs');
            }
        });
    }

    public function down(): void
    {
        Schema::table('filiales', function (Blueprint $table) {
            $table->dropColumn(['vision', 'valeurs', 'commentaires']);
        });
    }
};

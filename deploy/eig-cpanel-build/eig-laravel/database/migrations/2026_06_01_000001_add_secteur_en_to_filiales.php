<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('filiales', function (Blueprint $table) {
            if (!Schema::hasColumn('filiales', 'secteur_en'))
                $table->string('secteur_en')->nullable()->after('secteur');
        });
    }

    public function down(): void {
        Schema::table('filiales', function (Blueprint $table) {
            $table->dropColumn('secteur_en');
        });
    }
};

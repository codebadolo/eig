<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('filiales', function (Blueprint $table) {
            if (!Schema::hasColumn('filiales', 'vision_en'))
                $table->text('vision_en')->nullable()->after('vision');
            if (!Schema::hasColumn('filiales', 'valeurs_en'))
                $table->text('valeurs_en')->nullable()->after('valeurs');
            if (!Schema::hasColumn('filiales', 'commentaires_en'))
                $table->longText('commentaires_en')->nullable()->after('commentaires');
        });
    }

    public function down(): void {
        Schema::table('filiales', function (Blueprint $table) {
            $cols = ['vision_en', 'valeurs_en', 'commentaires_en'];
            foreach ($cols as $col) {
                if (Schema::hasColumn('filiales', $col)) $table->dropColumn($col);
            }
        });
    }
};

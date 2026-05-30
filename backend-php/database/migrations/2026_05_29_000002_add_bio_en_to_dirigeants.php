<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('dirigeants', function (Blueprint $table) {
            if (!Schema::hasColumn('dirigeants', 'bio_en'))
                $table->text('bio_en')->nullable()->after('bio');
            if (!Schema::hasColumn('dirigeants', 'mot'))
                $table->text('mot')->nullable()->after('bio_en');
            if (!Schema::hasColumn('dirigeants', 'mot_en'))
                $table->text('mot_en')->nullable()->after('mot');
        });
    }

    public function down(): void
    {
        Schema::table('dirigeants', function (Blueprint $table) {
            $table->dropColumn(['bio_en', 'mot', 'mot_en']);
        });
    }
};

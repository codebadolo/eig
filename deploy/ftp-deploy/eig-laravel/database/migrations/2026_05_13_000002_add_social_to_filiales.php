<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('filiales', function (Blueprint $table) {
            if (!Schema::hasColumn('filiales', 'linkedin'))
                $table->string('linkedin')->nullable()->after('website');
            if (!Schema::hasColumn('filiales', 'facebook'))
                $table->string('facebook')->nullable()->after('linkedin');
            if (!Schema::hasColumn('filiales', 'twitter'))
                $table->string('twitter')->nullable()->after('facebook');
            if (!Schema::hasColumn('filiales', 'instagram'))
                $table->string('instagram')->nullable()->after('twitter');
            if (!Schema::hasColumn('filiales', 'youtube'))
                $table->string('youtube')->nullable()->after('instagram');
            if (!Schema::hasColumn('filiales', 'tiktok'))
                $table->string('tiktok')->nullable()->after('youtube');
            if (!Schema::hasColumn('filiales', 'whatsapp'))
                $table->string('whatsapp')->nullable()->after('tiktok');
        });
    }

    public function down(): void {
        Schema::table('filiales', function (Blueprint $table) {
            foreach (['linkedin','facebook','twitter','instagram','youtube','tiktok','whatsapp'] as $col) {
                if (Schema::hasColumn('filiales', $col)) $table->dropColumn($col);
            }
        });
    }
};

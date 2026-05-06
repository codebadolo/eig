<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        if (!Schema::hasColumn('metiers', 'image')) {
            Schema::table('metiers', function (Blueprint $table) {
                $table->string('image')->nullable()->after('couleur');
            });
        }
    }

    public function down() {
        if (Schema::hasColumn('metiers', 'image')) {
            Schema::table('metiers', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        }
    }
};

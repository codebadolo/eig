<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('dirigeants', function (Blueprint $table) {
            if (!Schema::hasColumn('dirigeants', 'role_en'))
                $table->string('role_en')->nullable()->after('role');
        });
    }
    public function down(): void {
        Schema::table('dirigeants', function (Blueprint $table) {
            $table->dropColumn('role_en');
        });
    }
};

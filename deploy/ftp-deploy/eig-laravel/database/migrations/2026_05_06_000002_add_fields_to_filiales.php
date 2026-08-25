<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('filiales', function (Blueprint $table) {
            if (!Schema::hasColumn('filiales', 'description_en'))
                $table->text('description_en')->nullable()->after('description');
            if (!Schema::hasColumn('filiales', 'image'))
                $table->string('image')->nullable()->after('logo');
            if (!Schema::hasColumn('filiales', 'mission'))
                $table->text('mission')->nullable()->after('description_en');
            if (!Schema::hasColumn('filiales', 'mission_en'))
                $table->text('mission_en')->nullable()->after('mission');
            if (!Schema::hasColumn('filiales', 'telephone'))
                $table->string('telephone')->nullable()->after('website');
            if (!Schema::hasColumn('filiales', 'email_contact'))
                $table->string('email_contact')->nullable()->after('telephone');
            if (!Schema::hasColumn('filiales', 'adresse'))
                $table->string('adresse')->nullable()->after('email_contact');
            if (!Schema::hasColumn('filiales', 'ville'))
                $table->string('ville')->nullable()->after('adresse');
        });
    }

    public function down(): void {
        Schema::table('filiales', function (Blueprint $table) {
            $cols = ['description_en','image','mission','mission_en','telephone','email_contact','adresse','ville'];
            foreach ($cols as $col) {
                if (Schema::hasColumn('filiales', $col)) $table->dropColumn($col);
            }
        });
    }
};

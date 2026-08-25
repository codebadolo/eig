<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('articles', function (Blueprint $table) {
            if (!Schema::hasColumn('articles', 'titre_en'))   $table->string('titre_en')->nullable()->after('titre');
            if (!Schema::hasColumn('articles', 'extrait_en')) $table->text('extrait_en')->nullable()->after('extrait');
            if (!Schema::hasColumn('articles', 'contenu_en')) $table->longText('contenu_en')->nullable()->after('contenu');
        });

        Schema::table('filiales', function (Blueprint $table) {
            if (!Schema::hasColumn('filiales', 'description_en')) $table->text('description_en')->nullable()->after('description');
        });

        Schema::table('metiers', function (Blueprint $table) {
            if (!Schema::hasColumn('metiers', 'titre_en'))        $table->string('titre_en')->nullable()->after('titre');
            if (!Schema::hasColumn('metiers', 'description_en'))  $table->text('description_en')->nullable()->after('description');
            if (!Schema::hasColumn('metiers', 'enjeux_en'))       $table->text('enjeux_en')->nullable()->after('enjeux');
            if (!Schema::hasColumn('metiers', 'contribution_en')) $table->text('contribution_en')->nullable()->after('contribution');
        });

        Schema::table('carrieres', function (Blueprint $table) {
            if (!Schema::hasColumn('carrieres', 'titre_en'))       $table->string('titre_en')->nullable()->after('titre');
            if (!Schema::hasColumn('carrieres', 'departement_en')) $table->string('departement_en')->nullable()->after('departement');
            if (!Schema::hasColumn('carrieres', 'description_en')) $table->text('description_en')->nullable()->after('description');
            if (!Schema::hasColumn('carrieres', 'missions_en'))    $table->text('missions_en')->nullable()->after('missions');
            if (!Schema::hasColumn('carrieres', 'profil_en'))      $table->text('profil_en')->nullable()->after('profil');
            if (!Schema::hasColumn('carrieres', 'avantages_en'))   $table->text('avantages_en')->nullable()->after('avantages');
        });
    }

    public function down(): void {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['titre_en', 'extrait_en', 'contenu_en']);
        });
        Schema::table('filiales', function (Blueprint $table) {
            $table->dropColumn('description_en');
        });
        Schema::table('metiers', function (Blueprint $table) {
            $table->dropColumn(['titre_en', 'description_en', 'enjeux_en', 'contribution_en']);
        });
        Schema::table('carrieres', function (Blueprint $table) {
            $table->dropColumn(['titre_en', 'departement_en', 'description_en', 'missions_en', 'profil_en', 'avantages_en']);
        });
    }
};

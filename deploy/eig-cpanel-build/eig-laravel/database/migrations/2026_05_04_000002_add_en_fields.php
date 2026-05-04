<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('titre_en')->nullable()->after('titre');
            $table->text('extrait_en')->nullable()->after('extrait');
            $table->longText('contenu_en')->nullable()->after('contenu');
        });

        Schema::table('filiales', function (Blueprint $table) {
            $table->text('description_en')->nullable()->after('description');
        });

        Schema::table('metiers', function (Blueprint $table) {
            $table->string('titre_en')->nullable()->after('titre');
            $table->text('description_en')->nullable()->after('description');
            $table->text('enjeux_en')->nullable()->after('enjeux');
            $table->text('contribution_en')->nullable()->after('contribution');
        });

        Schema::table('carrieres', function (Blueprint $table) {
            $table->string('titre_en')->nullable()->after('titre');
            $table->string('departement_en')->nullable()->after('departement');
            $table->text('description_en')->nullable()->after('description');
            $table->text('missions_en')->nullable()->after('missions');
            $table->text('profil_en')->nullable()->after('profil');
            $table->text('avantages_en')->nullable()->after('avantages');
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

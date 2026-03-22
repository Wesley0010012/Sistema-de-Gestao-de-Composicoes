<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('composers', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('photo_path')->nullable();

            $table->date('birth_date');
            $table->date('death_date')->nullable();

            $table->foreignId('nationality_id')
                ->constrained('nationalities')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->boolean('active')->default(true);

            $table->timestamps();

            $table->index('name');
            $table->index('birth_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('composers');
    }
};

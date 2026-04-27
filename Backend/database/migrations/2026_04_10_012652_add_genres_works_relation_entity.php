<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('genre_work', function (Blueprint $table) {
            $table->id();

            $table->foreignId('work_id')
                ->constrained('works')
                ->cascadeOnDelete();

            $table->foreignId('genre_id')
                ->constrained('genres')
                ->cascadeOnDelete();

            $table->timestamps();

            // Evita duplicidade
            $table->unique(['work_id', 'genre_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('genre_work');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('section_work', function (Blueprint $table) {
            $table->id();

            $table->foreignId('work_id')
                ->constrained('works')
                ->cascadeOnDelete();

            $table->foreignId('section_id')
                ->constrained('sections')
                ->cascadeOnDelete();

            $table->timestamps();

            $table->unique(['work_id', 'section_id']); // evita duplicidade
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('section_work');
    }
};
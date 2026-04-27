<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('work_id')->constrained('works')->onDelete('cascade');

            // Representação do VO Key
            $table->string('key_root'); // ex: C, D, E, F, G, A, B
            $table->string('key_mode'); // ex: major, minor

            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};

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
        Schema::create('composer_periods', function (Blueprint $table) {
            $table->id();

            $table->foreignId('composer_id')
                ->constrained('composers')
                ->cascadeOnDelete();

            $table->foreignId('period_id')
                ->constrained('periods')
                ->cascadeOnDelete();

            $table->unique(['composer_id', 'period_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('composers_periods');
    }
};

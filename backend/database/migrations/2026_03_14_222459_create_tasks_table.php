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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('goal_id')->references('id')->on('goals')->cascadeOnDelete();
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->string('description');
            $table->enum('type', ['daily', 'on_certain_days_of_the_week', 'x_times_per_week']);
            $table->integer('rank')->default(100);
            
            $table->boolean('is_on_monday')->nullable();
            $table->boolean('is_on_tuesday')->nullable();
            $table->boolean('is_on_wednesday')->nullable();
            $table->boolean('is_on_thursday')->nullable();
            $table->boolean('is_on_friday')->nullable();
            $table->boolean('is_on_saturday')->nullable();
            $table->boolean('is_on_sunday')->nullable();
            
            $table->integer('times_per_week')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

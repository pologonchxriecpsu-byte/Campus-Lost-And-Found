<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * The Lost & Found "item" form has 7 inputs, so the `products` table needs 7 matching
 * columns. The original template table only had `product` and `price`.
 *
 *   form input        -> column
 *   Item Name         -> name
 *   Icon (emoji)      -> icon
 *   Category          -> category
 *   Color             -> color
 *   Status            -> status     (Lost | Found | Claimed)
 *   Date              -> date
 *   Campus Location   -> location
 *
 * The old demo table (product/price) is replaced instead of altered: SQLite cannot add
 * NOT NULL columns to an existing table, and the old demo rows do not fit the new data anyway.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('products');

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon', 16)->default('📦');
            $table->string('category');
            $table->string('color');
            $table->string('status')->default('Lost');
            $table->date('date');
            $table->string('location');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product');
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }
};

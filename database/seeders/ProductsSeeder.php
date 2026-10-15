<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /** Same 9 sample items that were hard-coded in products.html. */
    public function run(): void
    {
        $items = [
            ['name' => 'MacBook Pro 13"',       'category' => 'Electronics',       'color' => 'Space Gray',   'status' => 'Lost',    'date' => '2026-10-10', 'location' => 'Central Library',      'icon' => '💻'],
            ['name' => 'Hydro Flask',           'category' => 'Personal Asset',    'color' => 'Matte Black',  'status' => 'Found',   'date' => '2026-10-11', 'location' => 'Student Union Café',   'icon' => '🧴'],
            ['name' => 'Student ID Card',       'category' => 'Cards & Documents', 'color' => 'Navy Blue',    'status' => 'Found',   'date' => '2026-10-09', 'location' => 'Engineering Building', 'icon' => '🪪'],
            ['name' => 'AirPods Pro',           'category' => 'Electronics',       'color' => 'White',        'status' => 'Lost',    'date' => '2026-10-12', 'location' => 'Gym Locker Room',      'icon' => '🎧'],
            ['name' => 'Dorm Room Keys',        'category' => 'Accessories',       'color' => 'Silver',       'status' => 'Found',   'date' => '2026-10-08', 'location' => 'Parking Lot C',        'icon' => '🔑'],
            ['name' => 'Leather Wallet',        'category' => 'Personal Asset',    'color' => 'Brown Leather','status' => 'Lost',    'date' => '2026-10-13', 'location' => 'Main Cafeteria',       'icon' => '👛'],
            ['name' => 'Compact Umbrella',      'category' => 'Accessories',       'color' => 'Red',          'status' => 'Found',   'date' => '2026-10-07', 'location' => 'Science Hall Lobby',   'icon' => '☂️'],
            ['name' => 'Backpack',              'category' => 'Personal Asset',    'color' => 'Navy & Gray',  'status' => 'Lost',    'date' => '2026-10-06', 'location' => 'Bus Stop Near Dorms',  'icon' => '🎒'],
            ['name' => 'Scientific Calculator', 'category' => 'Electronics',       'color' => 'Black',        'status' => 'Claimed', 'date' => '2026-10-05', 'location' => 'Science Hall',         'icon' => '🧮'],
        ];

        // oldest first, so the first item in the list above gets the highest id (= shown on top)
        foreach (array_reverse($items) as $item) {
            Products::create($item);
        }
    }
}

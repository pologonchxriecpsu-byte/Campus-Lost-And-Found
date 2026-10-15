<?php

namespace Tests\Feature;

use App\Models\Products;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Proves the Lost & Found items are really stored in the database (all 7 fields) and that
 * create / read / update / delete work. The Dashboard and Product Management pages both use
 * these same endpoints, so they always show the same data.
 */
class ProductsCrudTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'AirPods Pro',
            'icon' => '🎧',
            'category' => 'Electronics',
            'color' => 'White',
            'status' => 'Lost',
            'date' => '2026-10-12',
            'location' => 'Gym Locker Room',
        ], $overrides);
    }

    public function test_guests_cannot_use_the_items_api(): void
    {
        $this->getJson('/items')->assertUnauthorized();
        $this->postJson('/items', $this->payload())->assertUnauthorized();
    }

    public function test_an_item_is_stored_with_all_seven_fields(): void
    {
        $this->actingAs(User::factory()->create())
            ->postJson('/items', $this->payload())
            ->assertCreated();

        $this->assertDatabaseHas('products', $this->payload());
    }

    public function test_items_are_validated(): void
    {
        $this->actingAs(User::factory()->create())
            ->postJson('/items', $this->payload(['name' => '', 'status' => 'Stolen']))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'status']);
    }

    public function test_items_can_be_listed_updated_and_deleted(): void
    {
        $user = User::factory()->create();
        $item = Products::create($this->payload());

        $this->actingAs($user)->getJson('/items')->assertOk()->assertJsonCount(1)->assertJsonFragment(['name' => 'AirPods Pro']);

        $this->actingAs($user)
            ->putJson("/items/{$item->id}", $this->payload(['status' => 'Claimed']))
            ->assertOk();
        $this->assertDatabaseHas('products', ['id' => $item->id, 'status' => 'Claimed']);

        $this->actingAs($user)->deleteJson("/items/{$item->id}")->assertNoContent();
        $this->assertDatabaseMissing('products', ['id' => $item->id]);
    }

    public function test_dashboard_and_products_pages_render_for_logged_in_users(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/dashboard')->assertOk();
        $this->actingAs($user)->get('/products')->assertOk();
    }
}

<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',   
        // ]);

        // Default admin for local/dev
        $admin = User::updateOrCreate(
            ['email' => 'admin@themesbrand.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('12345678'),
            ]
        );

        // Optional: mark verified (won't affect login, but helps if UI expects verified email)
        $admin->forceFill(['email_verified_at' => now()])->saveQuietly();

        $this->call([
            OrdersSeeder::class
        ]);
    }
}

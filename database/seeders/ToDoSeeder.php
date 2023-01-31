<?php

namespace Database\Seeders;

use App\Models\ToDo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ToDoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ToDo::factory()->create(["title" => "Mosás"]);
        ToDo::factory()->create(["title" => "Főzés"]);
        ToDo::factory()->create(["title" => "Tanulás"]);
    }
}

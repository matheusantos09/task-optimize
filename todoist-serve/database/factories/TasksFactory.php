<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Models\Task::class, function (Faker $faker) {
    return [
      'description' => $faker->text(100),
      'status' => random_int(0,1) ? 'C' : 'I'
    ];
});

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    const STATUS_COMPLETE = 'C',
        STATUS_INCOMPLETE = 'I';

    protected $table    = 'tasks';
    protected $fillable = ['description', 'status'];

}

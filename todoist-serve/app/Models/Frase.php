<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Frase extends Model
{
    protected $table    = 'frases';
    protected $fillable = ['text'];
}

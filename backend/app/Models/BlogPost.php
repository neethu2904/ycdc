<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $guarded = [];
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $casts = [
        'body_content' => 'array',
    ];
}

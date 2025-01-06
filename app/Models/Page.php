<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'page_name',
        'slug',
        'status',
        'page_data',
        'page_data_html',
    ];

    /**
     * The model's default values for attributes.

     *

     * @var array
     */
    protected $attributes = [

        'page_data' => '[]',
        'page_data_html' => '[]',

    ];
}

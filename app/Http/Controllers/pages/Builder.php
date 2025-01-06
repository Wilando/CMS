<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;

class Builder extends Controller
{
    public function index()
    {
        return view('content.pages.builder');
    }
}

<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;

class PageManagement extends Controller
{
    public function index()
    {
        return view('content.pages.pages-management');
    }
}

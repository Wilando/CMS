<?php

namespace App\Http\Controllers\pages;

use App\Http\Controllers\Controller;
use App\Models\Page;

class PublicPage extends Controller
{
    public function index($slug)
    {
        $data = Page::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
        $data = json_decode($data->page_data_html, true);

        return view('content.pages.public-page', ['data' => $data]);
    }
}

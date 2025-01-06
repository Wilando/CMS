<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function listPage()
    {
        // Mengambil semua data pengguna
        $page = Page::orderBy('created_at', 'desc')->get();

        // Mengembalikan data pengguna dalam format JSON
        return response()->json(
            [
                'status' => true,
                'data' => $page,
            ]
        );
    }

    public function storePage(Request $request)
    {
        // Validation
        $request->validate(
            [
                'namaPage' => 'required|string',
                'status' => 'required|string',
            ]
        );
        $slug = Str::slug($request->namaPage);
        $randomString = Str::random(5);
        $uniqueSlug = "{$slug}-{$randomString}";
        // dd($request->status);
        while (Page::where('slug', $uniqueSlug)->exists()) {
            $randomString = Str::random(5);
            $uniqueSlug = "{$slug}-{$randomString}";
        }
        $page = Page::create(
            [
                'page_name' => $request->namaPage,
                'slug' => $uniqueSlug,
                'status' => $request->status,
            ]
        );

        // Mengembalikan data pengguna dalam format JSON
        return response()->json(
            [
                'status' => true,
                'data' => $page,
            ]
        );
    }

    public function deletePage($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();

        return response()->json([
            'status' => true,
            'data' => $page,
        ]);
    }

    public function updatePage(Request $request, $id)
    {
        // Validation
        $request->validate(
            [
                'namaPage' => 'required|string',
                'status' => 'required|string',
            ]
        );
        $slug = Str::slug($request->namaPage);
        $randomString = Str::random(5);
        $uniqueSlug = "{$slug}-{$randomString}";

        while (Page::where('slug', $uniqueSlug)->exists()) {
            $randomString = Str::random(5);
            $uniqueSlug = "{$slug}-{$randomString}";
        }
        $page = Page::where('id', $id)->update(
            [
                'page_name' => $request->namaPage,
                'slug' => $uniqueSlug,
                'status' => $request->status,
            ]
        );

        // Mengembalikan data pengguna dalam format JSON
        return response()->json(
            [
                'status' => true,
                'data' => $page,
            ]
        );
    }

    public function dataPage($id)
    {
        $page = Page::findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $page['page_data'],
        ]);
    }

    public function updateDataPage(Request $request, $id)
    {
        $page = Page::where('id', $id)->update([
            'page_data' => $request->page_data,
            'page_data_html' => $request->page_data_html,
        ]);

        // Mengembalikan data pengguna dalam format JSON
        return response()->json([
            'status' => true,
            'data' => $page,
        ]);
    }
}

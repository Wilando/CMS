<?php

namespace App\Http\Controllers\pages\UserManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserList extends Controller
{
  public function index()
  {
    return view('content.pages.user_management.user-list');
  }
}

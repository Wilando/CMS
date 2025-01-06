<?php

namespace App\Http\Controllers\pages\UserManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RolePermission extends Controller
{
  public function index()
  {
    return view('content.pages.user_management.role-dan-permission');
  }
}

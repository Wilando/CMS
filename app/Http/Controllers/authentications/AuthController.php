<?php

namespace App\Http\Controllers\authentications;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  // POST [name, email, password]
  public function register(Request $request)
  {
    // Validation
    $request->validate([
      "name" => "required|string",
      "username" => "required|string|unique:users",
      "email" => "required|string|email|unique:users",
      "password" => "required|confirmed" // password_confirmation
    ]);

    // Create User
    User::create([
      "name" => $request->name,
      "username" => $request->username,
      "email" => $request->email,
      "password" => bcrypt($request->password)
    ]);

    return response()->json([
      "status" => true,
      "message" => "User registered successfully",
      "data" => []
    ]);

  }

  public function login(Request $request)
  {
    $credentials = $request->validate([
        'username' => ['required'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        return response()->json([
          'status' => true,
          'message' => 'Login Berhasil',
          'redirect_url' => url('/dashboard'), // URL tujuan setelah login berhasil
      ]);
    }

    return response()->json([
        'status' => false,
        'message' => 'Username atau Password Salah',
    ]);

    // $request->validate([
    //   'username' => 'required|string',
    //   'password' => 'required'
    // ]);

    // $user = User::where("username", $request->username)->first();

    // if (!empty($user)) {
    //   // User exists
    //   if (Hash::check($request->password, $user->password)) {
    //     // Password matched
    //     $token = $user->createToken("myAccessToken")->plainTextToken;
    //     return redirect()->route('dashboard');
    //     // return response()->json([
    //     //   "status" => true,
    //     //   "message" => "Login Suksess",
    //     //   "token" => $token,
    //     //   "data" => []
    //     // ]);
    //   } else {
    //     return response()->json([
    //       "status" => false,
    //       "message" => "Username atau Password Salah",
    //       "data" => []
    //     ]);
    //   }
    // } else {
    //   return response()->json([
    //     "status" => false,
    //     "message" => "Username atau Password Salah",
    //     "data" => []
    //   ]);
    // }
  }

  public function profile()
  {
    $userData = auth()->user();

    return response()->json([
        "status" => true,
        "message" => "Profile information",
        "data" => $userData,
        "id" => auth()->user()->id
    ]);
  }

  public function logout(Request $request)
  {
    Auth::guard("web")->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
 
    return redirect('/');

    // return response()->json([
    //     "status" => true,
    //     "message" => "User Logged out successfully",
    //     "data" => []
    // ]);
  }
  
}
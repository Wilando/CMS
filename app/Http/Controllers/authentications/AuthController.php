<?php

namespace App\Http\Controllers\authentications;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validation
        $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|confirmed', // password_confirmation
        ]);

        // Create User
        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User registered successfully',
            'data' => [],
        ]);

    }

    public function login(Request $request)
    {
        $credentials = $request->validate(
            [
                'username' => ['required'],
                'password' => ['required'],
            ]
        );

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json(
                [
                    'status' => true,
                    'message' => 'Login Berhasil',
                    'redirect_url' => url('/admin/dashboard'),
                ]
            );
        }

        return response()->json(
            [
                'status' => false,
                'message' => 'Username atau Password Salah',
            ]
        );

    }

    public function profile()
    {
        $userData = auth()->user();

        return response()->json(
            [
                'status' => true,
                'message' => 'Profile information',
                'data' => $userData,
                'id' => auth()->user()->id,
            ]
        );
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');

    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = new User();
        $new_user_data = $request->all();
        $new_user_data["password"] = Hash::make($new_user_data["password"]);
        $user->fill($new_user_data);
        $user->save();
        $token = $user->createToken("ApiToken")->plainTextToken;
        $response = [
            "message" => "Sikeres Regisztráció",
            "token" => $token
        ];
        return response($response, 201);
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt($request->all())) {
            $user = Auth::user();
            $token = $user->createToken("ApiToken")->plainTextToken;
            $response = [
                "message" => "Sikeres Bejelentkezés",
                "token" => $token
            ];
            return response($response);
        } else {
            return response(["message" => "Unauthenticated."], 401);
        }
    }
}

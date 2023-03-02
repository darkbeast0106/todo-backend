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
        $response = [
            "message" => "Register successfully.",
            "token" => $user->createToken("ApiToken")->plainTextToken,
        ];
        return response($response, 201);
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt($request->all())) {
            $user = Auth::user();
            $response = [
                "message" => "Login successfully.",
                "token" => $user->createToken("ApiToken")->plainTextToken,
            ];
            return response($response, 200);
        } else {
            return response(["message" => "Unauthenticated."], 401);
        }
    }
}

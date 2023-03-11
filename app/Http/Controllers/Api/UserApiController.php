<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserApiController extends HomeController
{
    public function register(Request $request){
        $username = $request->username;
        $mobile = $request->mobile;
        $email = $request->email;
        $password = $request->password;

        $request->validate([
            'username'=>'required',
            'mobile'=>'required',
            'email'=>'required|email',
            'password'=>'required',
        ]);

        //check whether a user is already exists or not
        if(User::where('email',$email)->first())
        {
            return response()->json([
                'message'=>'Email Already Registered',
                'status'=>'Failed',
            ],200);
        }
        if(User::where('mobile',$mobile)->first())
        {
            return response()->json([
                'message'=>'Mobile Number Already Registered',
                'status'=>'Failed',
            ],200);
        }

        //creating user with token
        $user = User::create([
            'username'=>$username,
            'mobile'=>$mobile,
            'email'=>$email,
            'password'=>Hash::make($password),
        ]);
        $token = $user->createToken($email)->plainTextToken;
        return response()->json([
            'token'=>$token,
            'message'=>'Registration Success',
            'status'=>'Success',
        ],201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required',
            'password'=>'required',
        ]);
        $user = User::where('email',$request->email)->first();
        if($user && Hash::check($request->password,$user->password)){
            $token = $user->createToken($request->email)->plainTextToken;
            return response()->json([
                'token'=>$token,
                'message'=>'Login Success',
                'status'=>'Success',
            ],200);
        }
        return response()->json([
            'message'=>'The Provided Credientials Are Incorrect',
            'status'=>'Failed',
        ],401);
    }

    public function check_auth(){
        $user = auth()->user();
        // fetching logged in user data with token() info
        return response()->json([
            'user'=>$user,
            'message'=>'Logged User Data',
            'status'=>'Success',
        ],200);
    }
    public function logout(){
        auth()->user()->tokens()->delete();
        // fetching logged in user data with token() info
        return response()->json([
            'message'=>'Logged Out Successfully',
            'status'=>'Success',
        ],200);
    }
}

<?php

use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('/register',[UserApiController::class,'register']);
Route::post('/login',[UserApiController::class,'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout',[UserApiController::class,'logout']);
    Route::get('/check_auth',[UserApiController::class,'check_auth']);
});

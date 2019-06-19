<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Route::post('/login', 'UserController@login');
Route::post('/users', 'UserController@register');

//Route::post('/register', 'AuthController@register');
//Route::post('/login', 'AuthController@login');
//Route::post('/logout', 'AuthController@logout');

Route::group([
    'prefix'     => 'auth',
], function () {

    Route::post('signup', 'Api\Auth\SignUpController@signUp');
    Route::post('login', 'Api\Auth\LoginController@login');
    Route::post('recovery', 'Api\Auth\ForgotPasswordController@sendResetEmail');
    Route::post('reset', 'Api\Auth\ResetPasswordController@resetPassword');

});


Route::group([
    'prefix'     => 'auth',
    'middleware' => ['jwt.auth']
], function () {

    Route::post('recovery', 'Api\Auth\ForgotPasswordController@sendResetEmail');
    Route::post('reset', 'Api\Auth\ResetPasswordController@resetPassword');

    Route::post('logout', 'Api\Auth\LogoutController@logout');
    Route::post('refresh', 'Api\Auth\RefreshController@refresh');
    Route::get('me', 'Api\Auth\UserController@me');

    /* Tasks */
    Route::get('/task', 'TaskController@tasks');
    Route::get('/task/completed', 'TaskController@tasksCompleted');
    Route::post('/task/save', 'TaskController@store');
    Route::post('/change-task', 'TaskController@changeTask');

    /* Timer Events */
    Route::post('/timer-event', 'TimerEventController@store');
});

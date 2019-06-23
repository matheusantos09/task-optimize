<?php

Route::post('/users', 'UserController@register');

Route::group([
    'prefix' => 'auth',
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

    /* Tasks */
    Route::get('/task', 'TaskController@tasks');
    Route::get('/task/completed', 'TaskController@tasksCompleted');
    Route::post('/task/save', 'TaskController@store');
    Route::put('/task/edit/{id}', 'TaskController@update');
    Route::post('/change-task', 'TaskController@changeTask');
    Route::delete('/task/destroy', 'TaskController@destroy');

    /* Timer Events */
    Route::post('/timer-event', 'TimerEventController@store');

    /* User */
    Route::get('/user/load', 'UserController@loadConfigs');
    Route::post('/user/save', 'UserController@saveConfigs');
    Route::post('/user/snooze/start', 'UserController@startSnooze');
    Route::post('/user/snooze/end', 'UserController@endSnooze');

    /* Frases */
    Route::post('/phase/random', 'FraseController@random');

});

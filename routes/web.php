<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router){
	return view('home.index');
    //return $router->app->version();
});

$router->get('/performance', function (){
	return view('performance.index');
});

$router->get('/register-new',['uses' =>'Enrolment\AddStaff@register_view',
                               'as' => 'enroll-view'
                              ]);
$router->get('/qualification', function (){
	return view('performance.qualifications.index');
});

$router->get('/publication', function (){
	return view('performance.publication.index');
});
$router->get('/appraisal', function (){
	return view('appraisal.index');
});
$router->get('/adminuni', function (){
	return view('performance.universityadmin.index');
});



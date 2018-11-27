<?php

namespace App\Http\Controllers\Enrolment;

use App\Http\Controllers\Controller;

class AddStaff extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    public function register_view(){

    	return view('enroll_staff.index');
    }

    //
}

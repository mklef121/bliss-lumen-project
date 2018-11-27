<?php

namespace App; 

use App\Gender;
use App\Wallet;
use App\User_Card;
use App\Users_login;
use App\Ride_request;
use App\Scopes\OrderbyDESCScope;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{


    /**
     * The notifiable trait is for notifications, while softdeletes is used to
     * temporarily delete the resource
     *
     * @var trait
     */

    use Notifiable, SoftDeletes; 

    /**
     * The attributes that specifies that modelshouldnt be deleted completely.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are constatnts in our application.
     *
     * @var constant
     */
    //for verified
    const VERIFIED_USER = '1';
    const UNVERIFIED_USER = '0';

    //For user_status
    const USER_SUSPENDED = 'suspended';
    const USER_ACTIVE = 'active'; 

    //For user_role
    const USER_ADMIN_ROLE = 'admin';
    const USER_NORMAL_ROLE = 'user';


    /**
     * A number that determines how many digits of verification code is sent to user
     *
     * @var ints
     */
    const VERIFICATION_NUMBER = 4;



    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'verified' => 'boolean',
    ]; 
   

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'password_real','verification_token'
    ];


    


    /**
     * Mutator: Mutators start with set. Mutators change database values just before They 
     * are inserted. The mutator and accessor naming is intelligent.
     * Use a capital letter beginning the table column name and laravel will guess the 
     * rest :: Set the user's email.
     * @param  \App\User:  $email
     * @return void
     */
    public function setEmailAttribute($email) 
    {
        $this->attributes['email'] = strtolower($email);
    }


    /**
     * rest :: Set the user's First Name.
     * @param  \App\User:  $fname
     * @return void
     */
    public function setFnameAttribute($fname) 
    {
        $this->attributes['fname'] = ucfirst(strtolower($fname));
    }

    /**
     * rest :: Set the user's Last Name.
     * @param  \App\User:  $lname
     * @return void
     */
    public function setLnameAttribute($lname) 
    {
        $this->attributes['lname'] = ucfirst(strtolower($lname));
    }

     /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return "{$this->fname} {$this->lname} ";
    }


    /**
     * Used By laravel Passport to determine the username to be used for Authentification
     * In this case it is Email and Phone Number
     * @return string
     */
    public function findForPassport($username) {
        return $this->Where('email', $username)->orWhere('phone', $username)->first();
    }


    /**
     * Get the Requests by this user .
     * @return App\Requests model
     */
    public function Ride_request(){

        return $this->hasMany(Ride_request::class);
    }


    /**
     * Get the atm cards belonging to user .
     * @return App\User_Card model
     */
    public function User_Card(){

        return $this->hasMany(User_Card::class);
    }

    /**
     * Get the Login history of the user.
     * @return App\Users_login model
     */
    public function Users_login(){

        return $this->hasMany(Users_login::class);
    }


    /**
     * Get all the phone details the user have used to log in on this platform.
     * @return App\Users_phones model
     */
    public function Users_phones(){

        return $this->hasMany(Users_phones::class);
    }


     /**
     * Returns the wallet of the user.
     * @return App\Wallet
     */
    public function Wallet(){

        return $this->hasOne(Wallet::class);
    }

    /**
     * Get the User Gender .
     * @return App\Gender model
     */
    public function Gender(){

        return $this->belongsTo(Gender::class);
    }


     /**
     * Check if the user is verified.
     * @return boolean
     */
    public function isVerified(){

        return $this->verified ==  self::VERIFIED_USER;
    }

    /**
     * Check if the user is Active OR suspended .
     * @return boolean
     */
    public function isActive(){

        return $this->user_status ==  self::USER_ACTIVE;
    }


    /**
     * Check if the user is an ADMIN .
     * @return boolean
     */
    public function isAdmin(){

        return $this->user_role ==  self::USER_ADMIN_ROLE;
    }

   

   


    /**
     * Create the USERS Verification Code .
     * @param number
     * @return string
     */
    static function randomVerify($count) {

        $alphabet = "0123456789";
        $code = array(); 
        $alphaLength = strlen($alphabet) - 1; 
        for ($i = 0; $i < $count; $i++) {
            $n = rand(0, $alphaLength);
            $code[] = $alphabet[$n];
        }
        $code =  implode($code);

       if (self::where(['verification_token' => $code])->count() > 0){
            $code = self::randomVerify($count);
       }

       return $code;
    }




}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0'); //Neglets foreign key checks when truncating db
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('fname');
            $table->string('sname');
            $table->string('mname');
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->string('password_real')->nullable();
            $table->string('user_status')->nullable();
            
            $table->string('image')->nullable();
            $table->string('marital_status');
            $table->string('no_of_children');
            $table->string('nationality');
            $table->string('age');
            
            $table->string('gender');
            
            $table->rememberToken();
            $table->string('verification_token')->nullable();
            $table->timestamps();
            $table->softDeletes();//deleted_at


            
        });

      //   Schema::table('users', function($table) {
      //   $table->foreign('gender_id')->references('id')->on('genders'); 
      // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}

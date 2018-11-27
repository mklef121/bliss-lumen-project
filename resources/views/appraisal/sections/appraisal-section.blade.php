<!-- BREAK HERE FOR NOW -->
<div class="content-wrap">
        <div class="main">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-lg-8 p-0">
                        <div class="page-header">
                            <div class="page-title">
                                <h1>Dashboard</h1>
                            </div>
                        </div>
                    </div><!-- /# column -->
                    <div class="col-lg-4 p-0">
                        <div class="page-header">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li><a href="#">Dashboard</a></li>
                                    <li class="active">Home</li>
                                </ol>
                            </div>
                        </div>
                    </div><!-- /# column -->
                </div><!-- /# row -->

                 <div class="main-content">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card alert">
                                <div class="card-body">
                                    <div class="basic-form">
                                            <div class="row">
                                                <div class="col-lg-3">
                                                    <ul class="nav nav-pills nav-stacked " style="text-align: center;">
                                                        <li class="active"><a href="#home" data-toggle="tab" ><b>Lecturer's Appraisal</b></a></li>
                                                        <li><a href="#home1" data-toggle="tab" ><b>Add Department</b></a></li>
                                                        <li><a href="#leavetab" role="tab"  data-toggle="tab" ><b>Add Leave Type</b></a></li>
                                                        <li><a href="#factab" role="tab"  data-toggle="tab" ><b>Add Faculty/School</b></a></li>
                                                    </ul>
                                                </div>

                                                <div class="col-lg-8">
                                                        <div class="tab-content">
                                                                <div id="home" class="tab-pane fade in active">
                                                                    <div class="row">
                                                                            <div class="col-lg-12">
                                                                                 <div class="panel panel-warning m-t-15">
                                                                                    <div class="panel-heading">
                                                                                        STUDENTS’ APPRAISAL OF LECTURERS' COMPETENCIES
                                                                                    </div>
                                                                                    <div class="panel-body">
                                                                                        <div class="custom-tab">
                                                                                            <ul class="nav nav-tabs" role="tablist">
                                                                                                <li role="presentation" class="active"><a href="#1" aria-controls="1" role="tab" data-toggle="tab">Student Details</a></li>
                                                                                                <li role="presentation"><a href="#2" aria-controls="2" role="tab" data-toggle="tab">Course Details</a></li>
                                                                                                <li role="presentation"><a href="#3" aria-controls="3" role="tab" data-toggle="tab">Evaluation Questions</a></li>
                                                                                               
                                                                                            </ul>
                                                                                            <div class="tab-content">
                                                                                                <div role="tabpanel" class="tab-pane active" id="1">
                                                        <!-- 8888888 TAB1 CONTENT 888888-->

                                                                 <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <div class="alert alert-danger">
                                                                                    <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
                                                                                </div>
                                                                                    <table class="table table-responsive table-hover ">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Session</b></label>
                                                                <select class="form-control">
                                                                    <option value="" disabled selected>Session</option>
                                                                     <option value="Male">2017/2018</option>
                                                                     <option value="Female" >2018/2019</option>
                                                                </select>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Semester</b></label>
                                                                     <select class="form-control">
                                                            <option value="" disabled selected>Semester</option>
                                                             <option value="Male">Harmattan</option>
                                                             <option value="Female" >Rain</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Department</b></label>
                                                                     <select class="form-control">
                                                            <option value="" disabled selected>Department</option>
                                                             <option value="Male">Elect/Elect Engineering</option>
                                                             <option value="Female" >Civil Engineering</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Faculty</b></label>
                                                                     <select class="form-control">
                                                            <option value="" disabled selected>Faculty</option>
                                                             <option value="SEET">SEET</option>
                                                             <option value="SMAT" >SMAT</option>
                                                             <option value="SOHT">SOHT</option>
                                                             <option value="SOSC" >SOSC</option>
                                                             </select>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Level</b></label>
                                                                     <select class="form-control">
                                                            <option value="" disabled selected>Level</option>
                                                             <option value="1">100</option>
                                                             <option value="2" >200</option>
                                                             <option value="3" >300</option>
                                                             <option value="4" >400</option>
                                                             <option value="5" >500</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Reg Number</b></label>
                                                             <input type="text" name="" placeholder="Registration Number" class="form-control">
                                                                </div>
                                                            </td>
                                                        </tr>
                                        </tbody>
                                    </table>
                                            <button type="button" class="btn btn-md btn-primary mb-1 " style="float:right;" ><i class="fa fa-plus"></i> Save Data
                                            </button>
                                                                                </div>
                                                                        </div>


                                                        <!-- 8888888 TAB 1 CONTENT ENDS HERE 88888 -->
                                                                                                </div>
                                                                                                <div role="tabpanel" class="tab-pane" id="2">
                                                    <!-- 777777777 Tab 2 content start Here -->


                                                             <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <div class="alert alert-danger">
                                                                                    <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
                                                                                </div>
                                                                                    <table class="table table-responsive table-hover ">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Semester</b></label>
                                                                     <select class="form-control">
                                                            <option value="" disabled selected>Semester</option>
                                                             <option value="Male">Harmattan</option>
                                                             <option value="Female" >Rain</option>
                                                                    </select>
                                                                </div>
                                                            </td>

                                                             <td>
                                                                <div class="form-group">
                                                                    <label><b>Course Code</b></label>
                                                                <input type="text" name="" class="form-control" placeholder="Course Code">
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Course Title</b></label>
                                                                <input type="text" name="" class="form-control" placeholder="Course Title">
                                                                </div>
                                                            </td>
                                                               
                                                            <td>
                                                               <div class="form-group">
                                                                    <label><b>Name of Lecturer</b></label>
                                                                <input type="text" name="" class="form-control" placeholder="Name of Lecturer">
                                                                </div>
                                                            </td>
                                                        </tr>
                                                       
                                        </tbody>
                                    </table>
                                            <button type="button" class="btn btn-md btn-primary mb-1 " style="float:right;" ><i class="fa fa-plus"></i> Save Data
                                            </button>
                                                                                </div>
                                                                        </div>


                                                    <!-- 777777777 Tab2 content ends here -->
                                                                                                </div>
                                                                                                <div role="tabpanel" class="tab-pane" id="3">
                                                                                                    <p>This Evaluation question will be added with javascript during the course of development.</p>
                                                                                                </div>
                                                                                                
                                                                                            </div>
                                                                                        </div>
                                                                                    </div><!-- Panel Goes Here -->
                                                                                </div>
                                                                            </div>
                                                                    </div>
                                                                </div><!-- End Home here -->



                                                                <!-- Add home1 start here -->

                                                                <div id="home1" class="tab-pane fade">
                                                                        <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <div class="alert alert-danger">
                                                                                    <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
                                                                                </div>
                                                                                    <table class="table table-responsive table-hover ">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Faculty</b></label>
                                                                     <select class="form-control">
                                                                    <option value="" disabled selected>Select Faculty</option>
                                                                     </select>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Department</b></label>
                                                           <input type="text" class="form-control input-flat" placeholder="Department">
                                                                </div>
                                                            </td>
                                                        </tr>
                                                       <!-- -->
                                        </tbody>
                                    </table>
                                    <button type="button" class="btn btn-md btn-primary mb-1 " style="float:right;" ><i class="fa fa-plus"></i> Save Data
                                    </button>
                                                                                </div>
                                                                        </div>
                                                                </div><!-- End home1 Here -->

                                                                <!-- Start addition of leave type here -->

                                                                     <div id="leavetab" class="tab-pane fade">
                                                                        <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <div class="alert alert-danger">
                                                                                    <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
                                                                                </div>
                                                                                    <table class="table table-responsive table-hover ">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Leave Type</b></label>
                                                           <input type="text" class="form-control input-flat" placeholder="Leave Type">
                                                                </div>
                                                            </td>
                                                        </tr>
                                                       <!-- -->
                                        </tbody>
                                    </table>
                                    <button type="button" class="btn btn-md btn-primary mb-1 " style="float:right;" ><i class="fa fa-plus"></i> Save Data
                                    </button>
                                                                                </div>
                                                                        </div>
                                                                </div><!-- End home1 Here -->

                                                                <!-- End leave type here tab -->
                                                               

                                                               <!-- Add faculty here start -->

                                                                <div id="factab" class="tab-pane fade">
                                                                        <div class="row">
                                                                                <div class="col-lg-12">
                                                                                    <div class="alert alert-danger">
                                                                                    <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
                                                                                </div>
                                                                                    <table class="table table-responsive table-hover ">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div class="form-group">
                                                                    <label><b>Faculty Name</b></label>
                                                           <input type="text" class="form-control input-flat" placeholder="Faculty Name">
                                                                </div>
                                                            </td>
                                                        </tr>
                                                       <!-- -->
                                        </tbody>
                                    </table>
                                    <button type="button" class="btn btn-md btn-primary mb-1 " style="float:right;" ><i class="fa fa-plus"></i> Save Data
                                    </button>
                                                                                </div>
                                                                        </div>
                                                                </div><!-- End home1 Here -->


                                                               <!-- Add faculty here ends -->


                                                               
                                                        </div><!-- End Tab content -->
                                                </div> <!-- Close col 8 -->

            <!-- <div class="col-lg-8 tab-content">
                <form> -->
                        <!-- <div class="basic-form"> -->
                           <!--  <div class="row">
                                    <div class="col-lg-12"> -->
                                        <!--  -->
                                    <!-- </div>
                            </div> -->
                        <!-- </div> --><!-- Basic tab close1 -->

                        <!-- <div class="basic-form">
                            <div class="row">
                                    <div class="col-lg-12">
                                    </div>
                            </div>
                        </div> -->
                <!-- </form>
            </div> -->

                                    
                                                  
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- /# column -->
                    </div>
                </div><!-- /# main content -->

            </div><!-- /# container-fluid -->
        </div><!-- /# main -->
    </div><!-- /# content wrap -->
    
    
    
 







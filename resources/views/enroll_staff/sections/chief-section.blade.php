<div class="content-wrap">
    <div class="main">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-8 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <h1>Enroll Staff</h1>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 p-0">
                    <div class="page-header">
                        <div class="page-title">
                            <ol class="breadcrumb text-right">
                                <li><a href="{{url('/')}}">Dashboard</a></li>
                                <li class="active">Enroll</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div id="snappy-page"></div>
            <div class="main-content" id="enroll-page">
                
                <div class="row" id="everything-snaps">
                    <div class="col-lg-12">
                        <div class="card alert">
                            <div class="card-header">
                                <h4>Upload Image</h4>
                            </div>
                            <div class="card-body">
                                <p class="text-muted m-b-15">You can take several images until you get a satisfactory image, then proceed.</p>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="thumbnail">
                                            <div href="assets/images/lights.jpg">
                                                <div id="my_camera"></div>
                                                <div class="caption">
                                                    <p>Your camera image will appear here</p>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="thumbnail">
                                            <div>
                                                <img src="assets/images/fjords.jpg" alt="Fjords" style="width:100%" id="display_snapped">
                                                <div class="caption">
                                                    <p>Captured Image will appear here</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <button type="button" class="btn btn-default pull-left m-b-10" id="snap_picture">Capture Image</button>
                                    <button type="button" class="btn btn-danger m-b-10 m-l-5 pull-right" id="enter-personal-details" disabled="">Go Ahead</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /# column -->
                </div>
                <!-- /# row -->
            </div>
            <!-- /# main content -->
        </div>
        <!-- /# container-fluid -->
    </div>
    <!-- /# main -->
</div>
<!-- /# content wrap -->
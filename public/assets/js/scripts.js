(function($) {
    "use strict";

    /* 
    ------------------------------------------------
    Sidebar open close animated humberger icon
    ------------------------------------------------*/

    $(".hamburger").on('click', function() {
        $(this).toggleClass("is-active");
    });


    /*  
    -------------------
    List item active
    -------------------*/
    $('.header li, .sidebar li').on('click', function() {
        $(".header li.active, .sidebar li.active").removeClass("active");
        $(this).addClass('active');
    });

    $(".header li").on("click", function(event) {
        event.stopPropagation();
    });

    $(document).on("click", function() {
        $(".header li").removeClass("active");

    });



    /*  
    -----------------
    Chat Sidebar
    ---------------------*/


    var open = false;

    var openSidebar = function() {
        $('.chat-sidebar').addClass('is-active');
        $('.chat-sidebar-icon').addClass('is-active');
        open = true;
    }
    var closeSidebar = function() {
        $('.chat-sidebar').removeClass('is-active');
        $('.chat-sidebar-icon').removeClass('is-active');
        open = false;
    }

    $('.chat-sidebar-icon').on('click', function(event) {
        event.stopPropagation();
        var toggle = open ? closeSidebar : openSidebar;
        toggle();
    });




    /* 
    ---------------
    LobiPanel Function
    ---------------
    $(function() {
        $('.lobipanel-basic').lobiPanel({
            sortable: true,
            reload: {
                icon: 'ti-loop'
            },
            editTitle: {
                icon: 'ti-pencil-alt',
                icon2: 'ti-save'
            },
            unpin: {
                icon: 'ti-pin-alt'
            },
            minimize: {
                icon: 'ti-angle-up',
                icon2: 'ti-angle-down'
            },
            close: {
                icon: 'ti-close'
            },
            expand: {
                icon: 'ti-fullscreen',
                icon2: 'fa fa-compress'
            }
        });
    });

*/





    /* TO DO LIST 
    --------------------*/
    $(".tdl-new").on('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            var v = $(this).val();
            var s = v.replace(/ +?/g, '');
            if (s == "") {
                return false;
            } else {
                $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>" + v + "</span><a href='#' class='ti-close'></a></label></li>");
                $(this).val("");
            }
        }
    });


    $(".tdl-content a").on("click", function() {
        var _li = $(this).parent().parent("li");
        _li.addClass("remove").stop().delay(100).slideUp("fast", function() {
            _li.remove();
        });
        return false;
    });

    // for dynamically created a tags
    $(".tdl-content").on('click', "a", function() {
        var _li = $(this).parent().parent("li");
        _li.addClass("remove").stop().delay(100).slideUp("fast", function() {
            _li.remove();
        });
        return false;
    });



    /*  Chat Sidebar User custom Search
    ---------------------------------------*/

    $('[data-search]').on('keyup', function() {
        var searchVal = $(this).val();
        var filterItems = $('[data-filter-item]');

        if (searchVal != '') {
            filterItems.addClass('hidden');
            $('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('hidden');
        } else {
            filterItems.removeClass('hidden');
        }
    });


    /*  Chackbox all
    ---------------------------------------*/

    $("#checkAll").change(function() {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });


    /*  Data Table
    -------------*/

    //$('#bootstrap-data-table').DataTable();

    function DetectCam() {
        if ($(document).find('#snappy-page').length > 0) {


            if (window.snap_url) {
                document.querySelector('img#display_snapped').src = window.snap_url;
            }
            requirejs([$("meta[name='webcam-link']").attr('content')], ({
                Webcam
            }) => {
                // create an instance and initialize it
                const config = {
                    ctx: '#my_camera',
                    previewWidth: 400,
                    previewHeight: 300,
                    imageFormat: 'jpeg',
                    jpegQuality: 100,
                }

                //console.log();


                window.CamMaster = Webcam;
                Webcam(config).connect().then(cam => {
                    window.cam = cam;

                    console.log(cam);

                    //cam.destroy();
                });

            });

        }
    }

    DetectCam();




    function take_snapshot() {

        // cam.stop_media();
        // cam.destroy();
        cam.snap().then(url => {
            //console.log('url len:' + url);
            window.snap_url = url;
            $('button#enter-personal-details').removeAttr("disabled");
            document.querySelector('img#display_snapped').src = url;

            $();
        });
    }

    function destroy_snapshot() {

        if (CamMaster) {
            //CamMaster.stop_media();
            CamMaster.destroy();
        }
    }

    $("#enroll-page").on("click", "button#snap_picture", function(e) {

        take_snapshot();
    });

    $("#enroll-page").on("click", "button#back-to-snaps-page", function(e) {

        var cameraMe = $("#everything-snaps").detach();
        var Personal_details = $("#person-details").detach();

        cameraMe.appendTo("#enroll-page");
        Personal_details.appendTo("#hiden_reg_inputs");

        DetectCam();
    });


    $("#enroll-page").on("click", "button#enter-personal-details", function(e) {

        destroy_snapshot();
        var cameraMe = $("#everything-snaps").detach();
        var Personal_details = $("#person-details").detach();

        cameraMe.appendTo("#hiden_reg_inputs");
        Personal_details.appendTo("#enroll-page");
    });

    if ($(document).find('.datetimepicker4').length > 0) {
        $('.datetimepicker4').datetimepicker({
            format: 'DD/MM/YYYY'
        });
    }


    function onChangeFile(event, element) {
        var file = event.target.files[0];
        var reader = new FileReader();
        element.parents(".card").find("input[id='hold-file']").val(file.name);
        //console.log(event.target);
        // reader.onload = function(event) {
        //   // The file's text will be printed here
        //   console.log(event.target);
        // };

        //reader.readAsText(file);
    }

    $("body").on("change", "input[name='degree-document']", function(e) {

        onChangeFile(e, $(this));
    });



    $("body").on("click", "span.spin-up-file", function(e) {
        console.log($(this).parents(".card").children("input[name='degree-document']"));
        $(this).parents(".card").find("input[name='degree-document']").trigger("click");
    });


    $("body").on("click", "button#forward-to-academia", function(e) {
        e.preventDefault();
        //destroy_snapshot();
        var Academia = $("#academia-details").detach();
        var Personal_details = $("#person-details").detach();

        Personal_details.appendTo("#hiden_reg_inputs");
        Academia.appendTo("#enroll-page");
    });

    $("body").on("click", "button#back-to-personal", function(e) {
        e.preventDefault();
        //destroy_snapshot();
        var Academia = $("#academia-details").detach();
        var Personal_details = $("#person-details").detach();

        Academia.appendTo("#hiden_reg_inputs");
        Personal_details.appendTo("#enroll-page");
    });


     $("body").on("click", "button#forward-to-work_information", function(e) {
        e.preventDefault();
        //destroy_snapshot();
        var WorkInfo = $("#work_information-details").detach();
        var Academia = $("#academia-details").detach();

        Academia.appendTo("#hiden_reg_inputs");
        WorkInfo.appendTo("#enroll-page");
    });


     $("body").on("click", "button#back-to-academia", function(e) {
        e.preventDefault();
        var WorkInfo = $("#work_information-details").detach();
        var Academia = $("#academia-details").detach();

        WorkInfo.appendTo("#hiden_reg_inputs");
        Academia.appendTo("#enroll-page");
    });



    window.clonecount = 1;
    var boxWidget = {

        boxWidgetOptions: {
            boxWidgetIcons: {
                //Collapse icon
                collapse: 'fa-minus',
                //Open icon
                open: 'fa-plus',
                //Remove icon
                remove: 'fa-times'
            },
            boxWidgetSelectors: {
                //Remove button selector
                remove: '[data-widget="remove"]',
                //Collapse button selector
                collapse: '[data-widget="collapse"]',

                //clone this element 
                clone: '[data-widget="clone"]'
            }
        },
        selectors: {
            //Remove button selector
            remove: '[data-widget="remove"]',
            //Collapse button selector
            collapse: '[data-widget="collapse"]',

            //clone this element 
            clone: '[data-widget="clone"]'
        },
        icons: {
            //Collapse icon
            collapse: 'fa-minus',
            //Open icon
            open: 'fa-plus',
            //Remove icon
            remove: 'fa-times'
        },
        animationSpeed: 500,
        activate: function(_box) {
            var _this = this;
            if (!_box) {
                _box = document; // activate all boxes per default
            }
            //Listen for collapse event triggers
            $(_box).on('click', _this.selectors.collapse, function(e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            $(_box).on('click', _this.selectors.remove, function(e) {
                e.preventDefault();
                _this.remove($(this));
            });

            //Listen for clone or coppy  event triggers
            $(_box).on('click', _this.selectors.clone, function(e) {
                e.preventDefault(); //Written By me
                _this.clone($(this));
            });
        },
        collapse: function(element) {
            var _this = this;
            //Find the box parent
            var box = element.parents(".box").first();
            //Find the body and the footer
            var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
            if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                element.children(":first")
                    .removeClass(_this.icons.collapse)
                    .addClass(_this.icons.open);
                //Hide the content
                box_content.slideUp(_this.animationSpeed, function() {
                    box.addClass("collapsed-box");
                });
            } else {
                //Convert plus into minus
                element.children(":first")
                    .removeClass(_this.icons.open)
                    .addClass(_this.icons.collapse);
                //Show the content
                box_content.slideDown(_this.animationSpeed, function() {
                    box.removeClass("collapsed-box");
                });
            }
        },
        remove: function(element) {
            //Find the box parent
            var box = element.parents(".card").first(); //Edit me 
            if (window.clonecount == 1) {
                alert("You cannot delete all elements");
                return false;
            }
            //Decrement if a clone is removed
            window.clonecount--;
            var formerbox = box.prev('.card');
            formerbox.find('[data-widget="clone"]').removeClass('hide');
            formerbox.find('#buttons-section').removeClass('hide');
            if (window.clonecount > 1) {

                formerbox.find('[data-widget="remove"]').removeClass('hide');

            }
            //console.log('New Clone count--'+ window.clonecount);
            box.slideUp(this.animationSpeed).remove();
        },

        clone: function(element) {
            //Find the box parent
            var box = element.parents(".card").first(); //Edit me
            //This variable is initalized in the appscript.js file to be 1.
            //We increment it if a clone is created and 
            //Decrement if a clone is removed
            window.clonecount++;
            var changed = window.clonecount - 1;
            // console.log('Clone count--'+ window.clonecount+"..changed "+ changed);
            var newclone = box.clone(true, true); //Clone the box with event and data of children


            newclone.removeClass('clone' + changed) //Remove current clone class
                .addClass("clone" + window.clonecount)
                .find("input").val(""); //clear all inputs

            newclone.find('[data-widget="remove"]').removeClass('hide');
            newclone.find('.card-header h4').addClass('hide');

            //Show the buttton group of search on the new slide
            newclone.find('#buttons-section').removeClass('hide');




            //hide the search button on the former
            box.find('#buttons-section').addClass('hide');

            //Remove the clone button from the former
            box.find('[data-widget="clone"]').addClass('hide');

            //Only the latest clone can be removed
            box.find('[data-widget="remove"]').addClass('hide');


            //This inserts the element after the previous box
            newclone.insertAfter(box).fadeIn(this.animationSpeed);
        }
    };
    //Activeate the Box/ Form widget holder
    boxWidget.activate();


})(jQuery);
$(document).ready(function() {


    //LOGIN OPTIONS WHEN YOU PRESS THE USER BUTTON
    $('.login-options').on('click',function() {

        if( $('.username-input').hasClass('invisible')) {
            $(this).text('old user?');

            $('.username-input').val('');
            $('.email-input').val('');
            $('.password-input').val('');

            $('.loginform').attr('action','/register');
            $('.login-button').attr('value','register');
            $('.email-input').val('');
            $('.email-input').addClass('email-registration');
            $('.username-input').removeClass('invisible');
            $('.invalid').addClass('invisible');
        } else {
            $(this).text('new user?');

            $('.email-input').val('');
            $('.password-input').val('');

            $('.loginform').attr('action','/login');
            $('.email-input').removeClass('email-registration');
            
            $('.login-button').attr('value','connect');
            $('.username-input').addClass('invisible');
        }
    });
    
    ///////////////////////////////////////////


    //STOP FORM & USE AJAX. LOGIN + SIGNUP
    $("#myform").submit(function(e) {
        e.preventDefault();

        var usernameInput   = validator.trim($('.username-input').val());
        var emailInput      = validator.trim($('.email-input').val());
        var passwordInput   = validator.trim($('.password-input').val());
        

        if( $('.login-button').val() == 'connect' ) {

            if( validator.isEmpty(emailInput) || validator.isEmpty(passwordInput) ) {
                alert('form is not filled completely! try again');
            } else {

                $.post('/checkExistence', { username: usernameInput, email: emailInput, password: passwordInput }, function (result) {

                    if( jQuery.isEmptyObject(result) ) {
                        alert('invalid credentials! try again');
                    } else {
                        console.log(result);
                        window.location.href = "/home";
                    }
                    
                });


            }
            


        } else if( $('.login-button').val() == 'register' ) {

            $.post('/checkExistence', { username: usernameInput, email: emailInput, password: passwordInput }, function (result) {

                if( validator.isEmpty(usernameInput) || validator.isEmpty(emailInput) || validator.isEmpty(passwordInput) ) {
                    alert('form is not filled completely! try completing sign up first');
                } else {
                    if( result.username == usernameInput ) {
                        alert('someone has that username!');
                    } else if( result.email == emailInput ) {
                        alert('email exists already!');
                    } else {
                        var isValidLength = validator.isLength(passwordInput, {min: 8});

                        if(isValidLength) {
                            $.post('/createUser', { username: usernameInput, email: emailInput, password: passwordInput }, function(result) {
                                window.location.href = "/home";
                            });
                        } else {
                            alert('password requires a minimum of 8 characters!');
                        }
                        
                    }
                }
                
            });

        }
    });
    /////////////////


    //BACKGROUND IMAGES ROTATING
    function rotateImages() {
        var backgroundImageArr = document.getElementsByClassName("background-image");
        var randNumb = Math.floor(Math.random() * backgroundImageArr.length);
        if(backgroundImageArr[randNumb].classList.contains("rotating")) {
            backgroundImageArr[randNumb].classList.remove("rotating");
        } else {
            backgroundImageArr[randNumb].classList.add("rotating");
        }
    }

    setInterval(rotateImages,5000);
    ////////////////////////////////

});
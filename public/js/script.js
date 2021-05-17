$(document).ready(function() {


//REGISTRATION VERIFICATION 
    $(document).on('keyup', '.email-registration',function() {
        var emailinput = $(this).val();

        $.get('/checkEmail', {email: emailinput}, function (result) {
            if(result.email == emailinput) {
                alert('Account with that email already exists!');
                $('.email-registration').val('');
        }
        });

    });

    $(document).on('keyup', '.username-input',function() {
        var usernameInput = $(this).val();

        $.get('/checkUsername', {username: usernameInput}, function (result) {
            if(result.username == usernameInput) {
                alert('Account with that username already exists!');
                $('.username-input').val('');
            }
        });

    });
//////////////////////////////////////////////////////////////////

//LOGIN OPTIONS WHEN YOU PRESS THE USER BUTTON
    $('.login-options').on('click',function() {
        if($('.username-input').hasClass('invisible')) {
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

//FOR UPVOTING AND DOWNVOTING POSTS
    $(document).on('click','.fish',function() {
        var postID = $(this).closest('.postbox').attr('id');
        if(postID == null) {
            postID = $(this).closest('.selected-postbox ').attr('id');
        }

        var type = 'none';
        var counterString = $(this).siblings('.upvote-count').text();
        var counterInt = parseInt(counterString);

        if($(this).siblings('.fishbone').hasClass('downvoted')) {
            $(this).siblings('.fishbone').removeClass('downvoted');
            $(this).addClass('upvoted');
            $(this).siblings('.upvote-count').text(counterInt+2);
            type = 'upvote';
        } else if($(this).hasClass('upvoted')) {
            $(this).removeClass('upvoted');
            $(this).siblings('.upvote-count').text(counterInt-1);
            type = 'none';
        } else {
            $(this).addClass('upvoted');
            $(this).siblings('.upvote-count').text(counterInt+1);
            type = 'upvote';
        }

        counterString = $(this).siblings('.upvote-count').text();
        var upvoteOwner = $('.profile-link').attr('id');
        
        // alert(postID); //debugging purposes
        $.post('/postCountUpdate', {postID: postID, counterString: counterString, upvoteOwner: upvoteOwner, type: type});

    });

    $(document).on('click','.fishbone',function() {
        var postID = $(this).closest('.postbox').attr('id');
        if(postID == null) {
            postID = $(this).closest('.selected-postbox ').attr('id');
        }

        var type = 'none';
        var counterString = $(this).siblings('.upvote-count').text();
        var counterInt = parseInt(counterString);

        if($(this).siblings('.fish').hasClass('upvoted')) {
            $(this).siblings('.fish').removeClass('upvoted');
            $(this).addClass('downvoted');
            $(this).siblings('.upvote-count').text(counterInt-2);
            type = 'downvote';
        } else if($(this).hasClass('downvoted')) {
            $(this).removeClass('downvoted');
            $(this).siblings('.upvote-count').text(counterInt+1);
            type = 'none';
        } else {
            $(this).addClass('downvoted');
            $(this).siblings('.upvote-count').text(counterInt-1);
            type = 'downvote';
        }

        counterString = $(this).siblings('.upvote-count').text();
        var upvoteOwner = $('.profile-link').attr('id');
        
        // alert(postID); //debugging purposes
        $.post('/postCountUpdate', {postID: postID, counterString: counterString, upvoteOwner: upvoteOwner, type: type});
    });
//////////////////////////////////////////////


//FOR UPVOTING AND DOWNVOTING COMMENTS
    $(document).on('click','.comment-fish',function() {
        var commentID = $(this).closest('.commentbox').attr('id');

        var type = 'none';
        var counterString = $(this).siblings('.upvote-count').text();
        var counterInt = parseInt(counterString);

        if($(this).siblings('.comment-fishbone').hasClass('downvoted')) {
            $(this).siblings('.comment-fishbone').removeClass('downvoted');
            $(this).addClass('upvoted');
            $(this).siblings('.upvote-count').text(counterInt+2);
            type = 'upvote';
        } else if($(this).hasClass('upvoted')) {
            $(this).removeClass('upvoted');
            $(this).siblings('.upvote-count').text(counterInt-1);
            type = 'none';
        } else {
            $(this).addClass('upvoted');
            $(this).siblings('.upvote-count').text(counterInt+1);
            type = 'upvote';
        }

        counterString = $(this).siblings('.upvote-count').text();
        var upvoteOwner = $('.profile-link').attr('id');
        
        // alert(postID); //debugging purposes
        $.post('/commentCountUpdate', {commentID: commentID, counterString: counterString, upvoteOwner: upvoteOwner, type: type});
    });

    $(document).on('click','.comment-fishbone',function() {
        var commentID = $(this).closest('.commentbox').attr('id');

        var type = 'none';
        var counterString = $(this).siblings('.upvote-count').text();
        var counterInt = parseInt(counterString);

        if($(this).siblings('.comment-fish').hasClass('upvoted')) {
            $(this).siblings('.comment-fish').removeClass('upvoted');
            $(this).addClass('downvoted');
            $(this).siblings('.upvote-count').text(counterInt-2);
            type = 'downvote';
        } else if($(this).hasClass('downvoted')) {
            $(this).removeClass('downvoted');
            $(this).siblings('.upvote-count').text(counterInt+1);
            type = 'none';
        } else {
            $(this).addClass('downvoted');
            $(this).siblings('.upvote-count').text(counterInt-1);
            type = 'downvote';
        }

        counterString = $(this).siblings('.upvote-count').text();
        var upvoteOwner = $('.profile-link').attr('id');
        
        // alert(postID); //debugging purposes
        $.post('/commentCountUpdate', {commentID: commentID, counterString: counterString, upvoteOwner: upvoteOwner, type: type});
    });
//////////////////////////////////////////////

//ON FOCUS ENLARGEMENT FEATURE
    $('.postingbox-text').on('click',function() {
        $(this).addClass('postingbox-text-focused');
        $(this).parents('.postingbox').addClass('postingbox-focused');
        $(this).siblings('.upload-button').css('display','inline-block');
        $(this).siblings('.submit-button').css('display','inline-block');
    });
/////////////////////////////////////////////////

//CREATING POSTS
    $('.submit-button').on('click',function() {
        var caption = $('.postingbox-text').val();
        $('.postingbox-text').val('');
        var filenameUncleaned = $('.upload-button').val();
        $('.upload-button').val('');
        var filename = filenameUncleaned.replace(/^C:\\fakepath\\/, "/images/catdatabase/");

        $.post('/createPost', {caption: caption, filename: filename}, function ( {createdPostDetails, postOwnerDetails} ) {
            // alert(createdPostDetails.caption); //debugging purposes only
            // alert(postOwnerDetails.username);

            var postboxDiv = document.createElement('div');
            postboxDiv.setAttribute('class','postbox owned');
            postboxDiv.setAttribute('id',createdPostDetails._id);

                var voteColumnDiv = document.createElement('div');
                voteColumnDiv.setAttribute('class','vote-column');

                    var fishDiv = document.createElement('div');
                    fishDiv.setAttribute('class','fish');
                    voteColumnDiv.append(fishDiv);

                    var upvoteCountDiv = document.createElement('div');
                    upvoteCountDiv.setAttribute('class','upvote-count');
                    upvoteCountDiv.append(createdPostDetails.likes);
                    voteColumnDiv.append(upvoteCountDiv);

                    var fishboneDiv = document.createElement('div');
                    fishboneDiv.setAttribute('class','fishbone');

                voteColumnDiv.append(fishboneDiv);

            postboxDiv.append(voteColumnDiv);

                var photoColumnDiv = document.createElement('div');
                photoColumnDiv.setAttribute('class','photo-column');

                    var imgLinkA = document.createElement('a');
                    imgLinkA.setAttribute('href','/post/'+createdPostDetails._id);
                    
                        var postImageImg = document.createElement('img');
                        postImageImg.setAttribute('class','post-image');
                        postImageImg.setAttribute('src',createdPostDetails.imgurl);

                    imgLinkA.append(postImageImg);

                photoColumnDiv.append(imgLinkA);

            postboxDiv.append(photoColumnDiv);

                var infoColumnDiv = document.createElement('div');
                infoColumnDiv.setAttribute('class','info-column');

                    var infoHeaderDiv = document.createElement('div');
                    infoHeaderDiv.setAttribute('class','info-header'); 

                        var posterLinkA = document.createElement('a');
                        posterLinkA.setAttribute('class','poster-link'); 
                        posterLinkA.setAttribute('href','/user/'+postOwnerDetails.username);

                            var postProfilePicImg = document.createElement('img');
                            postProfilePicImg.setAttribute('class','post-profilepic'); 
                            postProfilePicImg.setAttribute('src',postOwnerDetails.profileimg); 

                        posterLinkA.append(postProfilePicImg);
        
                    infoHeaderDiv.append(posterLinkA);

                        var posterInfoDiv = document.createElement('div');
                        posterInfoDiv.setAttribute('class','poster-info');

                            posterLinkA = document.createElement('a');
                            posterLinkA.setAttribute('class','poster-link');
                            posterLinkA.setAttribute('href','/user/'+postOwnerDetails.username);

                                var postOwnerDiv = document.createElement('div');
                                postOwnerDiv.setAttribute('class','post-owner');
                                postOwnerDiv.append(postOwnerDetails.username);
                                
                            posterLinkA.append(postOwnerDiv);

                        posterInfoDiv.append(posterLinkA);

                            var postLocationDiv = document.createElement('div');
                            postLocationDiv.setAttribute('class','post-location');

                                posterLinkA = document.createElement('a');
                                posterLinkA.setAttribute('class','poster-link');
                                posterLinkA.setAttribute('href','/user/'+postOwnerDetails.username);
                            
                            postLocationDiv.append(posterLinkA);

                                locationLinkA = document.createElement('a');
                                locationLinkA.setAttribute('href','#location');
                                locationLinkA.append(createdPostDetails.location);

                            postLocationDiv.append(locationLinkA);

                        posterInfoDiv.append(postLocationDiv);

                    infoHeaderDiv.append(posterInfoDiv);
                
                infoColumnDiv.append(infoHeaderDiv);

                    var infoBodyDiv = document.createElement('div');
                    infoBodyDiv.setAttribute('class','info-body');

                        var postTextSpan = document.createElement('span');
                        postTextSpan.setAttribute('class','post-text');

                            var captionP = document.createElement('p');
                            captionP.append(createdPostDetails.caption);

                        postTextSpan.append(captionP);
                    infoBodyDiv.append(postTextSpan);

                infoColumnDiv.append(infoBodyDiv);

                    var infoFooterDiv = document.createElement('div');
                    infoFooterDiv.setAttribute('class','info-footer');

                        var postHR = document.createElement('hr');
                        postHR.setAttribute('class','post-hr');

                    infoFooterDiv.append(postHR);

                        var footerContentSpan = document.createElement('span');
                        footerContentSpan.setAttribute('class','footer-content');

                            footer1Span = document.createElement('span');
                            footer1Span.setAttribute('class','footer-1');

                                var saveA = document.createElement('a');
                                saveA.setAttribute('href','/post/'+createdPostDetails._id);
                                saveA.append('comments');

                            footer1Span.append(saveA);
                        footerContentSpan.append(footer1Span);
                        footerContentSpan.append(' | ');

                            var footer2Span = document.createElement('span');
                            footer2Span.setAttribute('class','footer-2');

                                var reportA = document.createElement('a');
                                reportA.setAttribute('href','/edit/'+createdPostDetails._id);
                                reportA.append('edit');

                            footer2Span.append(reportA);
                                         
                        footerContentSpan.append(footer2Span);
                        footerContentSpan.append(' | ');
                        
                            var footer3Span = document.createElement('span');
                            footer3Span.setAttribute('class','footer-3');

                                var optionsA = document.createElement('a');
                                optionsA.setAttribute('href','#delete'+createdPostDetails._id);
                                optionsA.append('delete');
                            footer3Span.append(optionsA);
                        footerContentSpan.append(footer3Span);
                    infoFooterDiv.append(footerContentSpan);
                infoColumnDiv.append(infoFooterDiv);


            postboxDiv.append(infoColumnDiv);
            $('.postlist').prepend(postboxDiv);

            $('.postingbox').removeClass('postingbox-focused');
            $('.postingbox-text').removeClass('postingbox-text-focused');
            $('.upload-button').css('display','none');
            $('.submit-button').css('display','none');
        });

    });
//////////////////////////////////////////

//CREATING COMMENTS
    $('.comment-submit-button').on('click',function() {
        var content = $('.commentingbox-text').val();
        $('.commentingbox-text').val('');

        var postparent = $('.selected-postbox').attr('id');

        // alert(comment+' and '+postParentID);

        $.post('/createComment', {content: content, postparent: postparent}, function ( {createdCommentDetails, commentOwnerDetails} ) {
            //alert(createdCommentDetails.content+' '+commentOwnerDetails.username); //debugging purposes only

            var commentboxDiv = document.createElement('div');
            commentboxDiv.setAttribute('class','commentbox');
            commentboxDiv.setAttribute('id',createdCommentDetails._id);

                var commentVoteColumnDiv = document.createElement('div');
                commentVoteColumnDiv.setAttribute('class','comment-vote-column');

                    var fishDiv = document.createElement('div');
                    fishDiv.setAttribute('class','comment-fish');
                
                commentVoteColumnDiv.append(fishDiv);

                    var upvoteCountDiv = document.createElement('div');
                    upvoteCountDiv.setAttribute('class','upvote-count');
                    upvoteCountDiv.append(createdCommentDetails.likes);
                
                commentVoteColumnDiv.append(upvoteCountDiv);

                    var fishboneDiv = document.createElement('div');
                    fishboneDiv.setAttribute('class','comment-fishbone');
                
                commentVoteColumnDiv.append(fishboneDiv);

            commentboxDiv.append(commentVoteColumnDiv);

                var commentColumnDiv = document.createElement('div');
                commentColumnDiv.setAttribute('class','comment-column');
                    var commentHeaderDiv = document.createElement('div');
                    commentHeaderDiv.setAttribute('class','comment-header');
                        var posterLinkA = document.createElement('a');
                        posterLinkA.setAttribute('class','poster-link');
                        posterLinkA.setAttribute('href','/user/'+createdCommentDetails.owner);
                            var commentInfoDiv = document.createElement('div'); //here
                            commentInfoDiv.setAttribute('class','comment-info');
                                var commentOwnerDiv = document.createElement('div');
                                commentOwnerDiv.setAttribute('class','comment-owner');
                                commentOwnerDiv.append(createdCommentDetails.owner);
                            commentInfoDiv.append(commentOwnerDiv);
                        posterLinkA.append(commentInfoDiv); //here
                    commentHeaderDiv.append(posterLinkA);
                commentColumnDiv.append(commentHeaderDiv);

                    var commentBodyDiv = document.createElement('div');
                    commentBodyDiv.setAttribute('class','comment-body');
                        var commentTextSpan = document.createElement('span');
                        commentTextSpan.setAttribute('class','comment-text');
                            var pElement = document.createElement('p');
                            pElement.append(createdCommentDetails.content);
                        commentTextSpan.append(pElement);
                    commentBodyDiv.append(commentTextSpan);
                commentColumnDiv.append(commentBodyDiv);


                    var commentFooterDiv = document.createElement('div');
                    commentFooterDiv.setAttribute('class','comment-footer');
                        var postHR = document.createElement('hr');
                        postHR.setAttribute('class','post-hr');
                    commentFooterDiv.append(postHR);
                        var commentFooterContentSpan = document.createElement('span');
                        commentFooterContentSpan.setAttribute('class','comment-footer-content');

                            var commentFooter2Span = document.createElement('span');
                            commentFooter2Span.setAttribute('class','comment-footer-2');
                                var saveA = document.createElement('a');
                                saveA.setAttribute('href','/edit/comment/'+createdCommentDetails._id);
                                saveA.append('edit ');
                            commentFooter2Span.append(saveA);
                            commentFooter2Span.append(' | ');
                        commentFooterContentSpan.append(commentFooter2Span);

                            var commentFooter3Span = document.createElement('span');
                            commentFooter3Span.setAttribute('class','comment-footer-3');
                                var reportA = document.createElement('a');
                                reportA.setAttribute('href','#delete/'+createdCommentDetails._id);
                                reportA.append(' delete ');
                            commentFooter3Span.append(reportA);
                        commentFooterContentSpan.append(commentFooter3Span);

                    commentFooterDiv.append(commentFooterContentSpan)
                commentColumnDiv.append(commentFooterDiv);

            commentboxDiv.append(commentColumnDiv);


            $('.postwall').append(commentboxDiv);


        });

    });
////////////////////////////////////////

    //DELETE POST
    $(document).on('click','.footer-3',function() {
        var footer3 = $(this).text();
        if(footer3=='delete') {
            var postID = $(this).closest('.postbox').attr('id');
            $(this).closest('.postbox').remove();

            $.post('/deletePost', {postID: postID});
            alert('post has been deleted!');
            
        } else if(footer3=='share') {
            alert('sharing...'); //future feature?
        } else {
            alert('reporting...');  //future feature?
        }
    });

    //DELETE POST AT SELECTED PAGE
    $(document).on('click','.selected-footer-2',function() {
        var selectedFooter2 = $(this).text();
        if(selectedFooter2=='delete') {
            var postID = $(this).closest('.selected-postbox').attr('id');
    
            $.post('/deletePost', {postID: postID});
            alert('this post has been deleted!');
            window.location.replace("/home");
            
        } else {
            //additional features one day
        }
    });

    //DELETE COMMENTS
    $(document).on('click','.comment-footer-3',function() {
        var commentID = $(this).closest('.commentbox').attr('id');
        $(this).closest('.commentbox').remove();

        $.post('/deleteComment', {commentID: commentID});
        alert('this comment has been deleted!');
    });

    //EDIT/////////////////////////////////////////////

    //EDIT POST CANCELED
    $(document).on('click','.editingbox-cancel-button',function() {
        window.location.replace("/home");
    });

    //SETTINGS CANCELED
    $(document).on('click','.update-cancel-button',function() {
        window.location.replace("/home");
    });

    //SETTINGS SUBMITTED
    $(document).on('click','.update-account-button',function() {
        var myID = $('.my-settings').attr('id');
        var newusername = $('#username').val();
        var newemail = $('#email').val();
        var newpassword = $('#password').val();
        var newbio = $('#bio').val();
        var newprofileimgUncleaned = $('#profilepic').val();
        var newprofileimg = newprofileimgUncleaned.replace(/^C:\\fakepath\\/, "/images/profiledatabase/");

        var entry = {
            newusername: newusername,
            newemail: newemail,
            newpassword: newpassword,
            newbio: newbio,
            newprofileimg: newprofileimg,
            myID: myID
        };

        $.post('/changeSettings', entry);
        alert('settings changed!');
        window.location.replace("/settings");
    });

    //EDIT POST ACCEPTED
    $(document).on('click','.editingbox-submit-button',function() {
        var postID = $('.selected-postbox').attr('id');
        var newCaption = $('.editingbox-text').val();

        $.post('/editCaption', {postID: postID, newCaption: newCaption});
        alert('caption has been edited!');
        window.location.replace("/home");

    });

    //EDIT COMMENT IS ACCEPTED
    $(document).on('click','.comment-editingbox-submit-button',function() {
        var commentID = $('.commentbox').attr('id');
        var backSession = $('.comment-editingbox-cancel-button').attr('id');
        var newContent = $('.editingbox-text').val();

        $.post('/editComment', {commentID: commentID, newContent: newContent});
        alert('comment has been edited!');
        window.location.replace("/post/"+backSession);

    });

    //LOGOUT
    $(document).on('click','.logout-button',function() {
        alert('good bye!');
        window.location.replace("/");
    });


    //rotating image
    function rotateImage() {
        var backgroundImageArr = document.getElementsByClassName("background-image");
        var randNumb = Math.floor(Math.random() * backgroundImageArr.length);
        if(backgroundImageArr[randNumb].classList.contains("rotating")) {
            backgroundImageArr[randNumb].classList.remove("rotating");
        } else {
            backgroundImageArr[randNumb].classList.add("rotating");
        }
    }

    setInterval(rotateImage,5000);
    //////////

});
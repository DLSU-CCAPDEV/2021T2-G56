$(document).ready(function() {


//POSTBOX ENLARGES WHEN FOCUSED ON
    $('.postingbox-text').on('click',function() {
        $(this).addClass('postingbox-text-focused');
        $(this).parents('.postingbox').addClass('postingbox-focused');
        $(this).siblings('.upload-button').css('display','inline-block');
        $(this).siblings('.submit-button').css('display','inline-block');
    });
/////////////////////////////////////////////////

function createPost(postdetails) {
    var postboxDiv = document.createElement('div');
    postboxDiv.setAttribute('class','postbox owned');
    postboxDiv.setAttribute('id',postdetails.postid);
        var voteColumnDiv = document.createElement('div');
        voteColumnDiv.setAttribute('class','vote-column');
            var fishDiv = document.createElement('div');
            fishDiv.setAttribute('class','fish');
        voteColumnDiv.append(fishDiv);
            var upvoteCountDiv = document.createElement('div');
            upvoteCountDiv.setAttribute('class','upvote-count');
            upvoteCountDiv.append(postdetails.upvotecount);
        voteColumnDiv.append(upvoteCountDiv);
            var fishboneDiv = document.createElement('div');
            fishboneDiv.setAttribute('class','fishbone');
        voteColumnDiv.append(fishboneDiv);
    postboxDiv.append(voteColumnDiv);
        var photoColumnDiv = document.createElement('div');
        photoColumnDiv.setAttribute('class','photo-column');
            var imgLinkA = document.createElement('a');
            imgLinkA.setAttribute('href','/post/'+postdetails.postid);
                var postImageImg = document.createElement('img');
                postImageImg.setAttribute('class','post-image');
                // https://drive.google.com/uc?id=[ID HERE]&export=download
                postImageImg.setAttribute('src','https://drive.google.com/uc?id='+postdetails.imgurl+'&export=download');
            imgLinkA.append(postImageImg);
        photoColumnDiv.append(imgLinkA);
    postboxDiv.append(photoColumnDiv);


    $('.postlist').prepend(postboxDiv);
    $('.postingbox').removeClass('postingbox-focused');
    $('.postingbox-text').removeClass('postingbox-text-focused');
    $('.upload-button').css('display','none');
    $('.submit-button').css('display','none');
}

//CREATING A SINGLE POST ON HOME PAGE
    $('.submit-button').on('click',function() {
        var caption = $('.postingbox-text').val();
        var image = $('.upload-button')[0].files[0];

        var formdata = new FormData();
        formdata.append('image',image);

        $.ajax({
            url: '/single',
            data: formdata,
            contentType: false,
            processData: false,
            type: 'POST',
            'success': function(imgurl){
                console.log(imgurl);
                var entry = {
                    caption: caption,
                    imgurl: imgurl
                }

                $.post('/createPost', entry, function (postdetails) {
                    alert('File uploaded successfully!');
                    createPost(postdetails);
                });
                
            }
        });


        $('.postingbox-text').val('');
        $('.upload-button').val('');

    });
//////////////////////////////////////////





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

});
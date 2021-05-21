// https://drive.google.com/uc?id=[ID HERE]&export=download
$(document).ready(function() {


//POSTBOX ENLARGES WHEN FOCUSED ON
    $('.postingbox-text').on('click',function() {
        $(this).addClass('postingbox-text-focused');
        $(this).parents('.postingbox').addClass('postingbox-focused');
        $(this).siblings('.upload-button').css('display','inline-block');
        $(this).siblings('.submit-button').css('display','inline-block');
    });
/////////////////////////////////////////////////

//CREATING A SINGLE POST ON HOME PAGE
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
                upvoteCountDiv.append('0');
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
                    postImageImg.setAttribute('src','https://drive.google.com/uc?id='+postdetails.imgurl+'&export=download');
                imgLinkA.append(postImageImg);
            photoColumnDiv.append(imgLinkA);
        postboxDiv.append(photoColumnDiv);
            var infoColumnDiv = document.createElement('div');
            infoColumnDiv.setAttribute('class','info-column');
                var infoHeaderDiv = document.createElement('div');
                infoHeaderDiv.setAttribute('class','info-header');
                    var posterLinkA = document.createElement('a');
                    posterLinkA.setAttribute('class','poster-link'); 
                    posterLinkA.setAttribute('href','/user/'+postdetails.ownerusername);
                        var postProfilePicImg = document.createElement('img');
                        postProfilePicImg.setAttribute('class','post-profilepic'); 
                        postProfilePicImg.setAttribute('src','https://drive.google.com/uc?id='+postdetails.profileimg+'&export=download'); 
                    posterLinkA.append(postProfilePicImg);
                infoHeaderDiv.append(posterLinkA);
                    var posterInfoDiv = document.createElement('div');
                    posterInfoDiv.setAttribute('class','poster-info');
                        posterLinkA = document.createElement('a');
                        posterLinkA.setAttribute('class','poster-link');
                        posterLinkA.setAttribute('href','/user/'+postdetails.ownerusername);
                            var postOwnerDiv = document.createElement('div');
                            postOwnerDiv.setAttribute('class','post-owner');
                            postOwnerDiv.append(postdetails.ownerusername);
                        posterLinkA.append(postOwnerDiv);
                    posterInfoDiv.append(posterLinkA);
                        var postLocationDiv = document.createElement('div');
                        postLocationDiv.setAttribute('class','post-location');
                            posterLinkA = document.createElement('a');
                            posterLinkA.setAttribute('class','poster-link');
                            posterLinkA.setAttribute('href','/user/'+postdetails.ownerusername);
                        postLocationDiv.append(posterLinkA);
                            locationLinkA = document.createElement('a');
                            locationLinkA.setAttribute('href','#location');
                            locationLinkA.append(postdetails.postlocation);
                        postLocationDiv.append(locationLinkA);
                    posterInfoDiv.append(postLocationDiv);
                infoHeaderDiv.append(posterInfoDiv);
            infoColumnDiv.append(infoHeaderDiv);
                var infoBodyDiv = document.createElement('div');
                infoBodyDiv.setAttribute('class','info-body');
                    var postTextSpan = document.createElement('span');
                    postTextSpan.setAttribute('class','post-text');
                        var captionP = document.createElement('p');
                        captionP.append(postdetails.postcaption);
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
                            saveA.setAttribute('href','/post/'+postdetails.postid);
                            saveA.append('comments');
                        footer1Span.append(saveA);
                    footerContentSpan.append(footer1Span);
                    footerContentSpan.append(' | ');
                        var footer2Span = document.createElement('span');
                        footer2Span.setAttribute('class','footer-2');
                            var reportA = document.createElement('a');
                            reportA.setAttribute('href','/edit/post/'+postdetails.postid);
                            reportA.append('edit');
                        footer2Span.append(reportA);
                    footerContentSpan.append(footer2Span);
                    footerContentSpan.append(' | ');
                        var footer3Span = document.createElement('span');
                        footer3Span.setAttribute('class','footer-3');
                            var optionsA = document.createElement('a');
                            optionsA.setAttribute('href','#delete'+postdetails.postid);
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
    }
    
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
                    console.log(postdetails);
                    createPost(postdetails);
                });
                
            }
        });


        $('.postingbox-text').val('');
        $('.upload-button').val('');

    });
//////////////////////////////////////////


//FOR UPVOTING POSTS
    $(document).on('click','.fish',function() {
        var postparent = $(this).closest('.postbox').attr('id');
        if(postparent == null) {
            postparent = $(this).closest('.selected-postbox ').attr('id');
        }

        var votetype = 'none';
        var upvotecountString = $(this).siblings('.upvote-count').text();
        var upvotecountInt = parseInt(upvotecountString);

        if($(this).siblings('.fishbone').hasClass('downvoted')) {
            $(this).siblings('.fishbone').removeClass('downvoted');
            $(this).addClass('upvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt+2);
            votetype = 'upvote';
        } else if($(this).hasClass('upvoted')) {
            $(this).removeClass('upvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt-1);
            votetype = 'none';
        } else {
            $(this).addClass('upvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt+1);
            votetype = 'upvote';
        }

        upvotecountString = $(this).siblings('.upvote-count').text();
        upvotecountInt = parseInt(upvotecountString);
        
        $.post('/votePost', {postparent: postparent, upvotecount: upvotecountInt, votetype: votetype});

    });
//////////////////////////////////////////


//FOR DOWNVOTING POSTS
    $(document).on('click','.fishbone',function() {
        var postparent = $(this).closest('.postbox').attr('id');
        if(postparent == null) {
            postparent = $(this).closest('.selected-postbox ').attr('id');
        }

        var votetype = 'none';
        var upvotecountString = $(this).siblings('.upvote-count').text();
        var upvotecountInt = parseInt(upvotecountString);

        if($(this).siblings('.fish').hasClass('upvoted')) {
            $(this).siblings('.fish').removeClass('upvoted');
            $(this).addClass('downvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt-2);
            votetype = 'downvote';
        } else if($(this).hasClass('downvoted')) {
            $(this).removeClass('downvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt+1);
            votetype = 'none';
        } else {
            $(this).addClass('downvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt-1);
            votetype = 'downvote';
        }

        upvotecountString = $(this).siblings('.upvote-count').text();
        upvotecountInt = parseInt(upvotecountString);
        
        $.post('/votePost', {postparent: postparent, upvotecount: upvotecountInt, votetype: votetype});
    });
//////////////////////////////////////////////


//EDIT POST
    $(document).on('click','.footer-2',function() {
        var footer2 = $(this).text();
        if(footer2=='edit') {
            var postid = $(this).closest('.postbox').attr('id');
            $.post('/edit/post', {postid: postid} );
            
        } else if(footer2=='save') {
            //do nothing for now
        } else {
            //do nothing for now
        }
    });
///////////////////////////////


//EDIT POST ACCEPTED
    $(document).on('click','.editingbox-submit-button',function() {
        var postid = $('.selected-postbox').attr('id');
        var postcaption = $('.editingbox-text').val();

        $.post('/editPostConfirm', {postid: postid, postcaption: postcaption} );
        alert('caption has been edited!');
        window.location.replace("/post/"+postid);
    });
//////////////////////////////


//EDIT POST CANCELED
    $(document).on('click','.editingbox-cancel-button',function() {
        var postid = $('.selected-postbox').attr('id');
        window.location.replace("/post/"+postid);
    });
///////////////////////////////


//DELETE POST
    $(document).on('click','.footer-3',function() {
        var footer3 = $(this).text();
        if(footer3=='delete') {
            var postid = $(this).closest('.postbox').attr('id');

            $.post('/deletePost', {postid: postid} );
            alert('post has been deleted!');
            $(this).closest('.postbox').remove();
            
        } else if(footer3=='share') {
            alert('sharing...'); //future feature?
        } else {
            alert('reporting...');  //future feature?
        }
    });
///////////////////////////////


//DELETE POST ON A FOCUSED POST PAGE 
    $(document).on('click','.selected-footer-2',function() {
        var selectedFooter2 = $(this).text();
        if(selectedFooter2=='delete') {
            var postid = $(this).closest('.selected-postbox').attr('id');
    
            $.post('/deletePost', {postid: postid} );
            alert('this post has been deleted!');
            window.location.replace("/");
        } else {
            //additional features one day
        }
    });

// CREATING COMMENTS
    function createComment(commentdetails) {
        var commentboxDiv = document.createElement('div');
            commentboxDiv.setAttribute('class','commentbox');
            commentboxDiv.setAttribute('id',commentdetails.commentid);
                var commentVoteColumnDiv = document.createElement('div');
                commentVoteColumnDiv.setAttribute('class','comment-vote-column');
                    var fishDiv = document.createElement('div');
                    fishDiv.setAttribute('class','comment-fish');
                commentVoteColumnDiv.append(fishDiv);
                    var upvoteCountDiv = document.createElement('div');
                    upvoteCountDiv.setAttribute('class','upvote-count');
                    upvoteCountDiv.append(commentdetails.upvotecount);
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
                        posterLinkA.setAttribute('href','/user/'+commentdetails.ownerusername);
                            var commentInfoDiv = document.createElement('div');
                            commentInfoDiv.setAttribute('class','comment-info');
                                var commentOwnerDiv = document.createElement('div');
                                commentOwnerDiv.setAttribute('class','comment-owner');
                                commentOwnerDiv.append(commentdetails.ownerusername);
                            commentInfoDiv.append(commentOwnerDiv);
                        posterLinkA.append(commentInfoDiv);
                    commentHeaderDiv.append(posterLinkA);
                commentColumnDiv.append(commentHeaderDiv);
                    var commentBodyDiv = document.createElement('div');
                    commentBodyDiv.setAttribute('class','comment-body');
                        var commentTextSpan = document.createElement('span');
                        commentTextSpan.setAttribute('class','comment-text');
                            var pElement = document.createElement('p');
                            pElement.append(commentdetails.commentcaption);
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
                                saveA.setAttribute('href','/edit/comment/'+commentdetails.commentid);
                                saveA.append('edit ');
                            commentFooter2Span.append(saveA);
                            commentFooter2Span.append(' | ');
                        commentFooterContentSpan.append(commentFooter2Span);
                            var commentFooter3Span = document.createElement('span');
                            commentFooter3Span.setAttribute('class','comment-footer-3');
                                var reportA = document.createElement('a');
                                reportA.setAttribute('href','#delete/'+commentdetails.commentid);
                                reportA.append(' delete ');
                            commentFooter3Span.append(reportA);
                        commentFooterContentSpan.append(commentFooter3Span);
                    commentFooterDiv.append(commentFooterContentSpan)
                commentColumnDiv.append(commentFooterDiv);
            commentboxDiv.append(commentColumnDiv);
            $('.postwall').append(commentboxDiv);
    }

    $('.comment-submit-button').on('click',function() {
        var commentcaption = $('.commentingbox-text').val();
        $('.commentingbox-text').val('');
        var postparent = $('.selected-postbox').attr('id');

        console.log('hi');

        $.post('/createComment', {commentcaption: commentcaption, postparent: postparent}, function (result) {
            createComment(result);
        });
        

    });
////////////////////////////////////////


//DELETE COMMENTS
    $(document).on('click','.comment-footer-3',function() {
        var commentid = $(this).closest('.commentbox').attr('id');

        $.post('/deleteComment', {commentid: commentid} );
        alert('this comment has been deleted!');
        $(this).closest('.commentbox').remove();
    });
///////////////////////////////////


//FOR UPVOTING COMMENTS
    $(document).on('click','.comment-fish',function() {
        var commentparent = $(this).closest('.commentbox').attr('id');

        var votetype = 'none';
        var upvotecountString = $(this).siblings('.upvote-count').text();
        var upvotecountInt = parseInt(upvotecountString);

        if($(this).siblings('.comment-fishbone').hasClass('downvoted')) {
            $(this).siblings('.comment-fishbone').removeClass('downvoted');
            $(this).addClass('upvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt+2);
            votetype = 'upvote';
        } else if($(this).hasClass('upvoted')) {
            $(this).removeClass('upvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt-1);
            votetype = 'none';
        } else {
            $(this).addClass('upvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt+1);
            votetype = 'upvote';
        }

        upvotecountString = $(this).siblings('.upvote-count').text();
        upvotecountInt = parseInt(upvotecountString);
        
        $.post('/voteComment', {commentparent: commentparent, upvotecount: upvotecountInt, votetype: votetype});
    });
////////////////////////////////////////


//FOR DOWNVOTING COMMENTS
    $(document).on('click','.comment-fishbone',function() {
        var commentparent = $(this).closest('.commentbox').attr('id');

        var votetype = 'none';
        var upvotecountString = $(this).siblings('.upvote-count').text();
        var upvotecountInt = parseInt(upvotecountString);

        if($(this).siblings('.comment-fish').hasClass('upvoted')) {
            $(this).siblings('.comment-fish').removeClass('upvoted');
            $(this).addClass('downvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt-2);
            votetype = 'downvote';
        } else if($(this).hasClass('downvoted')) {
            $(this).removeClass('downvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt+1);
            votetype = 'none';
        } else {
            $(this).addClass('downvoted');
            $(this).siblings('.upvote-count').text(upvotecountInt-1);
            votetype = 'downvote';
        }

        upvotecountString = $(this).siblings('.upvote-count').text();
        upvotecountInt = parseInt(upvotecountString);
        
        $.post('/voteComment', {commentparent: commentparent, upvotecount: upvotecountInt, votetype: votetype});
    });
//////////////////////////////////////////////


//EDIT COMMENT IS ACCEPTED
    $(document).on('click','.comment-editingbox-submit-button',function() {
        var commentid = $('.commentbox').attr('id');
        var postid = $('.comment-editingbox-cancel-button').attr('id');
        var commentcaption = $('.editingbox-text').val();

        $.post('/editCommentConfirm', {commentid: commentid, commentcaption: commentcaption} );
        alert('comment has been edited!');
        window.location.replace("/post/"+postid);

    });
//////////////////////////////////////////////

//EDIT COMMENT IS CANCELED
    $(document).on('click','.comment-editingbox-cancel-button',function() {
        var postid = $('.comment-editingbox-cancel-button').attr('id');
        window.location.replace("/post/"+postid);

    });
//////////////////////////////////////////////


//SETTINGS SUBMITTED
    $(document).on('click','.update-account-button',function() {
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var bio = $('#bio').val();
        var profileimg = $('#profilepic')[0].files[0];

        var formdata = new FormData();
        formdata.append('image',profileimg);

        if( !jQuery.isEmptyObject( profileimg ) ) {
            $.ajax({
                url: '/singleprofile',
                data: formdata,
                contentType: false,
                processData: false,
                type: 'POST',
                'success': function(imgurl){
                    var entry = {
                        username: username,
                        email: email,
                        password: password,
                        bio: bio,
                        profileimg: imgurl,
                    }

                    $.post('/updateSettings', entry, function (result) {
                        alert('Settings changed!');
                        console.log(result);
                    });
                }
            });
        } else {
            var entry = {
                username: username,
                email: email,
                password: password,
                bio: bio
            };
            $.post('/updateSettings', entry, function (result) {
                alert('Settings changed!');
                console.log(result);
            });
        }

        // $.post('/changeSettings', entry);
        // alert('settings changed!');
        // window.location.replace("/settings");
    });
/////////////////////////////////


//SETTINGS CANCELED
    $(document).on('click','.update-cancel-button',function() {
        window.location.replace("/page/home");
    });
/////////////////////////


    

    //LOGOUT
    $(document).on('click','.logout-button',function() {
        alert('good bye!');
        window.location.replace("/");
    });

});
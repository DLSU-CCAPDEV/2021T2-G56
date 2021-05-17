
$(document).ready(function() {

    $('.submit-button').on('click',function() {
    

        var image = $('#file-submission')[0].files[0];
        var formdata = new FormData();
        formdata.append('image',image);

        $.ajax({
            url: '/single',
            data: formdata,
            contentType: false,
            processData: false,
            type: 'POST',
            'success': function(result){
                console.log(result);
            }
        });

    });


    $("#file-submission").on('change',function() {
        var input = this;
        console.log(this);

        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]); //convert to string for embedding purposes
        reader.onload = function() {
            var imgSrc = reader.result;
            //console.log(imgSrc);
            $('#preview-image').attr('src', imgSrc);
        }
            
    });

});
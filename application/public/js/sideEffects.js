$(document).ready(function() {

    $(".showForm").on('click', function() {
        $('#effectsForm').toggle();
    })

    
    var idata = {}
    var p_id = $('#patient').val();
    var d_id = $('#diagnose').val();
    var t_id = $('#treatment').val();

    idata['patient'] = p_id;
    idata['diagnose'] = d_id;
    idata['treatment'] = t_id; 
    function addEffect(data){
        idata[data.name]=true
    }
    function deleteEffect(data){
        delete idata[data.name]
    }

    $(".checkers").click(function(){
        if($(this).prop("checked") == true){
            addEffect(this)
            console.log(idata)
        }
        else if($(this).prop("checked") == false){
            deleteEffect(this)
            console.log(idata)
        }
    })

    $('.addbtn1').click(function(e) {
        e.preventDefault();


        $.ajax({
            url: '/effects/add',
            method: 'post',
            dataType: 'json',
            data: { 'data': idata },
            success: function(response) {
                console.log(1)
                if (response.msg == 'success') {
                    getdata();
                } else {
                    alert('some error occurred try again');
                }
            },
            error: function(response) {
                alert('server error occured')
            }
        });
    });


});
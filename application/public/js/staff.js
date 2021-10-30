$(document).ready(function() {
    // alert('application started');

    // getdata();



    $('.addbtn').click(function() {
        var staffData = {
            name: $("#name").val(),
            surname: $("#surname").val(),
            role: $("#role").val(),
            description: $("#description").val(),
        }
        $.ajax({
            url: '/staff/addstaff',
            method: 'post',
            dataType: 'json',
            data: { 'data': staffData },
            success: function(response) {
                if (response.msg == 'success') {
                    console.log('done')
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

    $(document).on('click', 'button.del', function() {
        var id = $(this).parent().find('button.del').val();
        $.ajax({
            url: '/staff/removestaff',
            method: 'delete',
            dataType: 'json',
            data: { 'id': id },
            success: function(response) {
                if (response.msg == 'success') {
                    alert('data deleted');
                    getdata();
                } else {
                    alert('did not get deleted');
                }
            },
            error: function(response) {
                alert('server error')
            }
        });
    });

    function getdata() {
        $.ajax({
            url: '/staff/getstaff',
            method: 'get',
            dataType: 'json',
            success: function(response) {
                if (response.msg == 'success') {
                    $('li.doctor').remove()
                    $('li.nurse').remove()
                    $('li.other').remove()
                    if (response.data == undefined || response.data == null || response.data == '') {
                        console.log('no data found')
                    } else {

                        // $('.tblData').show();
                        $.each(response.data, function(index, data) {
                            var url = url + data._id;
                            index += 1;
                            if (data.role == 'Γιατρος') {
                                $('body > div:nth-child(5) > div > div:nth-child(1) > ul').append('<li class="list-group-item doctor">' + data.name + ' ' + data.surname + '<button type="button" class="btn-sm btn-outline-danger float-right del" value=' + data._id + '>X</button></li>');
                            } else if (data.role == 'Νοσηλευτης') {
                                $('body > div:nth-child(5) > div > div:nth-child(2) > ul').append('<li class="list-group-item nurse">' + data.name + ' ' + data.surname + ' <button type="button" class="btn-sm btn-outline-danger float-right del" value=' + data._id + '>X</button></li>');
                            } else {
                                $('body > div:nth-child(5) > div > div:nth-child(3) > ul').append('<li class="list-group-item other">' + data.name + ' ' + data.surname + ' <button type="button" class="btn-sm btn-outline-danger float-right del" value=' + data._id + '>X</button></li>');
                            }
                        });
                    }
                }

            },
            error: function(response) {
                alert('server error');
            }
        });
    }
    getdata();
    // $('#showMyStaff').on('load', function() {
    //     getdata();
    // });
});
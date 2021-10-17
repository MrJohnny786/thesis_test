// $(document).ready(function() {
//     // alert($)
//     // $('.addForm').show();
//     // $('.addForm').hide();
//     // $('.addForm').toggle();
//     // $(".addForm").click(function(){
//     //     $('.addForm').toggle();
//     // })

//     // $('.effectsForm').hide();
//     $(".showForm").on('click', function() {
//         $('#effectsForm').toggle();
//     })

//     $( "div" ).data( "test", { first: 16, last: "pizza!" } );


//     // $("#formEffects").on('submit', function() {
//     //     // to each unchecked checkbox
//     //     $(this).find('input[type=checkbox]:not(:checked)').prop('checked', true).val(0);
//     // })
//     // function getdata() {
//     //     $.ajax({
//     //         url: '/staff/getstaff',
//     //         method: 'get',
//     //         dataType: 'json',
//     //         success: function(response) {
//     //             if (response.msg == 'success') {
//     //                 $('li.doctor').remove()
//     //                 $('li.nurse').remove()
//     //                 $('li.other').remove()
//     //                 if (response.data == undefined || response.data == null || response.data == '') {
//     //                     console.log('no data found')
//     //                 } else {
//     //                     // $('.tblData').show();
//     //                     $.each(response.data, function(index, data) {
//     //                         var url = url + data._id;
//     //                         index += 1;
//     //                         if (data.role == 'Γιατρος') {
//     //                             $('body > div:nth-child(5) > div > div:nth-child(1) > ul').append('<li class="list-group-item doctor">' + data.name + ' ' + data.surname + '<button type="button" class="btn-sm btn-outline-danger float-right del" value=' + data._id + '>X</button></li>');
//     //                         } else if (data.role == 'Νοσηλευτης') {
//     //                             $('body > div:nth-child(5) > div > div:nth-child(2) > ul').append('<li class="list-group-item nurse">' + data.name + ' ' + data.surname + ' <button type="button" class="btn-sm btn-outline-danger float-right del" value=' + data._id + '>X</button></li>');
//     //                         } else {
//     //                             $('body > div:nth-child(5) > div > div:nth-child(3) > ul').append('<li class="list-group-item other">' + data.name + ' ' + data.surname + ' <button type="button" class="btn-sm btn-outline-danger float-right del" value=' + data._id + '>X</button></li>');
//     //                         }
//     //                     });
//     //                 }
//     //             }

//     //         },
//     //         error: function(response) {
//     //             alert('server error');
//     //         }
//     //     });
//     // }
//     $('.addbtn1').click(function() {
//         var data = {
//             patient_id: $("patient").val()
//         }
//         console.log(data)
//         // var staffData = {
//         //     name: $("#name").val(),
//         //     surname: $("#surname").val(),
//         //     role: $("#role").val(),
//         //     description: $("#description").val()
//         // }
//         $.ajax({
//             url: '/effects/addeffects',
//             method: 'post',
//             dataType: 'json',
//             data: { 'data': staffData },
//             success: function(response) {
//                 if (response.msg == 'success') {
//                     getdata();
//                 } else {
//                     alert('some error occurred try again');
//                 }
//             },
//             error: function(response) {
//                 alert('server error occured')
//             }
//         });
//     });

//     // ( function() {
//     //     $("#datepicker").datepicker();
//     //   } );

// });
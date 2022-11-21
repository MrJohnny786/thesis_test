$(document).ready(function () {
  console.log("script staff working");

  getdata();
  /**
   * Request to the create route of the staff.
   * If it successfull it calls getdata function.
   */
  $(".addbtn").click(function () {
    const staffData = $("#staff").val();
    $.ajax({
      url: "/task/addstaff",
      method: "post",
      dataType: "json",
      data: { data: staffData },
      success: function (response) {
        if (response.msg == "success") {
          //    $("#task").remove();
          alert("task added successfully");
          getdata();
          $("#task").val("");
        } else {
          alert("some error occurred try again");
        }
      },
      error: function (response) {
        alert("server error occured");
      },
    });
  });

  /**
   * Ajax delete request for a specific staff member.
   */
  // $(document).on('click', 'button.del', function() {
  //     var id = $(this).parent().find('button.del').val();
  //     // alert('delte',id)
  //     $.ajax({
  //         url: '/task/removetask',
  //         method: 'delete',
  //         dataType: 'json',
  //         data: { 'id': id },
  //         success: function(response) {
  //             if (response.msg == 'success') {
  //                 alert('data deleted');
  //                 getdata();
  //             } else {
  //                 alert('data not get deleted');
  //             }
  //         },
  //         error: function(response) {
  //             alert('server error')
  //         }
  //     });
  // });

  /**
   * Return all the staff in the database and generate them in the html.
   */
  function getdata() {
    $.ajax({
      url: "/task/getstaff",
      method: "get",
      dataType: "json",
      success: function (response) {
        if (response.msg == "success") {
          $("tr.taskrow").remove();
          //console.log(response.data)
          if (
            response.data == undefined ||
            response.data == null ||
            response.data == ""
          ) {
            $(".tblData").hide();
          } else {
            $(".tblData").show();
            $.each(response.data, function (index, data) {
              var url = url + data._id;
              index += 1;
              $("tbody").append(
                "<tr class='taskrow'><td>" +
                  index +
                  "</td><td>" +
                  data.task +
                  "</td><td>" +
                  "<button class='del' value='" +
                  data._id +
                  "'>delete</button>" +
                  "</td></tr>"
              );
            });
          }
        }
      },
      error: function (response) {
        alert("server error");
      },
    });
  }
});

// Changes the input name to the current uploaded file name.
$('input[type="file"]').change(function(e) {
    var fileName = e.target.files[0].name;
    $('.custom-file-label').html(fileName);
});

$(document).ready(function() {

    // $('body> div.container-fluid> div.container-fluid> div.row> div:nth-child(2)').hide()
    $('#myTable').DataTable({
        columnDefs: [{
            targets: 0,
            render: function(data, type, row) {
                return data.substr(0, 15);
            }
        }]
    });
    $('#myPatientsTable').DataTable();
});
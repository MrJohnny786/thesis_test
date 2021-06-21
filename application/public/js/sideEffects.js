$(document).ready(function() {
    // alert($)
    // $('.addForm').show();
    // $('.addForm').hide();
    // $('.addForm').toggle();
    // $(".addForm").click(function(){
    //     $('.addForm').toggle();
    // })

    // $('.effectsForm').hide();
    $(".showForm").on('click', function() {
        $('#effectsForm').toggle();
    })

    $("#formEffects").on('submit', function() {
        // to each unchecked checkbox
        $(this).find('input[type=checkbox]:not(:checked)').prop('checked', true).val(0);
    })


});
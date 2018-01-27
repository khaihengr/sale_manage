$(document).ready(function (event) {
    function set_data_modal_edit(data) {
        var form = $('#edit_form');
        console.log(data)
        $('#edit_form input[name="_id"]').val(data._id);
        $("#edit_form > p:nth-child(2) > input").val(data.name);
        $("#edit_form > p:nth-child(3) > input").val(data.boss);
        $("#edit_form > p:nth-child(4) > input").val(data.phone);
        $("#edit_form > p:nth-child(5) > input").val(data.address);
        $("#edit_form > p:nth-child(6) > input").val(data.town);
        $("#edit_form > p:nth-child(7) > input").val(data.date_create);
        $("#edit_form > p:nth-child(8) > input").val(data.link);
    }
    $(".edit_com_num").click(function () {
        var modal = $(this).closest('.pr_modal');
        var _id, _saler, boss, phone, town, address, tax, link, date_create, name;
        _id = $(this).closest('.pr_modal').attr('id');
        boss =modal.find('.data-boss').text();
        phone = modal.find('.data-phone').text();
        town = modal.find('.data-town').text();
        address = modal.find('.data-address').text();
        tax = modal.find('.data-tax').text();
        date_create = modal.find('.data-date_create').text();
        name = modal.find('.data-name').text();
        link = modal.find('.data-link').attr('href');
        var data = {
            _id,boss,phone,town,address,tax,link,date_create,name
        }
        $(this).closest('.pr_modal').modal('hide');
        set_data_modal_edit(data);


    })
    $("#regist").on('click',function(){
        $("#register_form").toggleClass('d-none','d-block');
    })
    $(".c_state").click(function() {
        if ($(this).hasClass('btn-outline-dark')) {
            $(this).removeClass('btn-outline-dark').addClass('btn-' + $(this).attr('value'));
            $(this).siblings().attr('disabled', true);
        } else {
            $(this).siblings().attr('disabled', false)
            $(this).removeClass('btn-' + $(this).attr('value')).addClass('btn-outline-dark');
        }
        var _state = $(this).attr('value');
        $(this).closest('.col-5').find('.child-hidden').attr('value', _state);
        $(this).closest('.col-5').find('form').submit();
    })
    $("#_filter").change(()=>{
        $('#f_filter').submit();
    })
    // $('._note').focusout(()=>{
    //        $(this).parent().submit();
    // })
})
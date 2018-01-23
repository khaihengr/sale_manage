$(document).ready(function (event) {
    $("#regist").on('click',function(){
        $("#register_form").toggleClass('d-none','d-block');
    })
    $(".c_state").click(function() {
            if ($(this).hasClass('btn-outline-dark')) {
                $(this).removeClass('btn-outline-dark').addClass('btn-' + $(this).attr('value'));
                $(this).siblings().attr('disabled', true)
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
    // $('._note').on('change', function () {
    //     $(this).parent().submit();
    // })
})
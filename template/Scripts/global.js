$(function(){
    $('.open-dialog').click(function(){
        dialog($('#ErrDialog'),'操作有误，请确认后重新操作！','180');
    });
//模态框居中
    function centerModals() {
        $('.modal').each(function (i) {
            var $clone = $(this).clone().css('display', 'block').appendTo('body');
            var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
            top = top > 0 ? top : 0;
            $clone.remove();
            $(this).find('.modal-content').css("margin-top", top);
        });
    }
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);
});

/*by likuan Function*/

//模态框居中的方法
function centerModals() {
    $('.modal').each(function (i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}

//dialog方法
function dialog(target,msg,dHeight){
     dHeight = dHeight || 100;
    target.modal();
    target.find('.err_wen').html(msg);

}


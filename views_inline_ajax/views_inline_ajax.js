/**
 * Created by admin on 12.04.2017.
 */
(function ($) {
    $(document).ready(function(){

        if($('.feed-icon').length){
            console.log(11);
            var feed = $('.feed-icon').attr('alt','Ёкспортировать к Excel-таблицу').detach();
            $('#block-system-main >.content').prepend(feed);
        }

        var arr = [];

        $('.views-field-edit-node a').each(function(i,el){
            $(el).attr('target', '_blank');
        });

        $('.btn-save').click(function(e){
            if($(this).hasClass('active')){
                e.preventDefault();
                $btn = $(this).closest('tr').find('.ajax-progress').addClass('in-progress');
                var nid = $(this).closest('tr').find('.views-field-nid').text().trim();
                var item = {};

                arr.forEach(function(obj, i, arr){

                    if(obj.nid == nid){
                        item = obj;
                    }
                });

                //console.log(json);

                //console.log(json);
                //console.log(item);

                $.ajax({
                    type: 'POST',
                    async : true,
                    global : false,
                    url : '/admin/orders/set',
                    dataType : 'json; charset=utf-8',
                    data : item,
                    success : function(data){
                        console.log(data);
                    },
                    error: function(data){
                        console.log('error');
                    },
                    complete: function(){
                       $btn.removeClass('in-progress');
                    }
                });
            }else{
                return false;
            }
        });

        $('.views-field-field-status-editable select').change(function(){
            $(this).closest('tr').find('.btn-save').removeClass('not-active').addClass('active');
            var status = $(this).val();
            var nid = $(this).closest('tr').find('.views-field-nid').text().trim();
            var obj = {};
            obj.nid = nid;
            obj.status = status;
            arr.push(obj);
            //console.log(arr);
        });
    });
})(jQuery);
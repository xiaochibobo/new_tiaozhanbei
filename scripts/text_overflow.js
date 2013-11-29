;(function($){
    // 段落溢出处理函数
    $.fn.extend({
        paraOverflow:function(options){
            return this.each(function(){
                var $this=$(this);
                var thisHeight=function(){
                    return $this.innerHeight();
                };
                var defaults=$.extend({
                    height:$this.parent().innerHeight(),
                    word:'......',
                    link:$this.find('.get-more').length?$this.find('.get-more').attr('href'):'#',
                    dNum:5
                },$.fn.paraOverflow.setup,options);
                if(thisHeight()>defaults.height){
                    var $getMore=defaults.word!=='......'?
                        $('<a href="'+defaults.link+'">'+' '+defaults.word+'</a>'):$('<span>'+defaults.word+'</span>');
                    var text=$this.text();
                    var maxNum=Math.floor(text.length*(defaults.height/$this.innerHeight()));
                    do{
                        $this.text(text.slice(0,maxNum)).append($getMore);
                        maxNum-=defaults.dNum;
                    }while(thisHeight()>defaults.height&&maxNum>0&&defaults.dNum!==0);
                }
            });
        }
    });
    $.fn.paraOverflow.setup={};
}(jQuery));

$(function() {
    $('p').paraOverflow({
        height: '90'
    });
});
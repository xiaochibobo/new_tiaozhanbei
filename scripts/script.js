    function preDisplay() {
        var oBox = document.getElementById("box");
        var aUl = oBox.getElementsByTagName("ul");
        var aImg = aUl[0].getElementsByTagName("li");
        var aNum = aUl[1].getElementsByTagName("li");
        var timer = play = null;
        var i = index = 0; 
        aNum[0].className = "current" 
        
        //切换按钮
        for (i = 0; i < aNum.length; i++)
        {
            aNum[i].index = i;
            aNum[i].onmouseover = function ()
            {
                show(this.index)
            }
        }
        
        //鼠标划过关闭定时器
        oBox.onmouseover = function ()
        {
            clearInterval(play) 
        };
        
        //鼠标离开启动自动播放
        oBox.onmouseout = function ()
        {
            autoPlay()
        };  
        
        //自动播放函数
        function autoPlay ()
        {
            play = setInterval(function () {
                index++;
                index >= aImg.length && (index = 0);
                show(index);        
            },2000);    
        }
        autoPlay();//应用
        
        //图片切换, 淡入淡出效果
        function show (a)
        {
            index = a;
            var alpha = 0;
            for (i = 0; i < aNum.length; i++)aNum[i].className = "";
            aNum[index].className = "current";
            clearInterval(timer);           
            
            for (i = 0; i < aImg.length; i++)
            {
                aImg[i].style.opacity = 0;
                aImg[i].style.filter = "alpha(opacity=0)";  
            }
            
            timer = setInterval(function () {
                alpha += 2;
                alpha > 100 && (alpha =100);
                aImg[index].style.opacity = alpha / 100;
                aImg[index].style.filter = "alpha(opacity = " + alpha + ")";
                alpha == 100 && clearInterval(timer)
            },20);
        }
    }    

   
    //通过class寻找元素的兼容浏览器写法

    function  getElementsByClassName (node, classname) {
        if(node.getElementsByClassName) 
            return node.getElementsByClassName(classname);
        else {
            var results = new Array ();
            var elems = node.getElementsByTagName("*");
            for (var i = 0; i < elems.length; i++) {
                if (elems[i].className.indexOf(classname) != -1) {
                    results[results.length] = elems[i] ;
                }    
            }    
            return results;
        }    
    }

    //文本切换
    function messSwitch(parentEle,m_classname,target_ul,a_classname,target_a) {
        var message = getElementsByClassName(parentEle,m_classname);
        var uMessage = message[0].getElementsByTagName(target_ul)
        var aMessage = getElementsByClassName(message[0],a_classname)[0].getElementsByTagName(target_a);
        var m = 0;
        for (m = 0; m < aMessage.length - 1; m++) {
            aMessage[m].index = m;
            aMessage[m].onclick  = function () { //闭包
                return function () {
                    if ( this.index == 0 ) {
                        uMessage[1].style.cssText = "display : none;";
                        uMessage[0].style.cssText = "display : block;";
                        aMessage[0].style.cssText = "background-color:#1f81b7; color:white;";
                        aMessage[1].style.cssText = "background-color:white;color:black;";
                    }  else {
                        uMessage[0].style.cssText = "display : none ;";
                        uMessage[1].style.cssText = "display : block;";
                        aMessage[1].style.cssText = "background-color:#1f81b7;color:white;";
                        aMessage[0].style.cssText = "background-color:white;color:black;";
                    }
                   return false;
                };
            }(m); 
        }
    }; 
    //项目展示的hover状态
    function proHover(parentEle,target_ul,target_li,target_class) {

        var proLi = document.getElementById(parentEle).getElementsByTagName(target_ul)[0].getElementsByTagName(target_li);
        var proInt = getElementsByClassName(document.getElementById(parentEle),target_class);
        var n = 0;
        for (n = 0; n < proLi.length; n++) {
            proLi[n].index = n;
            proLi[n].onmouseover  = function () { 
                return function () {
                    var that = this.index; //这里必须用this，若用proLi[n]则会错。因为n是在闭包里面的变量
                    proInt[that].style.cssText = "display:block;";

                 };   
            }(n);
            proLi[n].onmouseout  = function () { 
                return function () {
                    var that = this.index; //这里必须用this，若用proLi[n]则会错。因为n是在闭包里面的变量
                    proInt[that].style.cssText = "display:none;";

                 };   
            }(n);
        }
    };      

    //nav的hover

    function navHover(parentEle,target) {
        var navLi = document.getElementById(parentEle).getElementsByTagName(target);
        var t = 0;
        for (t = 0; t < navLi.length; t++) {
           navLi[t].index = t;
            navLi[t].onmouseover = function () {
                return function () {
                    var that = this.index; 
                    navLi[that].style.cssText = "background-image:url(images/nav_ho.png);background-position:center;";
                 };   
            }(t);
            navLi[t].onmouseout = function () {
                return function () {
                    var that = this.index; 
                    navLi[that].style.cssText = "background-image:none;";
                 };   
            }(t);
        }
    };    

    function leftNav(id,ele) {
        var ul = document.getElementById(id,ele);
        var aEle = ul.getElementsByTagName(ele);
        var target = 0;
        aEle[0].style.cssText = "background-color:#1e80b7;color:white;";
        for (var t = 0; t < aEle.length; t++) {
            aEle[t].index = t;
            aEle[t].onclick = function () {
                return function () {
                    var that = this.index;
                    aEle[target].style.cssText = "background-color:white;color:#1e80b7;";
                    aEle[that].style.cssText = "background-color:#1e80b7;color:white;" ;
                    target = that;
                    return false;
                };
            }(t);          
        }
    }

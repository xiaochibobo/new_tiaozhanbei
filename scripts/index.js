window.onload = function() {
    var oBox = document.getElementById("display");
    var oList = oBox.getElementsByTagName("ul")[0];
    var oImg = oBox.getElementsByTagName("img");
    var timer = playTimer = null;
    var index = i = 0;
    var bOrder = true;
    var aBtn = oBox.getElementsByTagName("ul")[1].getElementsByTagName("li");



    //初始化状态
    cutover();

    //按钮点击切换
    for (i = 0; i < aBtn.length; i++)
    {
        aBtn[i].index = i;
        aBtn[i].onmouseover = function ()
        {
            index = this.index;
            cutover()
        }
    }
    
    function cutover()
    {
        for (i = 0; i < aBtn.length; i++) aBtn[i].className = "";
        aBtn[index].className = "current";          
        startMove(-(index * oImg[0].offsetHeight))
    }
    
    function next()
    {
        bOrder ? index++ : index--;
        index <= 0 && (index = 0, bOrder = true);
        index >= aBtn.length - 1 && (index = aBtn.length - 1, bOrder = false)
        cutover()
    }
    
    playTimer = setInterval(next, 3000);
    
    //鼠标移入展示区停止自动播放
    oBox.onmouseover = function ()
    {
        clearInterval(playTimer)
    };
    
    //鼠标离开展示区开始自动播放
    oBox.onmouseout = function ()
    {
        playTimer = setInterval(next, 3000)
    };
    function startMove(iTarget)
    {
        clearInterval(timer); //清除上次的调用
        timer = setInterval(function ()
        {
            doMove(iTarget)
        }, 30)  
    }
    function doMove (iTarget)
    {       
        var iSpeed = (iTarget - oList.offsetTop) / 10;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);       
        oList.offsetTop == iTarget ? clearInterval(timer) : oList.style.top = oList.offsetTop + iSpeed + "px"
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
    var message = getElementsByClassName(oBox,"message");
    var uMessage = message[0].getElementsByTagName("ul")
    var aMessage = getElementsByClassName(message[0],"pre")[0].getElementsByTagName("a");
    var m = 0;
    uMessage[1].style.cssText = "display : none";
    aMessage[0].style.cssText = "background-color:#1f81b7;";
    for (m = 0; m < aMessage.length - 1 ; m++) {
        aMessage[m].index = m;
        aMessage[m].onclick  = function () { //闭包
            return function () {
                if ( this.index == 0 ) {
                    uMessage[1].style.cssText = "display : none;";
                    uMessage[0].style.cssText = "display : block;";
                    aMessage[0].style.cssText = "background-color:#1f81b7;";
                    aMessage[1].style.cssText = "background-color:none;";
                }  else {
                    uMessage[0].style.cssText = "display : none ;";
                    uMessage[1].style.cssText = "display : block;";
                    aMessage[1].style.cssText = "background-color:#1f81b7;";
                    aMessage[0].style.cssText = "background-color:none;";
                }
               return false;
            };
        }(m); 
    }

};
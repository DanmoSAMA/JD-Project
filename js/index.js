window.onload = function(){
    //左上角弹出层——选择地点
    let location = document.getElementsByClassName("location")[0];
    let chosenCity = location.getElementsByTagName("a")[0].getElementsByTagName("span")[0];
    let locArr = document.getElementsByClassName("loc-top")[0];
    let locAlla = locArr.getElementsByTagName("a");
    let Reg1 = new RegExp("chosen_location");
    let Reg2 = new RegExp("long-content");
    for(let i = 0; i < locAlla.length; i++){
        locAlla[i].onclick = function(){
            for(let i = 0; i < locAlla.length; i++){
                //正则表达式初体验，非常好用，匹配模式可以不加
                if(Reg1.test(locAlla[i].className) == true && Reg2.test(locAlla[i].className) == false){
                    locAlla[i].className = "";  
                }
                else if(Reg2.test(locAlla[i].className) == true){
                    locAlla[i].className = "long-content";
                }
            }
            if(Reg2.test(locAlla[i].className) == false){
                this.className = "chosen_location";
            }
            else{
                this.className = "chosen_location long-content";
            }
            chosenCity.innerText = this.innerText;
        }
    }
    //工具条
    let backTop = document.getElementsByClassName("back-top")[0];
    let topPop = document.getElementsByClassName("top-pop-wrapper")[0];
    let toTop = document.getElementById("totop");
    let height = parseInt(document.documentElement.scrollTop);
    let timer01 = setInterval(() => {
        height = parseInt(document.documentElement.scrollTop);
        if(height > 660){
            //上方弹出的工具条
            //上方和右侧弹出时间不一样
            topPop.style.top = "0";
            backTop.className = "back-top_move back-top";
            toTop.className = "show_totop";
        }
        else{
            topPop.style.top = "-55px";
            backTop.className = "back-top";
            toTop.className = "hidden_totop";
        }
    }, 100);

    toTop.onclick = function(){
        //滚动条向上回滚，而不是直接跳至最上方
        let timer02 = setInterval(() => {
            height = parseInt(document.documentElement.scrollTop);
            document.documentElement.scrollTop -= 30;
            if(height == 0){
                clearInterval(timer02);
            }
        }, 1);
    }
    //刷新gif图片
    let logo = document.getElementsByClassName("logo")[0].getElementsByTagName("a")[0];
    let check = false;
    logo.onmouseover = function(){
        if(check == false){
            logo.className = "to-gif";
            check = true;
            timer03 = setTimeout(() => {
                logo.className = "";
                check = false;
            }, 5200);
        }
    }
    //大轮播图
    let prev01 = document.getElementsByClassName("prev")[0];
    let next01 = document.getElementsByClassName("next")[0];
    let bannerImgs = document.getElementsByClassName("banner-big-img-list")[0].getElementsByTagName("li");
    let bannerDots = document.getElementsByClassName("slider-indicators")[0].getElementsByTagName("a");
    let index01 = 0;
    bannerDots[index01].className = "chosen_border";

    prev01.addEventListener("click",click01);
    next01.addEventListener("click",click02);
    function click01(){
        index01--;
        if(index01 < 0){
            index01 = bannerImgs.length - 1;
            bannerImgs[index01].style.opacity = 1;
            bannerDots[index01].className = "chosen_border";
            bannerImgs[0].style.opacity = 0;
            bannerDots[0].className = "";
        }
        else{
            bannerImgs[index01 + 1].style.opacity = 0;
            bannerDots[index01 + 1].className = "";
            bannerImgs[index01].style.opacity = 1;
            bannerDots[index01].className = "chosen_border";
        }
        clearInterval(timer04);
        timer04 = autoRun01();
        prev01.removeEventListener("click",click01);
        setTimeout(function(){
            prev01.addEventListener("click",click01);
            //每隔一段时间才可以点击
        },300); 
    }
    function click02(){
        index01++;
        if(index01 > bannerImgs.length - 1){
            index01 = 0;
            bannerImgs[index01].style.opacity = 1;
            bannerDots[index01].className = "chosen_border";
            bannerImgs[bannerImgs.length - 1].style.opacity = 0;
            bannerDots[bannerDots.length - 1].className = "";
        }
        else{
            bannerImgs[index01 - 1].style.opacity = 0;
            bannerDots[index01 - 1].className = "";
            bannerImgs[index01].style.opacity = 1;
            bannerDots[index01].className = "chosen_border";
        }
        clearInterval(timer04);
        timer04 = autoRun01();
        next01.removeEventListener("click",click02);
        setTimeout(function(){
            next01.addEventListener("click",click02);
        },300);
    }
    for(let i = 0; i < bannerDots.length; i++){
        bannerDots[i].onmouseover = function(){
            //排他思想
            for(let j = 0; j < bannerDots.length; j++){
                bannerDots[j].className = "";
                bannerImgs[j].style.opacity = 0;
            }
            bannerDots[i].className = "chosen_border";
            bannerImgs[i].style.opacity = 1;
            index01 = i;
            clearInterval(timer04);
            timer04 = autoRun01();
        }
    }
    function autoRun01(){
        let timer04 = setInterval(() => {
            index01++;
            if(index01 > bannerImgs.length - 1){
                index01 = 0;
                bannerImgs[index01].style.opacity = 1;
                bannerDots[index01].className = "chosen_border";
                bannerImgs[bannerImgs.length - 1].style.opacity = 0;
                bannerDots[bannerDots.length - 1].className = "";
            }
            else{
                bannerImgs[index01 - 1].style.opacity = 0;
                bannerDots[index01 - 1].className = "";
                bannerImgs[index01].style.opacity = 1;
                bannerDots[index01].className = "chosen_border";
            }
            //自动轮播可套用next01函数
        }, 3500);
        return timer04;
    }
    let timer04 = autoRun01();

    //旁边小轮播图
    let prev02 = document.getElementsByClassName("banner-small-img-list")[0].getElementsByClassName("small")[0];
    let next02 = document.getElementsByClassName("banner-small-img-list")[0].getElementsByClassName("small")[1];
    let sideImgs01 = document.getElementsByClassName("banner-small-img-list")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
    let sideImgs02 = document.getElementsByClassName("banner-small-img-list")[0].getElementsByTagName("ul")[1].getElementsByTagName("li");
    let sideImgs03 = document.getElementsByClassName("banner-small-img-list")[0].getElementsByTagName("ul")[2].getElementsByTagName("li");
    prev02.addEventListener("click",click03);
    next02.addEventListener("click",click04);
    let k = 0;
    function click03(){
        k--;
        if(k < 0){
            k = sideImgs01.length - 1;
            sideImgs01[k].style.opacity = 1;
            sideImgs02[k].style.opacity = 1;
            sideImgs03[k].style.opacity = 1;
            sideImgs01[0].style.opacity = 0;
            sideImgs02[0].style.opacity = 0;
            sideImgs03[0].style.opacity = 0;
        }
        else{
            sideImgs01[k + 1].style.opacity = 0;
            sideImgs02[k + 1].style.opacity = 0;
            sideImgs03[k + 1].style.opacity = 0;
            sideImgs01[k].style.opacity = 1;
            sideImgs02[k].style.opacity = 1;
            sideImgs03[k].style.opacity = 1;
        }
        clearInterval(timer05);
        timer05 = autoRun02();
        prev02.removeEventListener("click",click03);
        setTimeout(function(){
            prev02.addEventListener("click",click03);
        },300); 
    }
    function click04(){
        k++;
        if(k > sideImgs01.length - 1){
            k = 0;
            sideImgs01[k].style.opacity = 1;
            sideImgs02[k].style.opacity = 1;
            sideImgs03[k].style.opacity = 1;
            sideImgs01[sideImgs01.length - 1].style.opacity = 0;
            sideImgs02[sideImgs01.length - 1].style.opacity = 0;
            sideImgs03[sideImgs01.length - 1].style.opacity = 0;
        }
        else{
            sideImgs01[k - 1].style.opacity = 0;
            sideImgs02[k - 1].style.opacity = 0;
            sideImgs03[k - 1].style.opacity = 0;
            sideImgs01[k].style.opacity = 1;
            sideImgs02[k].style.opacity = 1;
            sideImgs03[k].style.opacity = 1;
        }
        clearInterval(timer05);
        timer05 = autoRun02();
        next02.removeEventListener("click",click04);
        setTimeout(function(){
            next02.addEventListener("click",click04);
        },300); 
    }
    function autoRun02(){
        let timer05 = setInterval(() => {
            k++;
            if(k > sideImgs01.length - 1){
                k = 0;
                sideImgs01[k].style.opacity = 1;
                sideImgs02[k].style.opacity = 1;
                sideImgs03[k].style.opacity = 1;
                sideImgs01[sideImgs01.length - 1].style.opacity = 0;
                sideImgs02[sideImgs01.length - 1].style.opacity = 0;
                sideImgs03[sideImgs01.length - 1].style.opacity = 0;
            }
            else{
                sideImgs01[k - 1].style.opacity = 0;
                sideImgs02[k - 1].style.opacity = 0;
                sideImgs03[k - 1].style.opacity = 0;
                sideImgs01[k].style.opacity = 1;
                sideImgs02[k].style.opacity = 1;
                sideImgs03[k].style.opacity = 1;
            }
        }, 10500);
        return timer05;
    }
    let timer05 = autoRun02();

    //scroll式轮播图——两个用到的函数
    function move(obj, attr, target, speed, callback) {
        clearInterval(obj.timer);
        var current = parseInt(getStyle(obj, attr));
        if(current > target) {
            speed = -speed;
        }
        obj.timer = setInterval(function() {
            var oldValue = parseInt(getStyle(obj, attr));
            var newValue = oldValue + speed;
            if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
                newValue = target;
            }
            obj.style[attr] = newValue + "px";
            if(newValue == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
        }, 1);
    }
    function getStyle(obj, name) {
        if(window.getComputedStyle) {
            return getComputedStyle(obj, null)[name];
        } else {
            return obj.currentStyle[name];
        }
    }
    //scroll式轮播图
    let imgList01Wrapper = document.getElementsByClassName("goods-list-wrapper")[0];
    let imgList01 = document.getElementsByClassName("goods-list")[0];
    let prev03 = imgList01Wrapper.getElementsByClassName("img-list-btn")[0];
    let next03 = imgList01Wrapper.getElementsByClassName("img-list-btn")[1];
    let scrollImgs01 = imgList01.getElementsByTagName("li");
    let index02 = 0;
    imgList01.style.left = "-800px"
    imgList01.style.width = (scrollImgs01.length) * 200 + "px";
    prev03.addEventListener("click",click05);
    next03.addEventListener("click",click06);
    function click05(){
        if(index02 == 0){
        	move(imgList01,"left",0,7,function(){
                index02 =  -16;
                //这里一开始写的是index02 = scrollImgs01.length,但是会造成向左和向右index值不同，十分混乱
                //所以此处要统一向左和向右的index值，并且对move的第三个参数进行调整
        		//写在回调函数中，可以确保先移动再跳转
        		imgList01.style.left = "-4000px";  
          		// console.log(index02);
        	});
        }
        else{
            index02 += 4;
        	move(imgList01,"left",(index02-4)*200,7,function(){});
          	// console.log(index02);
        }
        clearInterval(timer06);
        timer06 = autoRun03();
        prev03.removeEventListener("click",click05);
        setTimeout(function(){
            prev03.addEventListener("click",click05);
        },600); 
    }
    function click06(){
        if(index02 == -16){
        	move(imgList01,"left",-4800,7,function(){
        		index02 =  0;
        		imgList01.style.left = "-800px";  
          		// console.log(index02);
        	});
        }
        else{
            index02 -= 4;
        	move(imgList01,"left",(index02-4)*200,7,function(){});
          	// console.log(index02);
        }
        clearInterval(timer06);
        timer06 = autoRun03();
        next03.removeEventListener("click",click06);
        setTimeout(function(){
            next03.addEventListener("click",click06);
        },600); 
    }
    function autoRun03(){
        let timer06 = setInterval(() => {
            if(index02 == -16){
                move(imgList01,"left",-4800,7,function(){
                    index02 =  0;
                    imgList01.style.left = "-800px";  
                });
            }
            else{
                index02 -= 4;
                move(imgList01,"left",(index02-4)*200,7,function(){});
            }
        }, 10000);
        return timer06;
    }
    let timer06 = autoRun03();
    //右侧小scroll轮播图
    let outer02 = document.getElementsByClassName("little-slider-wrapper")[0];
    let scrollDots = outer02.getElementsByTagName("ul")[0].getElementsByTagName("li");
    let imgList02 = document.getElementsByClassName("little-slider")[0];
    let scrollImgs02 = imgList02.getElementsByTagName("li");
    let index03 = 0;
    for(let i = 0; i < scrollDots.length; i++){
        scrollDots[i].num = i; 
        scrollDots[i].onmouseover = function(){
            index03 = this.num;
            move(imgList02,"left",-180*index03,2,function(){});
            for(let j = 0; j < scrollDots.length; j++){
                scrollDots[j].className = "";
            }
            scrollDots[i].className = "chosen_background-color";
            clearInterval(timer07);
            timer07 = autoRun04();
        }
    }
    function autoRun04(){
        let timer07 = setInterval(() => {
            index03++;
            index03 %= scrollImgs02.length;
            move(imgList02,"left",-180*index03,2,function(){
                for(let j = 0; j < scrollDots.length; j++){
                    scrollDots[j].className = "";
                }
                if(index03 >= scrollDots.length){
                    index03 = 0;
                    imgList02.style.left = 0;
                    //"偷天换日"
                }
                scrollDots[index03].className = "chosen_background-color";
            });
        }, 3500);
        return timer07;
    }
    let timer07 = autoRun04();

    //下方scroll轮播图
    let imgList03Wrapper = document.getElementsByClassName("move-list-wrapper")[0];
    let imgList03 = document.getElementsByClassName("move-list")[0];
    let scrollImgs03 = imgList03.getElementsByTagName("li");
    let scrollPoints = document.getElementsByClassName("scroll-points")[0];
    imgList03.style.width = 200 * scrollImgs03.length + "px";
/*
    滚动条的拖拽
    function drag(obj,another){
        obj.onmousedown = function(event){
            obj.setCapture && obj.setCapture();
            let ol = event.clientX - obj.offsetLeft;

            document.onmousemove = function(event){
                let left = event.clientX - ol;
                if(left < 0){
                    left = 0;
                    //不能移出固定范围
                }
                else if(left > 861){
                    left = 861;
                }
                obj.style.left = left+"px";
                another.style.left = left * 3000 / 960 + "px";
            };
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
                obj.releaseCapture && obj.releaseCapture();
            };
            return false;  
        };
    }
    drag(scrollPoints,imgList03);
    因为拖动需要暂停作前提，也先放着
*/
    //先执行一次函数，因为timer08会等待30s才开始
    imgList03.style.left = "-2000px";
    scrollPoints.style.left = "861px";
    setTimeout(() => {
        imgList03.style.transition = "none";
        imgList03.style.left = "0";
        scrollPoints.style.transition = "none";
        scrollPoints.style.left = "0";
    }, 29985);
    let timer08 = autoRun05();
    function autoRun05(){
        let timer08 = setInterval(() => {
            imgList03.style.transition = "left 30s linear";
            imgList03.style.left = "-2000px";
            scrollPoints.style.transition = "left 30s linear";
            scrollPoints.style.left = "861px";
            setTimeout(() => {
                imgList03.style.transition = "none";
                imgList03.style.left = "0";
                scrollPoints.style.transition = "none";
                scrollPoints.style.left = "0";
            }, 29985);
            //这两个时间需要相差一定ms，否则不执行
        }, 30000);
        return timer08;
    }
    // imgList03Wrapper.onmouseover = function(){
    //     imgList03.style.transition = "none";
    //     scrollPoints.style.transition = "none";
    //     imgList03.style.left = imgList03.offsetLeft;
    //     scrollPoints.style.left = scrollPoints.offsetLeft;
    //     暂时不做鼠标移入暂停的效果了
    // }
    
    //倒计时
    let timer09 = setInterval(function(){
        //放入定时器内，反复获取时间就可达到刷新效果
        let d1 = new Date("3/1/2021 22:00:00");
        let d2 = Date.now();
        let cha = (d1 - d2)/1000;   //时间戳单位改为秒
        let second = parseInt(cha % 60);
        let minute = parseInt((cha / 60) % 60);
        let hour = parseInt(cha / 3600);
        if(second == 0 && minute == 0 && hour == 0){
            clearInterval(timer09);
            //到点后停止倒计时，否则会出现负数
        }
        if(second < 0 || minute < 0 || hour < 0){
            second = 0; minute = 0; hour = 0;
            clearInterval(timer09);
        }
        let boxes = document.getElementsByClassName("box");
        boxes[0].innerHTML = hour;
        boxes[1].innerHTML = minute;
        boxes[2].innerHTML = second;
    },1000);

//"新品首发" scroll轮播图
    let imgList04 = document.getElementsByClassName("scroll-goods")[0];
    let scrollImgs04 = imgList04.getElementsByTagName("div");
    let prev04 = document.getElementsByClassName("scroll-goods-wrapper")[0].getElementsByClassName("img-list-btn")[0];
    let next04 = document.getElementsByClassName("scroll-goods-wrapper")[0].getElementsByClassName("img-list-btn")[1];
    let index04 = 3;    //index04负责设置center,初始时第2张图片设置center,因为前边多放了一张图，所以下标不减1
    let isround01 = false;
    let isround02 = false;
    imgList04.style.left = "-292px";
    prev04.addEventListener("click",click07);
    next04.addEventListener("click",click08);
    function click07(){
        index04 -= 1;
        // console.log(index04);
        imgList04.style.transition = "0.8s left";
        if(isround01 == true && index04 == 4){
            imgList04.style.left = parseInt(imgList04.style.left) + 146 + "px";
            //解决距离小于119px的问题，强制误差调整大法
        }
        else{
            imgList04.style.left = parseInt(imgList04.style.left) + 119 + "px";
        }  
        //转过来一次，再往左转，距离会小于119px，原因不明
        const pro = new Promise(function(resolve,reject){
            //试试promise，虽然异步没成功，还是靠定时器
            if(index04 > 1){
                resolve();
            }
            else{
                reject();
            }
        })
        pro.then(
            function(){},
            function(){
                isround01 = true;
                index04 = scrollImgs04.length - 3;
                setTimeout(function(){
                    imgList04.style.transition = "none";
                    imgList04.style.left = "-556px";
                    scrollImgs04[index04].className = "center";
                },800);
            }   
        )
        for(let i = 0; i < scrollImgs04.length; i++){
            scrollImgs04[i].className = "";
        }
        // setTimeout(function(){
        //     scrollImgs04[index04].className = "center";
        // },800);
        scrollImgs04[index04].className = "center";
        prev04.removeEventListener("click",click07);
        setTimeout(function(){
            prev04.addEventListener("click",click07);
        },800);
        next04.removeEventListener("click",click08);
        setTimeout(function(){
            next04.addEventListener("click",click08);
        },800); 
        clearInterval(timer10);
        timer10 = autoRun06(); 
    }
    function click08(){
        index04 += 1;
        console.log(index04);
        imgList04.style.transition = "0.8s left";
        imgList04.style.left = parseInt(imgList04.style.left) - 119 + "px";
        // if(isround02 == true && index04 == 6){
        //     imgList04.style.left = parseInt(imgList04.style.left) - 92 + "px";
        // }
        // else{
        //     imgList04.style.left = parseInt(imgList04.style.left) - 119 + "px";
        // }  
        const pro = new Promise(function(resolve,reject){
            if(index04 < 6){
                resolve();
            }
            else{
                reject();
            }
        })
        pro.then(
            function(){},
            function(){
                index04 = 2;
                setTimeout(function(){
                    imgList04.style.transition = "none";
                    imgList04.style.left = "-173px";
                    scrollImgs04[index04].className = "center";
                },800);
            }   
        )
        for(let i = 0; i < scrollImgs04.length; i++){
            scrollImgs04[i].className = "";
        }
        scrollImgs04[index04].className = "center";
        next04.removeEventListener("click",click08);
        setTimeout(function(){
            next04.addEventListener("click",click08);
        },800); 
        prev04.removeEventListener("click",click07);
        setTimeout(function(){
            prev04.addEventListener("click",click07);
        },800);
        clearInterval(timer10);
        timer10 = autoRun06();
    }
    function autoRun06(){
        let timer10 = setInterval(() => {
            index04 += 1;
            imgList04.style.transition = "0.8s left";
            imgList04.style.left = parseInt(imgList04.style.left) - 119 + "px";
            const pro = new Promise(function(resolve,reject){
                if(index04 < 6){
                    resolve();
                }
                else{
                    reject();
                }
            })
            pro.then(
                function(){},
                function(){
                    let isround = true;
                    isround = true;
                    index04 = 2;
                    setTimeout(function(){
                        imgList04.style.transition = "none";
                        imgList04.style.left = "-173px";
                        scrollImgs04[index04].className = "center";
                    },800);
                }   
            )
            for(let i = 0; i < scrollImgs04.length; i++){
                scrollImgs04[i].className = "";
            }
            scrollImgs04[index04].className = "center";
        }, 5000);
        return timer10;
    }
    let timer10 = autoRun06();

//"为你推荐" tab栏切换
    let recTabArr = document.getElementsByClassName("recommend-tab")[0].getElementsByTagName("li");
    let pagesArr01 = document.getElementsByClassName("recommend-goods-list");
    for(let i = 0; i < recTabArr.length; i++){
        recTabArr[i].onclick = function(){
            for(let j = 0; j < recTabArr.length; j++){
                recTabArr[j].getElementsByTagName("span")[0].className = "";
                recTabArr[j].getElementsByTagName("span")[1].className = "";
                pagesArr01[j].className = "recommend-goods-list _hidden";
            }
            recTabArr[i].getElementsByTagName("span")[0].className = "chosen_radius";
            recTabArr[i].getElementsByTagName("span")[1].className = "chosen_color";
            pagesArr01[i].className = "recommend-goods-list";
        }
    }

//"排行榜" tab栏切换
    let rankTabArr = document.getElementsByClassName("tab-head")[0].getElementsByTagName("a");
    let pagesArr02 = document.getElementsByClassName("top-list");
    for(let i = 0; i < rankTabArr.length; i++){
        rankTabArr[i].onmouseover = function(){
            for(let j = 0; j < rankTabArr.length; j++){
                rankTabArr[j].className = "";
                pagesArr02[j].className = "top-list hidden";
            }
            rankTabArr[i].className = "chosen_ranktab";
            pagesArr02[i].className = "top-list";
        }
    }
//banner tab栏切换
    let bnTabArr = document.getElementsByClassName("menu")[0].getElementsByTagName("li");
    //这里获取了所有的li，有100多个，虽然取多了，但是影响不大，注意循环条件不能写bnTabArr.length
    let pagesArr03 = document.getElementsByClassName("banner-tab");
    for(let i = 0; i < 18; i++){
        bnTabArr[i].onmouseover = function(){
            for(let j = 0; j < 18; j++){
                pagesArr03[j].className = "banner-tab hidden"; 
            }
            pagesArr03[i].className = "banner-tab";
        }
    }
}
// 判断是否是移动端

// if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
//     $(".col-md-4").hide();
// }

$(document).ready(function(){
    // 显示动画
    var scripts = document.getElementsByTagName("script");
    for( var i = 0; i < scripts.length; i ++ ) {
        var regexp = /scrollreveal/;
        var script_val = scripts[i].getAttribute("src");
        if(regexp.test(script_val)) {
            window.sr = ScrollReveal();
            sr.reveal(
                '.scrollreveal',
                {
                    duration: 1000, // 动画持续时间
                    // delay: 1000, // 动画延迟时间
                    distance: "10px", // 距离 可以百分比
                    origin: "bottom", // 动画方向
                    // rotate: {x:0,y:0,z:90}, // 旋转
                    opacity: 0, // 透明度
                    scale: 0.9
                }
            )
        }
    }
    // 开启tip
    $("[data-toggle='tooltip']").tooltip();
    // Moblie
    $(".icon-modlie").click(function(){
        $(".modlie-nav").slideToggle("show");
    });
    // 监控 Moblie
    $(window).resize(function(){
        if($(window).width() >= 768) $(".modlie-nav").hide();    
        $(".search").width($(window).width()).height($(window).height()); // 搜索
        $(".logon").width($(window).width()).height($(window).height()); // 登录 and 注册                  
    });
    // 回到顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $('#go-top').fadeIn();
        }else {
            $('#go-top').fadeOut();
        }
        // 判断是否到了底部
        var scrollTop = $(this).scrollTop();
    　　var scrollHeight = $(document).height();
    　　var windowHeight = $(this).height();
    　　if(scrollTop + windowHeight == scrollHeight){
    　　　　$("#go-top i").css("color","#fff");
    　　}else {
    　　　　$("#go-top i").css("color","#333");            
        }
    });
    $('#go-top').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 500);
    });
    // 点击显示搜索
    $(".search-flag").click(function(){
        $(".search").show();
        // 获取可视区域宽高
        $(".search").width($(window).width()).height($(window).height());
        $(".search").css("transform","scale(1)");
        $(".form-control")[0].focus();
        setTimeout(function(){
            $("body").css("overflow","hidden");
        },500)
    })
    // 关闭搜索
    $(".close-search").click(function(){
        $(".search").css("transform","scale(0)");     
        $(".search").hide();
        $("body").css("overflow","visible");           
    })
    // 点击显示 登录 注册
    // $(".logon-flag").click(function(){
    //     $(".logon").show();
    //     // 获取可视区域宽高
    //     $(".logon").width($(window).width()).height($(window).height());
    //     $(".logon").css("transform","scale(1)");
    //     setTimeout(function(){
    //         $("body").css("overflow","hidden");
    //     },500)
    // })
    // // 登录注册tab切换
    // $(".logon-tab span").click(function(){
    //     $(this).addClass("tab-active").siblings().removeClass("tab-active");
    //     $(".logon ul").eq($(this).index()).css("display","block").siblings("ul").css("display","none");
    // })
    // // 关闭登录 and 注册
    // $(".close-logon").click(function(){
    //     $(".logon").css("transform","scale(0)");     
    //     $(".logon").hide();
    //     $("body").css("overflow","visible");           
    // })
    // 正则
    code_RegExp = {
        // 账号
        user : /^[1-9]\w{5,15}$/,
        code_User : function(str) {
            return this.user.test(str);
        },
        // 密码
        pwd : /^\w{6,16}$/,
        code_Pwd : function(str) {
            return this.pwd.test(str);
        },
        // 邮箱
        email : /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/,
        code_Email : function(str) {
            return this.email.test(str);
        }
    };

    // 提示信息

    (function code_event() {
        var inpus = $(".register input");
        $(".usertip").click(function(){$(this).css("right","-200px")});
        for( var i = 0; i < inpus.length - 2; i ++ ) {
            inpus[i].onblur = function(event) {
                // 兼容写法事件对象
                var event = event || window.event;
                var target = event.target||event.srcElement;
                // 取出所有的className 取出最后一个字符
                var class_name = target.className.charAt(target.className.length - 1);
                if(class_name == "r") { // 验证账号
                    if(!code_RegExp.code_User(this.value)) {
                        re_tip(this,"8px");
                    }
                }else if (class_name == "d") { // 验证密码
                    if(!code_RegExp.code_Pwd(this.value)) {
                        re_tip(this,"8px");
                    }
                }else if (class_name == "l") { // 验证邮箱
                    if(!code_RegExp.code_Email(this.value)) {
                        re_tip(this,"8px");
                    }
                }
            };
            // 获取焦点时隐藏提示
            inpus[i].onfocus = function() {
                re_tip(this,"-200px");
            }
        }
        // 显示隐藏错误提示
        function re_tip(target,val) {
            $(target).siblings(".usertip").css("right",val);
        }
        // 判断是否全部正确
        $(".re_btn").click(function(){
            console.log(code_RegExp.code_User(inpus[0].value));
            if(code_RegExp.code_User(inpus[0].value) == false || code_RegExp.code_Pwd(inpus[1].value) == false || code_RegExp.code_Email(inpus[2].value) == false) {
                alert("请全部填写正确");
            }
        })
    })();
    // 点击复制
    $(".copy").click(function(){
        var copy_val = $(this).siblings("span").text();
        var rep_text = $("#rep_text");
        rep_text.text(copy_val);
        rep_text.select();
        try{
            if(document.execCommand("copy",false,null)) {
                document.execCommand("copy");
                alert("复制成功");
                rep_text.hide();
            }else {
                alert("复制失败，请手动复制");
            }
        } catch(err) {
            alert("复制失败，请手动复制");
        };
        rep_text.show();
    })
})
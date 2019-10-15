var getSign = "http://test.bluedoorindex.com/ydpick/wechat/sign.php";
var data = {};
data.url = location.href.split('#')[0];
data.time = new Date();


function putSign(res) {
    var res = jQuery.parseJSON(res);
    var url = res.url;
    var data = {
        title: '【献礼70华诞】记录你的时代', // 分享标题
        desc: '庆祝新中国成立70周年', // 分享描述
        link: url, // 分享链接
        imgUrl: 'http://test.bluedoorindex.com/ydsdj/img/share.jpg', // 要设置分享图标 !!!!!!
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }

    };
    wx.config({
        debug: 0,
        appId: res["appId"],
        timestamp: res["timestamp"],
        nonceStr: res["nonceStr"],
        signature: res["signature"],
        jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo"
        ]

    });
    wx.ready(function () {
        wx.onMenuShareTimeline(data);
        wx.onMenuShareAppMessage(data);
        wx.onMenuShareQQ(data);
        wx.onMenuShareWeibo(data);

    });
}


function isWechat() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;

    } else {
        return false;

    }
}

if( isWechat() ) {
    $.post( getSign, data, function( res ) {
        //console.log(typeof res);return;
        if(res){
            putSign(res);
        }

    });
}






var globallayIm = null;
var socket = null;
var username;
var loginname;
var avatar;
var curUser;
var onlineUserArray = [];
var websocketUrl = "ws://localhost:8888";
layui.use('layim', function (layim) {
    var $ = layui.jquery;
    globallayIm = layim;
    //var socket = new WebSocket('ws://localhost:8888');

    avatar = $(".navbar-right>.hidden-xs>a>img").attr("src");
    loginname = $("#account").val();
    username = $("#username").val();


    //基础配置
    layim.config({
        //初始化接口
        init: {
            url: Feng.ctxPath + '/assets/common/libs/layui/json/getList.json'
            , data: {}
        },
        title: "即时消息",
        min: true,
        initSkin: "2.jpg"

        //上传图片接口
        , uploadImage: {
            url: Feng.ctxPath + '/upload//Message/Image' //（返回的数据格式见下文）
        }

        //上传文件接口
        , uploadFile: {
            url: Feng.ctxPath + '/upload//Message/File' //（返回的数据格式见下文）

        }
        , notice: true //是否开启桌面消息提醒，默认false
        // ,tool: [{
        //     alias: 'code' //工具别名
        //     ,title: '代码' //工具名称
        //     ,icon: '&#xe64e;' //工具图标，参考图标文档
        // }]
        , msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html' //消息盒子页面地址，若不开启，剔除该项即可
        // , find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
        , chatLog: layui.cache.dir + 'css/modules/layim/html/chatLog.html' //聊天记录页面地址，若不开启，剔除该项即可

    });

    //监听在线状态的切换事件
    layim.on('online', function (data) {
        //console.log(data);
    });

    //监听签名修改
    layim.on('sign', function (value) {
        //console.log(value);
    });

    //监听自定义工具栏点击，以添加代码为例
    layim.on('tool(code)', function (insert) {

        layer.open({
            content: '测试回调',
            success: function (layero, index) {
                console.log(layero, index);
            }
        });
    });

    //监听layim建立就绪
    layim.on('ready', function (res) {

        //console.log(res.mine);
        //添加IM连接
        connect(loginname);

        layim.msgbox(0); //模拟消息盒子有新消息，实际使用时，一般是动态获得

    });

    //监听发送消息
    layim.on('sendMessage', function (data) {
        var To = data.to;
        var Mine = data.mine;

        if (To.type === 'friend') {
            layim.setChatStatus('<span style="color:#FF5722;">对方正在输入。。。</span>');
        }
        var nowTime = Date.parse(new Date());
        var msg = "{\"from\": \"" + Mine.id + "\",\"extras\":{\"fromAvatar\": \"" + Mine.avatar + "\",\"fromUserName\": \"" + username + "\"},\"to\": \"" + To.id + "\",\"cmd\":11,\"createTime\":" + nowTime + ",\"chatType\":\"2\",\"msgType\": \"0\",\"content\": \"" + Mine.content + "\"}";

        socket.send(msg);
    });

    //监听查看群员
    layim.on('members', function (data) {
        console.log(data);
    });

    //监听聊天窗口的切换
    layim.on('chatChange', function (res) {
        var type = res.data.type;
        if (type === 'friend') {
            //模拟标注好友状态
            //layim.setChatStatus('<span style="color:#FF5722;">在线</span>');
        } else if (type === 'group') {
            //模拟系统消息
            layim.getMessage({
                system: true
                , id: res.data.id
                , type: "group"
                , content: '模拟群员' + (Math.random() * 100 | 0) + '加入群聊'
            });
        }
    });
    layim.on("uploadImage", function (res) {
        alert(res.data);
    })

});

function connect(username) {
    // 心跳检测, 每隔一段时间检测连接状态，如果处于连接中，就向server端主动发送消息，来重置server端与客户端的最大连接时间，如果已经断开了，发起重连。
    var heartCheck = {
        timeout: 30000,        // 9分钟发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
        serverTimeoutObj: null,
        reset: function () {

            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function () {
            var self = this;
            this.serverTimeoutObj = setInterval(function () {
                if (socket.readyState == 1) {
                    var heartBeatCmd = "{\"cmd\":13,\"hbtype\":\"1\"}";
                    socket.send(heartBeatCmd);
                    heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
                } else {
                    socket = new WebSocket(websocketUrl);
                }
            }, this.timeout)
        }
    }
    // socket = new WebSocket("ws://127.0.0.1:8888?username=" + username);
    socket = new WebSocket(websocketUrl);
    socket.onopen = function (e) {
        heartCheck.reset().start();   // 成功建立连接后，重置心跳检测
        var userCmd = "{\"cmd\":17,\"type\":\"0\",\"userid\":\"" + username + "\"}";
        var msgCmd = "{\"cmd\":19,\"type\":\"0\",\"userId\":\"" + username + "\"}";
        socket.send(userCmd);//获取登录用户信息;
        socket.send(msgCmd);//获取用户离线消息(好友+群组);
    }
    socket.onmessage = function (e) {
        heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
        var data = e.data;
        var dataObj = eval("(" + data + ")");//转换为json对象
        if (dataObj.command == 11) {//接收到聊天响应处理;
            COMMAND_CHAT_RESP(dataObj.data);
        } else if (dataObj.command == 18) {//获取用户信息响应处理;
            COMMAND_GET_USER_RESP(dataObj);
        } else if (10000 == dataObj.code && dataObj.command == 12) {//聊天发送状态;
            COMMAND_CHAT_RESP_SEND_STATUS(data);
        } else if (dataObj.command == 9) {//加入群组的消息通知处理;
            COMMAND_JOIN_GROUP_NOTIFY_RESP(dataObj);
        } else if (dataObj.command == 10) {
            COMMAND_EXIT_GROUP_NOTIFY_RESP(dataObj);
        } else if (dataObj.command == 20 && dataObj.code == 10016) {//处理离线消息;
            var msgFlag = "离线消息";
            COMMAND_GET_MESSAGE_RESP(dataObj, msgFlag);
        } else if (dataObj.command == 20 && dataObj.code == 10018) {//处理历史消息;
            var msgFlag = "历史消息";
            var msgObj = dataObj.data;
            if (msgObj) {
                COMMAND_GET_MESSAGE_RESP(dataObj, msgFlag);
            } else {//没有历史消息;
                OTHER(data);
            }
        } else {
            OTHER(data);
        }

    };
}

function COMMAND_EXIT_GROUP_NOTIFY_RESP(data) {
    var exitGroupNotify = data.data;
    globallayIm.setFriendStatus(exitGroupNotify.user.id, 'offline');
    //logDiv.innerHTML+="<font color='#A3A3A3' size='1'>"+exitGroupNotify.user.nick+"("+exitGroupNotify.user.id+")退出群聊...</font><br>";
    //socket.send(onlineUserCmd);//获取在线用户列表;
}

//加入群组的消息通知处理;
function COMMAND_JOIN_GROUP_NOTIFY_RESP(data) {
    var joinGroupNotify = data.data;

    globallayIm.setFriendStatus(joinGroupNotify.user.id, 'online');
    //logDiv.innerHTML+="<font color='#A3A3A3' size='1'>"+joinGroupNotify.user.nick+"("+joinGroupNotify.user.id+")加入群聊...</font><br>";
    // socket.send(onlineUserCmd);//获取在线用户列表;
}

//加入群组响应状态处理;
function COMMAND_JOIN_GROUP_RESP(data) {
    //成功加入群组响应信息;
}

//发送聊天请求发送状态处理;
function COMMAND_CHAT_RESP_SEND_STATUS(data) {
    //发送成功后的状态处理...
}

//获取用户信息响应处理;
function COMMAND_GET_USER_RESP(data) {
    var onlineUsers = data.data;

    if (data.code == 10003) {
        curUser = onlineUsers[0];
    } else if (data.code == 10005) {
        onlineUserArray = [];
        for (var i = 0; i < onlineUsers.length; i++) {

            globallayIm.setFriendStatus(onlineUsers[i].id, 'online');
            //onlineUserArray.push(onlineUsers[i]);
        }
        //initOnlineUsers();
    }
}

//接收到聊天响应处理;
function COMMAND_CHAT_RESP(data) {
    var chatObj = data;
    var createTime = DateUtils.formt(chatObj.createTime, "yyyy/MM/dd HH:mm:ss");
    var from = chatObj.from;
    if (from == username)
        return;
    var content = chatObj.content;

    if (chatObj.msgType == 6) {
        var parms = JSON.parse(chatObj.extras.parms);
        var type = chatObj.extras.type;
        content = "[div class=im-msg data-id=" + parms.id + " data-type=" + type + "] [span class=emp]  " + content + "  [/span][span class=more]点击查看详情[/span][/div]"

        toastr.info(chatObj.content, chatObj.from, {
            onclick: function () {

            },
            positionClass: "toast-top-right",
        });
    } else if (chatObj.msgType == 7) {
        toastr.warning(chatObj.content, "新消息提醒", {
            onclick: function () {

            }
        });
    } else if (chatObj.msgType == 8) {
        toastr.error(chatObj.content, "新消息提醒", {
            onclick: function () {

            }
        });
    } else {
        // chatObj.content = "[div class=complaint]"+content+"[/div]";
    }

    var obj = {
        username: chatObj.extras.fromUserName
        , avatar: chatObj.extras.fromAvatar
        , id: chatObj.from
        , type: "friend"
        , content: content
    }

    globallayIm.getMessage(obj);


}

//处理用户同步+持久化消息
function COMMAND_GET_MESSAGE_RESP(data, msgFlag) {
    var msgObj = data.data;
    friendOfflineMessage(msgObj, msgFlag);
    groupOfflineMessage(msgObj, msgFlag);
}

//好友消息
function friendOfflineMessage(msgObj, msgFlag) {
    var friends = msgObj.friends;
    for (var key in friends) {
        var chatDatas = friends[key];
        for (var index in chatDatas) {
            COMMAND_CHAT_RESP(chatDatas[index])
        }
    }
}

//群组消息
function groupOfflineMessage(msgObj, msgFlag) {
    var groups = msgObj.groups;
    for (var key in groups) {
        var chatDatas = groups[key];
        for (var index in chatDatas) {
            COMMAND_CHAT_RESP(chatDatas[index])
        }
    }
}

//其它信息处理;
function OTHER(data) {
    //处理数据
    //logDiv.innerHTML+="<font color='green' size='1'>"+data+"</font><br>";
}

function initOnlineUsers() {
    globallayIm.removeList({
        type: 'group' //或者group
        , id: 2 //好友或者群组ID
    });
    for (var i = 0; i < onlineUserArray.length; i++) {
        var item = onlineUserArray[i];
        if (item.nick == username) continue;
        globallayIm.addList({
            type: 'friend' //列表类型，只支持friend和group两种
            , avatar: item.avatar //好友头像
            , username: item.nick //好友昵称
            , groupid: 2 //所在的分组id
            , id: item.id//好友id
        })
    }
}

var SAKURA_WIDTH = 110, SAKURA_HEIGHT = 108, LEAF_WIDTH = 108, LEAF_HEIGHT = 108;

var mouse_wind = 0.0;

var DPR;
//定义两个对象数据
//分别是drops下落物体对象
//和反弹物体bounces对象
var drops = [], bounces = [];
//这里设定重力加速度为0.2/一帧
var gravity = 0.2;
var speed_x_x, //横向加速度
    speed_x_y, //纵向加速度
    wind_anger; //风向
//画布的像素宽高
var canvasWidth,
    canvasHeight;
//创建drop的几率
var drop_chance;
//配置对象
var OPTS;
//判断是否有requestAnimationFrame方法，如果有则使用，没有则大约一秒30帧
window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 30);
    };

//image
var image_leaf = new Image()
var image_sakura = new Image()

var global_avoid_status = true;
var total_avoid_status = false;
function GLOBAL_AVOID() {
    var status = !global_avoid_status;
    global_avoid_status = status;
    if (status) {
        //stop

    } else {
        //start
        if (total_avoid_status) {
            total_avoid_status = false;
            requestAnimFrame(update);
        }
    }
}

var Vector = function (x, y) {
    //私有属性 横向速度x ,纵向速度y
    this.x = x || 0;
    this.y = y || 0;
};
//公有方法- add : 速度改变函数,根据参数对速度进行增加
//由于业务需求，考虑的都是下落加速的情况，故没有减速的，后期可拓展
/*
* @param v object || string 
*/
Vector.prototype.add = function (v) {
    if (v.x != null && v.y != null) {
        this.x += v.x;
        this.y += v.y;
    } else {
        this.x += v;
        this.y += v;
    }
    return this;
};
//公有方法- copy : 复制一个vector，来用作保存之前速度节点的记录
Vector.prototype.copy = function () {
    //返回一个同等速度属性的Vector实例
    return new Vector(this.x, this.y);
};





//Drop 下落物体对象， 即上面效果中的雨滴和雪， 在后面你也可自己拓展为陨石或者炮弹
//对于Drop对象其基本定义如下
//构造函数
//构造函数 Drop
var Drop = function () {
    //随机设置drop的初始坐标 
    /*
    //首先随机选择下落对象是从从哪一边
    var randomEdge = Math.random() * 2;
    if (randomEdge > 1) {
        this.pos = new Vector(50 + Math.random() * canvas.width, -80);
    } else {
        this.pos = new Vector(canvas.width, Math.random() * canvas.height);
    }
    */
    this.pos = new Vector(Math.random() * canvas.width, 0);
    //设置下落元素的大小
    //通过调用的OPTS函数的半径范围进行随机取值
    this.radius = (OPTS.size_range[0] + Math.random() * (OPTS.size_range[1] - OPTS.size_range[0])) * DPR;
    //获得drop初始速度
    //通过调用的OPTS函数的速度范围进行随机取值
    this.speed = (OPTS.speed[0] + Math.random() * (OPTS.speed[1] - OPTS.speed[0])) * DPR;
    this.prev = this.pos;
    //将角度乘以 0.017453293 （2PI/360）即可转换为弧度。
    //var eachAnger = 0.017453293;
    //获得风向的角度
    //wind_anger = OPTS.wind_direction * eachAnger;
    //获得横向加速度 
    this.max_speed_x = OPTS.max_wind * Math.random();
    //获得纵向加速度
    speed_y = this.speed;
    //绑定一个速度实例
    this.vel = new Vector(0, speed_y);

    this.rotate_speed = (OPTS.rotate_speed[0] + Math.random() * (OPTS.rotate_speed[1] - OPTS.rotate_speed[0])) * 0.017453293;
    this.current_rotate = (Math.random() * 360) * 0.017453293;
};
//公有方法-update 
Drop.prototype.update = function () {
    this.prev = this.pos.copy();
    //如果是有重力的情况，则纵向速度进行增加
    if (OPTS.hasGravity) {
        this.vel.y += gravity;
    }
    this.vel.x = this.max_speed_x * mouse_wind;
    //
    this.pos.add(this.vel);

    if (OPTS.rotate) {
        this.current_rotate += this.rotate_speed;
        if (this.current_rotate >= Math.PI * 2) {
            this.current_rotate -= Math.PI * 2;
        }
    }

};
//公有方法-draw
Drop.prototype.draw = function () {
    //rain 即贝塞尔曲线
    if (OPTS.type == "rain") {
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.moveTo(this.prev.x, this.prev.y);
        var ax = Math.abs(this.radius * Math.cos(wind_anger));
        var ay = Math.abs(this.radius * Math.sin(wind_anger));
        ctx.bezierCurveTo(this.pos.x + ax, this.pos.y + ay, this.prev.x + ax, this.prev.y + ay, this.pos.x, this.pos.y);
        ctx.stroke();
        //snow--即圆形 
    } else if (OPTS.type == "snow") {
        ctx.beginPath();
        //ctx.moveTo(this.pos.x, this.pos.y);
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    } else if (OPTS.type == "leaf") {
        ctx.translate(this.pos.x - LEAF_WIDTH * this.radius / 2, this.pos.y - LEAF_HEIGHT * this.radius / 2);
        ctx.rotate(this.current_rotate);
        ctx.drawImage(image_leaf, - (LEAF_WIDTH * this.radius / 2), - (LEAF_HEIGHT * this.radius / 2), LEAF_WIDTH * this.radius, LEAF_HEIGHT * this.radius);
        ctx.rotate(-this.current_rotate);
        ctx.translate(-(this.pos.x - LEAF_WIDTH * this.radius / 2), -(this.pos.y - LEAF_HEIGHT * this.radius / 2));
    } else {
        ctx.translate(this.pos.x - SAKURA_WIDTH * this.radius / 2, this.pos.y - SAKURA_HEIGHT * this.radius / 2);
        ctx.rotate(this.current_rotate);
        ctx.drawImage(image_sakura, - (SAKURA_WIDTH * this.radius / 2), - (SAKURA_HEIGHT * this.radius / 2), SAKURA_WIDTH * this.radius, SAKURA_HEIGHT * this.radius);
        ctx.rotate(-this.current_rotate);
        ctx.translate(-(this.pos.x - SAKURA_WIDTH * this.radius / 2), -(this.pos.y - SAKURA_HEIGHT * this.radius / 2));
    }

};

var Bounce = function (x, y) {
    var dist = Math.random() * 7;
    var angle = Math.PI + Math.random() * Math.PI;
    this.pos = new Vector(x, y);
    this.radius = 0.2 + Math.random() * 0.8;
    this.vel = new Vector(
        Math.cos(angle) * dist,
        Math.sin(angle) * dist
    );
};
Bounce.prototype.update = function () {
    this.vel.y += gravity;
    this.vel.x *= 0.95;
    this.vel.y *= 0.95;
    this.pos.add(this.vel);
};
Bounce.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius * DPR, 0, Math.PI * 2);
    ctx.fill();
};



function update() {
    if (global_avoid_status && drops.length == 0 && bounces.length == 0) {
        total_avoid_status = true;
        return;
    }
    var d = new Date;
    //清理画图
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var i = drops.length;
    while (i--) {
        var drop = drops[i];
        drop.update();
        //如果drop实例下降到底部，则需要在drops数组中清楚该实例对象
        if (drop.pos.x <= 0 || drop.pos.x >= canvas.width) {
            //直接移除
            drops.splice(i, 1);
        } else if (drop.pos.y >= canvas.height) {
            //如果需要回弹，则在bouncess数组中加入bounce实例
            if (OPTS.hasBounce) {
                var n = Math.round(4 + Math.random() * 4);
                while (n--)
                    bounces.push(new Bounce(drop.pos.x, canvas.height));
            }
            //如果drop实例下降到底部，则需要在drops数组中清楚该实例对象
            drops.splice(i, 1);
        }
        drop.draw();
    }
    //如果需要回弹
    if (OPTS.hasBounce) {
        var i = bounces.length;
        while (i--) {
            var bounce = bounces[i];
            bounce.update();
            bounce.draw();
            if (bounce.pos.y > canvas.height) bounces.splice(i, 1);
        }
    }
    //每次产生的数量
    if (!global_avoid_status) {
        if (drops.length < OPTS.maxNum) {
            if (Math.random() < drop_chance) {
                var i = 0,
                    len = OPTS.numLevel;
                for (; i < len; i++) {
                    drops.push(new Drop());
                }
            }
        }
    }

    //不断循环update
    requestAnimFrame(update);
}

function init(opts) {
    OPTS = opts;
    canvas = document.getElementById(opts.id);
    ctx = canvas.getContext("2d");
    ////兼容高清屏幕，canvas画布像素也要相应改变
    DPR = window.devicePixelRatio;
    //canvas画板像素大小， 需兼容高清屏幕，故画板canvas长宽应该乘于DPR
    canvasWidth = canvas.clientWidth * DPR;
    canvasHeight = canvas.clientHeight * DPR;
    //设置画板宽高
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drop_chance = opts.drop_chance;
    image_leaf.src = "./assets/leaf.png";
    image_sakura.src = "./assets/sakura.png";
    //设置样式
    setStyle();
}
function setStyle() {
    if (OPTS.type == "rain") {
        ctx.lineWidth = 1 * DPR;
        ctx.strokeStyle = 'rgba(223,223,223,0.6)';
        ctx.fillStyle = 'rgba(223,223,223,0.6)';
    } else if (OPTS.type == "snow") {
        ctx.lineWidth = 2 * DPR;
        ctx.strokeStyle = 'rgba(254,254,254,0.8)';
        ctx.fillStyle = 'rgba(254,254,254,0.8)';
    } else {
        //pass
    }
}


function global_startup_fx() {
    var date = new Date;
    var month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) {
        init_sakura();
    } else if (month >= 6 && month <= 8) {
        init_rain();
    } else if (month >= 9 && month <= 11) {
        init_leaf();
    } else {
        init_snow();
    }
    requestAnimFrame(update);
}
function init_leaf() {
    init({
        type: "leaf", // drop类型，有rain / snow / leaf /sakura
        speed: [1.5, 2.5], //速度范围
        size_range: [0.1, 0.4],//大小半径范围
        rotate: true,
        rotate_speed: [1, 2],
        hasBounce: false, //是否有反弹效果or false,
        max_wind: 10,
        hasGravity: false, //是否有重力考虑
        id: "canvas-particle",
        maxNum: 300,
        numLevel: 2,
        drop_chance: 0.1
    });
}
function init_sakura() {
    init({
        type: "sakura", // drop类型，有rain / snow / leaf /sakura
        speed: [1.5, 2.5], //速度范围
        size_range: [0.1, 0.2],//大小半径范围
        rotate: true,
        rotate_speed: [1, 2],
        hasBounce: false, //是否有反弹效果or false,
        max_wind: 10,
        hasGravity: false, //是否有重力考虑
        id: "canvas-particle",
        maxNum: 300,
        numLevel: 2,
        drop_chance: 0.1
    });
}
function init_rain() {
    init({
        type: "rain", // drop类型，有rain / snow / leaf /sakura
        speed: [0.4, 2.5], //速度范围
        size_range: [0.5, 1.5],//大小半径范围
        rotate: false,
        rotate_speed: [1, 2],
        hasBounce: true, //是否有反弹效果or false,
        max_wind: 10,
        hasGravity: true, //是否有重力考虑
        id: "canvas-particle",
        maxNum: 300,
        numLevel: 5,
        drop_chance: 0.4
    });
}
function init_snow() {
    init({
        type: "snow", // drop类型，有rain / snow / leaf /sakura
        speed: [1.0, 2.5], //速度范围
        size_range: [3, 5],//大小半径范围
        rotate: false,
        rotate_speed: [1, 2],
        hasBounce: false, //是否有反弹效果or false,
        max_wind: 10,
        hasGravity: false, //是否有重力考虑
        id: "canvas-particle",
        maxNum: 300,
        numLevel: 5,
        drop_chance: 0.2
    });
}
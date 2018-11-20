window.addEventListener("load", start);
document.addEventListener("DOMSubtreeModified", remove_url);
document.addEventListener("DOMSubtreeModified", remove_theme);
document.addEventListener("DOMSubtreeModified", add_switch);
document.addEventListener("DOMSubtreeModified", add_mouse_switch);
document.addEventListener("DOMSubtreeModified", add_kawaii_switch);
document.addEventListener("mousemove", mouse_move);

kawaii_voice = false;

function start() {
    add_kawaii();
    add_bk();
    remove_url();
    remove_theme();
    global_startup_fx();
    add_switch();
    add_mouse_switch();
    add_kawaii_switch();
    check_kawaii_status();
}

function check_mobile() {
    //平台、设备和操作系统
    var system = { win: false, mac: false, xll: false };
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    return (!system.win && !system.mac && !system.xll);
}

function mouse_move(e) {
    if (ban_mouse_wind) return;
    var e = window.event || arguments[0];
    var half = canvasWidth / 2;
    mouse_wind = (e.clientX - half) / half;
}

//add a blur
function add_bk() {
    var body = document.body;
    var item = document.createElement("div");
    var particle = document.createElement("canvas")
    //var dark = document.createElement("div");

    var date = new Date;
    var month = date.getMonth() + 1;
    var season = "";
    if (month >= 3 && month <= 5) {
        season = "spring";
    } else if (month >= 6 && month <= 8) {
        season = "summer";
    } else if (month >= 9 && month <= 11) {
        season = "autumn";
    } else {
        season = "winter";
    }
    item.style.cssText = "background: url(./assets/bg-" + season + ".jpg) no-repeat center center fixed; background-size: cover;";

    //dark.classList.add("bg-dark");
    item.classList.add("bg-blur");
    particle.id = "canvas-particle"
    //body.prepend(dark);
    body.prepend(item);
    body.append(particle);
}

function add_kawaii() {
    var body = document.body;
    var item = document.createElement("div");
    if (check_mobile()) {
        item.innerHTML = "<img class=\"img-kawaii-lite\" src=\"./assets/kawakaze-lite.png\"></img>";
        item.classList.add("div-kawaii-lite");
    } else {
        item.innerHTML = "<img class=\"img-kawaii\" src=\"./assets/kawakaze.png\"></img>";
        item.classList.add("div-kawaii");
    }

    item.addEventListener("click", touch_kawaii);
    body.append(item);

    //insert audio
    var audio = document.createElement("audio");
    if (!(audio.canPlayType && "" != audio.canPlayType('audio/ogg;codecs="vorbis"'))) return;
    audio.classList.add("kawaii-audio");
    audio.loop = false;
    audio.autoplay = false;
    audio.volume = 0.2;
    audio.type = "audio/ogg";
    audio.src = "./assets/kawakaze.ogg";
    audio.load();
    body.append(audio);
}

function touch_kawaii() {
    if ($(".kawaii-audio").length == 0) return;
    //if (!kawaii_voice) return;
    var audio = document.getElementsByClassName("kawaii-audio")[0];
    if (!audio.paused) audio.pause();
    audio.currentTime = 0;
    audio.play();
}

function remove_url() {
    if ($(".gitbook-link").length > 0) {
        var link = document.getElementsByClassName("gitbook-link");
        link[0].parentNode.removeChild(link[0]);
    }
}

function remove_theme() {
    if ($(".size-3").length == 3) {
        var link = document.getElementsByClassName("size-3");
        link[1].parentNode.removeChild(link[1]);
        link[0].classList.add("size-2");
        link[0].classList.remove("size-3");
        link[0].classList.add("size-2");
        link[0].classList.remove("size-3");
    }
}

function add_switch() {
    if ($(".particle-switch-btn").length != 0) return;
    var summary = document.getElementsByClassName("book-summary")[0];
    var btn = document.createElement("button");
    btn.style = "width:95%;margin-top:20px;";
    btn.innerHTML = "我有高性能CPU/GPU: " + (global_avoid_status ? "否" : "是");
    btn.classList.add("particle-switch-btn");
    btn.id = "switch";
    btn.addEventListener("click", switch_btn_click);
    summary.append(btn);
}

function switch_btn_click() {
    GLOBAL_AVOID();
    document.getElementsByClassName("particle-switch-btn")[0].innerHTML = "我有高性能CPU/GPU: " + (global_avoid_status ? "否" : "是");
}

function add_kawaii_switch() {
    if ($(".kawaii-voice-switch-btn").length != 0) return;
    var summary = document.getElementsByClassName("book-summary")[0];
    var btn = document.createElement("button");
    btn.style = "width:95%;margin-top:5px;";
    btn.innerHTML = "我是萌豚: " + (kawaii_voice ? "是" : "否");
    btn.classList.add("kawaii-voice-switch-btn");
    btn.id = "switch";
    btn.addEventListener("click", kawaii_switch_btn_click);
    summary.append(btn);
}

function kawaii_switch_btn_click(){
    kawaii_voice = !kawaii_voice;
    check_kawaii_status();
    document.getElementsByClassName("kawaii-voice-switch-btn")[0].innerHTML = "我是萌豚: " + (kawaii_voice ? "是" : "否");
}

function check_kawaii_status(){
    if (kawaii_voice){
        if ($(".div-kawaii").length>0){
            document.getElementsByClassName("div-kawaii")[0].style="";
        }else{
            document.getElementsByClassName("div-kawaii-lite")[0].style="";
        }
    }else{
        if ($(".div-kawaii").length>0){
            document.getElementsByClassName("div-kawaii")[0].style="display: none;";
        }else{
            document.getElementsByClassName("div-kawaii-lite")[0].style="display: none;";
        }
    }
}

function add_mouse_switch() {
    if ($(".mouse-switch-btn").length != 0) return;
    var summary = document.getElementsByClassName("book-summary")[0];
    var btn = document.createElement("button");
    btn.style = "width:95%;margin-top:5px;";
    btn.innerHTML = "禁用鼠标移动效果: " + (ban_mouse_wind ? "是" : "否");
    btn.classList.add("mouse-switch-btn");
    btn.id = "switch";
    btn.addEventListener("click", switch_mouse_btn_click);
    summary.append(btn);
}

function switch_mouse_btn_click() {
    if (ban_mouse_wind){
        ban_mouse_wind = false;
    } else {
        ban_mouse_wind = true;
        mouse_wind = -0.2;
    }
    document.getElementsByClassName("mouse-switch-btn")[0].innerHTML = "禁用鼠标移动效果: " + (ban_mouse_wind ? "是" : "否");
}
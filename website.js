window.addEventListener("load", start);
document.addEventListener("DOMSubtreeModified", remove_url);
document.addEventListener("DOMSubtreeModified", remove_theme);

function start(){
    add_kawaii();
    add_bk();
    remove_url();
    remove_theme();
    global_startup_fx();
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
    particle.id="canvas-particle"
    //body.prepend(dark);
    body.prepend(item);
    body.append(particle);
}

function add_kawaii() {
    var body = document.body;
    var item = document.createElement("div");
    item.innerHTML = "<img class=\"img-kawaii\" src=\"./assets/kawakaze.png\"></img>";
    item.classList.add("div-kawaii");
    item.addEventListener("click", GLOBAL_AVOID);
    body.append(item);
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

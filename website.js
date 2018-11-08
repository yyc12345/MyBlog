window.addEventListener("load", add_blur);
window.addEventListener("load", add_kawaii);
window.addEventListener("load", remove_url);

//add a blur
function add_blur() {
    var body = document.body;
    var item = document.createElement("div");
    var dark = document.createElement("div");
    item.innerHTML = "<img class=\"img-blur\" src=\"./assets/bg.png\"></img>"
    dark.classList.add("bg-dark");
    item.classList.add("bg-blur");
    body.prepend(dark);
    body.prepend(item);
}

function add_kawaii() {
    var body = document.body;
    var item = document.createElement("div");
    item.innerHTML = "<img class=\"img-kawaii\" src=\"./assets/kawakaze.png\"></img>";
    item.classList.add("div-kawaii");
    body.append(item);
}

function remove_url() {
    var link = document.getElementsByClassName("gitbook-link");
    link[0].parentNode.removeChild(link[0]);
}

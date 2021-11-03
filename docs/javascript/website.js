window.addEventListener("load", remove_url);
//document.addEventListener("DOMSubtreeModified", remove_url);

function remove_url() {
    var shitNav = document.querySelector('nav.md-footer__inner');
    shitNav.parentNode.removeChild(shitNav);

    var shitCopyright = document.querySelector('div.md-footer-copyright');
    shitCopyright.innerHTML="Powered by <a href=\"https://www.mkdocs.org\">MkDocs</a> and <a href=\"https://squidfunk.github.io/mkdocs-material/\">Material for MkDocs</a>. Text is available under the <a href=\"https://creativecommons.org/licenses/by-nc-sa/4.0/\">CC-BY-NC-SA 4.0</a>.";

}
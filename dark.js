let switchMode = document.getElementById("switchMode");

switchMode.onclick = function () {
    let theme = document.getElementById("mode");
    
    if (theme.getAttribute("href") == "octo.css") {
        theme.href = "dark.css";
    }
    else {
        theme.href = "octo.css";
    }
}
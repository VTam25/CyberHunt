
function go(){
    var name_input = document.getElementById("user").value;
    localStorage.setItem("name", name_input);

    var code = document.getElementById("code").value;
    localStorage.setItem("game_code", code);
}
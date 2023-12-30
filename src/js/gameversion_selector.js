function selection_loadDefault() {
    var dropdown = document.getElementById("version_select");
    dropdown.value = "0";
}
function handleSFChange() {
    var dropdown = document.getElementById("version_select");
    var selectedValue = dropdown.options[dropdown.selectedIndex].value;
    if (selectedValue == "1"){
        location.href = `/DLS-Player-search/DLS23/search23.html`;
    }
    if (selectedValue == "2"){
        location.href = `/DLS-Player-search/DLS23/search24.html`;
    }
}

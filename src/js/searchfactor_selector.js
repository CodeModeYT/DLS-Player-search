function selection_loadDefault() {
    var selectElement = document.getElementById("searchFactorSelector");
    selectElement.value = "select";
}
function handleSFChange() {
    var dropdown = document.getElementById("searchFactorSelector");
    var selectedValue = dropdown.options[dropdown.selectedIndex].value;
    var headerInfo = {
        "playerName": ['Name', 'DLS Player Search', ''],
        "playerOverall": ['Rating (overall)', 'DLS Player Search', ''],
        "playerPrice": ['Price', 'DLS Player Search', ''],
        "playerNationality": ['Nationality', 'DLS Player Search', ''],
        "playerClub": ['Club', 'DLS Player Search', ''],
        "playerPosition": ['Position', 'DLS Player Search', ''],
        "playerFoot": ['Foot', 'DLS Player Search', ''],
        "playerHeight": ['Height', 'DLS Player Search', ''],
        "playerSpeed": ['Speed rating', 'DLS Player Search', ''],
        "playerAcceleration": ['Acceleration rating', 'DLS Player Search', ''],
        "playerStamina": ['Stamina rating', 'DLS Player Search', ''],
        "playerControl": ['Control rating', 'DLS Player Search', ''],
        "playerStrength": ['Strength rating', 'DLS Player Search', ''],
        "playerTackling": ['Tackling rating', 'DLS Player Search', ''],
        "playerPassing": ['Passing rating', 'DLS Player Search', ''],
        "playerShooting": ['Shooting rating', 'DLS Player Search', ''],
        "playerHandling": ['Handling rating', 'DLS Player Search', ''],
        "playerReactions": ['Reactions rating', 'DLS Player Search', ''],
        "playerTotStats": ['Total Stats', 'DLS Player Search', 'value'],
    };
    var header = headerInfo[selectedValue];

    if (header) {
        loadHeader(23, `Search for ${header[0]}`, header[1]);
        document.getElementById("searchInput").placeholder = `Enter a ${header[0]} ${header[2]}...`;
    }
    if (selectedValue == "select"){
        loadHeader(23, "Select search factor","DLS player search");
        document.getElementById("searchInput").placeholder = `Select a search factor`;
    }
}

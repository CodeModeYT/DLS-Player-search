const AltText = "";
function setDefaultImage(rating) {
    const PlayerPhotoDiv = document.getElementById('playerPhoto');
    if (rating >= 80) {
        PlayerPhotoDiv.innerHTML = `
            <img src="/DLS-Player-search/Data/system_images/legendary.png" alt="${AltText}" width=220 height=220>
        `;
    } else if (rating >= 70) {
        PlayerPhotoDiv.innerHTML = `
            <img src="/DLS-Player-search/Data/system_images/rare.png" alt="${AltText}" width=220 height=220>
        `;
    } else if (rating < 70) {
        PlayerPhotoDiv.innerHTML = `
            <img src="/DLS-Player-search/Data/system_images/common.png" alt="${AltText}" width=220 height=220>
        `;
    } else {
        PlayerPhotoDiv.innerHTML = `
            <img src="/DLS-Player-search/Data/system_images/secret.png" alt="${AltText}" width=220 height=220>
        `;
    }
}
function hidePlayerData() {
    document.getElementById('player_controls').style.display = 'none';
    document.getElementById('playerData').style.display = 'none';
    document.getElementById('playerStats').style.display = 'none';
    document.getElementById('totalStats').style.display = 'none';
    document.getElementById('playerPhoto').style.display = 'none';
    document.getElementById('GKStats').style.display = 'none';
    document.getElementById('controls_counter').style.display = 'none';
}
function redisplayPlayerData() {
    document.getElementById('player_controls').style.display = 'block';
    document.getElementById('playerData').style.display = 'block';
    document.getElementById('playerStats').style.display = 'block';
    document.getElementById('totalStats').style.display = 'block';
    document.getElementById('playerPhoto').style.display = 'block';
    document.getElementById('GKStats').style.display = 'block';
}

function setWindowTitlePlayer(playerFullName){
    document.title = "Searching for: " + playerFullName;
}
function setWindowTitleError(){
    document.title = "DLS player search";
}
function playerNotFound(playerName, searchType){
    const divID = PlayerNotFound;
    document.getElementById('PlayerNotFound').style.display = 'block';
    divID.innerHTML = `<h1>Player ${searchType} "${playerName}" not found!</h1><h2>Player Not Found. Did they get red-carded out of the database?</h2><p>Please be aware of the fact that the player database is unofficial and its validity or completeness cannot be guaranteed.</p>`;
}
function hideNotFound(){
    document.getElementById('PlayerNotFound').style.display = 'none';
}
function updateControlsCounter(totalPlayers, currentIndex) {
    const controlsDivID = 'controls_counter';
    let currentPlayer = currentIndex + 1;
    document.getElementById('player_controls').style.display = 'block';
    document.getElementById(controlsDivID).style.display = 'block';
    document.getElementById(controlsDivID).innerHTML = `<p>${currentPlayer}/${totalPlayers}</p>`;
}
function emptyPlayerError(searchType){
    const divID = PlayerNotFound;
    document.getElementById('PlayerNotFound').style.display = 'block';
    divID.innerHTML = `<h1>Please enter a player ${searchType}!</h1><h2><b>Goalpost Without a Striker:</b> We need a valid player ${searchType} to take the shot. Please enter one!</h2>`;
}


fetch('/DLS-Player-search/Data/json/players_23.json')
    .then(response => response.json())
    .then(data => {
        const playersData = data;
        let matchingPlayers = [];
        let currentIndex = -1;

        function searchPlayer() {
            var dropdown = document.getElementById("searchFactorSelector");
            var selectedValue = dropdown.options[dropdown.selectedIndex].value;
            

            if (selectedValue == "select") {
                document.getElementById('selectSearchFactorErr').style.display = 'block';
            }
            if (selectedValue !== "select"){
                document.getElementById('selectSearchFactorErr').style.display = 'none';
            }
            if (selectedValue == "playerName") {
                const playerName = document.getElementById('searchInput').value.trim();
                matchingPlayers = playersData.filter(player => {
                    const fullName = `${player["First Name"]} ${player["Last Name"]}`.toLowerCase();
                    return fullName.includes(playerName.toLowerCase());
                });
                if (matchingPlayers.length > 0) {
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex], "name");
                } 
                else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(playerName, "with the name");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerOverall") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("rating");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Rating"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "rating");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerPrice") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("with a price of");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Price"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a price of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerNationality") {
                const rawinput = document.getElementById('searchInput').value.trim();
                matchingPlayers = playersData.filter(player => {
                    const res = `${player["Nationality"]}`.toLowerCase();
                    return res.includes(rawinput.toLowerCase());
                });
                if (matchingPlayers.length > 0) {
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex], "nationality");
                } 
                else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(rawinput, "with a nationality of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerClub") {
                const rawinput = document.getElementById('searchInput').value.trim();
                matchingPlayers = playersData.filter(player => {
                    const res = `${player["Club"]}`.toLowerCase();
                    return res.includes(rawinput.toLowerCase());
                });
                if (matchingPlayers.length > 0) {
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex], "club");
                } 
                else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(rawinput, "with a club of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerPosition") {
                const rawinput = document.getElementById('searchInput').value.trim();
                matchingPlayers = playersData.filter(player => {
                    const res = `${player["Position"]}`.toLowerCase();
                    return res.includes(rawinput.toLowerCase());
                });
                if (matchingPlayers.length > 0) {
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex], "position (short form)");
                } 
                else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(rawinput, "with a position (short form) of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerFoot") {
                const rawinput = document.getElementById('searchInput').value.trim();
                matchingPlayers = playersData.filter(player => {
                    const res = `${player["Foot"]}`.toLowerCase();
                    return res.includes(rawinput.toLowerCase());
                });
                if (matchingPlayers.length > 0) {
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex], "foot");
                } 
                else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(rawinput, "with a foot of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerHeight") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("height");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Height (cm)"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a height of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerSpeed") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("speed");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Speed"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a speed of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerAcceleration") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("acceleration");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Acceleration"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with an acceleration of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerStamina") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("stamina value");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Stamina"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a stamina of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerControl") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("control value");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Control"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a control value of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerStrength") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("strength vaöue");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Strength"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a strength value of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerTackling") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("tackling value");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Tackling"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a tackling value of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerPassing") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("passing value");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Passing"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a passing value of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerShooting") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("shooting value");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Shooting"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a shooting value of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerHandling") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("handling value");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Handling (GK)"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a handling value of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerReactions") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("reactions value");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Reactions (GK)"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a reactions value of");
                    currentIndex = -1;
                }
            }
            if (selectedValue == "playerTotStats") {
                const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());          
                if (isNaN(ratingInput)) {
                    hidePlayerData();
                    setWindowTitleError();
                    emptyPlayerError("total stats value");
                    return;
                }
                matchingPlayers = playersData.filter(player => {
                    const playerRating = parseFloat(player["Total Stats"]);
                    return playerRating === ratingInput;
                });
                if (matchingPlayers.length > 0) { 
                    currentIndex = 0;
                    displayPlayerData(matchingPlayers[currentIndex]);
                    togglePlayerControls();
                } else {
                    hidePlayerData();
                    setWindowTitleError();
                    playerNotFound(ratingInput, "with a total stats value of");
                    currentIndex = -1;
                }
            }
        }
        
        //--------------------------------------------------------------------------------------------------------------------
        // THE CODE IN THE FOLLOWING IS A FUTURE PLAN FOR MAKING THE SEARCH WITH DIFFERENT FACTORS CLEANER BY USING FUNCTIONS
        // Problem: issue with player controls s
        /* function search_number(factor, errmsg, errmsgnan, playersData, matchingPlayers, matchingPlayersLength, currentIndex) {
            const ratingInput = parseFloat(document.getElementById('searchInput').value.trim());
        
            if (isNaN(ratingInput)) {
                hidePlayerData();
                setWindowTitleError();
                emptyPlayerError(errmsg);
                return;
            }
        
            matchingPlayers = playersData.filter(player => {
                const playerRating = parseFloat(player[factor]);
                return playerRating === ratingInput;
            });
        
            if (matchingPlayers.length > 0) {  // Corrected the condition here
                currentIndex = 0;
                displayPlayerData(matchingPlayers[currentIndex]);
                togglePlayerControls();
            } else {
                hidePlayerData();
                setWindowTitleError();
                playerNotFound(ratingInput, errmsgnan);
                currentIndex = -1;
            }
        } */
        //--------------------------------------------------------------------------------------------------------------------
        

        function displayPlayerData(player, searchType) {
            const CheckIfEmpty = document.getElementById('searchInput').value;
            if (CheckIfEmpty.trim() === '') {
                hidePlayerData();
                setWindowTitleError();
                emptyPlayerError(searchType);
                return;
            }

            const goalkeeper = "GK";
            const PlayerPhotoDiv = document.getElementById('playerPhoto');
            if(player["Player ID"] !== ""){
                try {
                    PlayerPhotoDiv.innerHTML = `
                        <img src="https://raw.githubusercontent.com/CodeModeYT/DLS-Files/main/Player-Photos/23/${player["Player ID"]}.png"  alt="${AltText}" width=220 height=220  
                            onerror="setDefaultImage(${player["Rating"]})">
                    `;
                } catch {
                    setDefaultImage(player["Rating"]);
                }
            }
            else {
                setDefaultImage(player["Rating"]);
            }
            

            const playerDataDiv = document.getElementById('playerData');
            const playerStatsDiv = document.getElementById('playerStats');
            const totalStatsDiv = document.getElementById('totalStats');
            const GKStatsDiv = document.getElementById('GKStats');

            let playerFullName = player["First Name"] + " " + player["Last Name"];

            if (player["Position"] === goalkeeper) {
                hideNotFound();
                redisplayPlayerData();
                setWindowTitlePlayer(playerFullName);
                playerDataDiv.innerHTML = `
                    <h2 style='font-weight: bold;'>${player["First Name"]} ${player["Last Name"]}</h2>
                    <br>
                    <p>Rating: ${player["Rating"]}</p>
                    <p>Price: ${player["Price"]}</p>
                    <p>Position: ${player["Position"]}</p>
                    <p>Nationality: ${player["Nationality"]}</p>
                    <p>Club: ${player["Club"]}</p>
                `;
                playerStatsDiv.innerHTML = `
                    <p>Height (cm): ${player["Height (cm)"]}</p>
                    <p>Speed: ${player["Speed"]}</p>
                    <p>Acceleration: ${player["Acceleration"]}</p>
                    <p>Control: ${player["Control"]}</p>
                    <p>Strength: ${player["Strength"]}</p>
                    <p>Tackling: ${player["Tackling"]}</p>
                    <p>Passing: ${player["Passing"]}</p>
                `;
                GKStatsDiv.innerHTML = `
                    <p>Handling (Gk): ${player["Handling (GK)"]}</p>
                    <p>Reactions (Gk): ${player["Reactions (GK)"]}</p>
                    <p>Height (cm): ${player["Height (cm)"]}</p>
                `;
                totalStatsDiv.innerHTML = `
                    <p>Total Stats: ${player["Total Stats"]}</p>
                `;
            } else {
                //If player is field player
                hideNotFound();
                redisplayPlayerData();
                setWindowTitlePlayer(playerFullName);
                playerDataDiv.innerHTML = `
                    <h2 style='font-weight: bold;'>${player["First Name"]} ${player["Last Name"]}</h2>
                    <br>
                    <p>Rating: ${player["Rating"]}</p>
                    <p>Price: ${player["Price"]}</p>
                    <p>Position: ${player["Position"]}</p>
                    <p>Nationality: ${player["Nationality"]}</p>
                    <p>Club: ${player["Club"]}</p>
                `;
                playerStatsDiv.innerHTML = `
                    <p>Height (cm): ${player["Height (cm)"]}</p>
                    <p>Speed: ${player["Speed"]}</p>
                    <p>Acceleration: ${player["Acceleration"]}</p>
                    <p>Stamina: ${player["Stamina"]}</p>
                    <p>Control: ${player["Control"]}</p>
                    <p>Strength: ${player["Strength"]}</p>
                    <p>Tackling: ${player["Tackling"]}</p>
                    <p>Passing: ${player["Passing"]}</p>
                    <p>Shooting: ${player["Shooting"]}</p>
                `;
                totalStatsDiv.innerHTML = `
                    <p>Total Stats: ${player["Total Stats"]}</p>
                `;
                GKStatsDiv.style.display = 'none';
            }

            togglePlayerControls();
        }
        function togglePlayerControls() {
            const totalPlayers = matchingPlayers.length;
            if (totalPlayers <= 1) {
                document.getElementById('player_controls').style.display = 'none';
                document.getElementById('controls_counter').style.display = 'none';
            } else {
                document.getElementById('player_controls').style.display = 'block';
                document.getElementById('controls_counter').style.display = 'block';
                updateControlsCounter(totalPlayers, currentIndex);
            }
            
        }
        

        function nextPlayer() {
            if (matchingPlayers.length > 0 && currentIndex < matchingPlayers.length - 1) {
                currentIndex++;
                displayPlayerData(matchingPlayers[currentIndex]);
                togglePlayerControls();
            }
        }
        
        function prevPlayer() {
            if (matchingPlayers.length > 0 && currentIndex > 0) {
                currentIndex--;
                displayPlayerData(matchingPlayers[currentIndex]);
                togglePlayerControls();
            }
        }
        

        window.searchPlayer = searchPlayer;
        window.nextPlayer = nextPlayer;
        window.prevPlayer = prevPlayer;
    })
    .catch(error => console.error(error));

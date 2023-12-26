//setting up global variables
const AltText = "";
//Setting up global functions
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
function playerNotFound(playerName){
    const divID = PlayerNotFound;
    document.getElementById('PlayerNotFound').style.display = 'block';
    divID.innerHTML = `<h1>Player "${playerName}" not found!</h1><h2>Player Not Found. Did they get red-carded out of the database?</h2>`;
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
function emptyPlayerError(){
    const divID = PlayerNotFound;
    document.getElementById('PlayerNotFound').style.display = 'block';
    divID.innerHTML = `<h1>Please enter a player name!</h1><h2><b>Goalpost Without a Striker:</b> We need a player name to take the shot. Please enter one!</h2>`;
}

//Fetch player data
fetch('/DLS-Player-search/Data/json/players_23.json')
    .then(response => response.json())
    //Handling the data
    .then(data => {
        const playersData = data;
        let matchingPlayers = [];
        let currentIndex = -1;

    
        function searchPlayer() {
            const playerName = document.getElementById('playerName').value.trim();
            matchingPlayers = playersData.filter(player => {
                const fullName = `${player["First Name"]} ${player["Last Name"]}`.toLowerCase();
                return fullName.includes(playerName.toLowerCase());
            });
        
            // Handling the number of search results
            if (matchingPlayers.length > 0) {
                currentIndex = 0;
                displayPlayerData(matchingPlayers[currentIndex]);
            } else {
                hidePlayerData();
                setWindowTitleError();
                playerNotFound(playerName);
                currentIndex = -1;
            }
        }
        

        function displayPlayerData(player) {
            const CheckIfEmpty = document.getElementById('playerName').value;
            if (CheckIfEmpty.trim() === '') {
                hidePlayerData();
                setWindowTitleError();
                emptyPlayerError();
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

fetch('Data/players.json')
    .then(response => response.json())
    .then(data => {
        // Store the JSON data in a variable for later use
        const playersData = data;
        let matchingPlayers = [];
        let currentIndex = -1;

        // Function to search for a player and display their data
        function searchPlayer() {
            const playerName = document.getElementById('playerName').value;
            matchingPlayers = playersData.filter(player => 
                player["First Name"].toLowerCase() === playerName.toLowerCase() ||
                player["Last Name"].toLowerCase() === playerName.toLowerCase()
            );

            if (matchingPlayers.length > 0) {
                currentIndex = 0;
                displayPlayerData(matchingPlayers[currentIndex]);
            }
            else {
                // Player not found
                document.getElementById('playerData').innerHTML = 'Player not found';
                document.getElementById('playerStats').style.display = 'none';
                document.getElementById('totalStats').style.display = 'none';
                currentIndex = -1;
            }
        }

        // Function to display player data
        function displayPlayerData(player) {
            const CheckIfEmpty = document.getElementById('playerName').value;
            if (CheckIfEmpty.trim() === '') {
                document.getElementById('playerData').style.display = 'none';
                document.getElementById('playerStats').style.display = 'none';
                document.getElementById('totalStats').style.display = 'none';
                document.getElementById('player_controls').style.display = 'none';
                document.getElementById('playerDisplayName').style.display = 'none';
                return;
            }
            //If player is a goalkeeper --> Change the displayed values
            const goalkeeper = "GK"
            if (player["Position"] === goalkeeper) {
                const playerNameDiv = document.getElementById('playerDisplayName');
                const playerDataDiv = document.getElementById('playerData');
                const playerStatsDiv = document.getElementById('playerStats');
                const totalStatsDiv = document.getElementById('totalStats');
                const GKSTatsDiv = document.getElementById('GKStats')
                playerNameDiv.innerHTML = `
                    <h2>${player["First Name"]} ${player["Last Name"]}</h2>
                    <br>
                `;
                playerDataDiv.innerHTML = `
                    <p>Rating: ${player["Rating"]}</p>
                    <p>Price: ${player["Price"]}</p>
                    <p>Position: ${player["Position"]}</p>
                    <p>Nationality: ${player["Nationality"]}</p>
                    <p>Club: ${player["Club"]}</p>
                    
                `;
                GKSTatsDiv.style.display = 'block'
                GKSTatsDiv.innerHTML = `
                    <p>Handling (Gk): ${player["Handling (GK)"]}</p>
                    <p>Reactions (Gk): ${player["Reactions (GK)"]}</p>
                    <p>Height (cm): ${player["Height (cm)"]}</p>
                    
                `
                playerStatsDiv.innerHTML = `
                    <p>Speed: ${player["Speed"]}</p>
                    <p>Acceleration: ${player["Acceleration"]}</p>
                    <p>Control: ${player["Control"]}</p>
                    <p>Strength: ${player["Strength"]}</p>
                    <p>Tackling: ${player["Tackling"]}</p>
                    <p>Passing: ${player["Passing"]}</p>
                `;
                totalStatsDiv.innerHTML = `
                `
            }
            else {
                const playerNameDiv = document.getElementById('playerDisplayName');
                const playerDataDiv = document.getElementById('playerData');
                const playerStatsDiv = document.getElementById('playerStats');
                const totalStatsDiv = document.getElementById('totalStats');
                const GKSTatsDiv = document.getElementById('GKStats')
                playerNameDiv.innerHTML = `
                    <h2>${player["First Name"]} ${player["Last Name"]}</h2>
                    <br>
                `;
                playerDataDiv.innerHTML = `
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
                `
                GKSTatsDiv.style.display = 'none'
            }
            //Toggle player control buttons
            if (matchingPlayers.length <= 1) {
                document.getElementById('player_controls').style.display = 'none';
            } 
            else if (matchingPlayers.length === 0) {
                // Player not found
                document.getElementById('playerData').innerHTML = 'Player not found';
                document.getElementById('playerStats').style.display = 'none';
                document.getElementById('totalStats').style.display = 'none';
                document.getElementById('playerDisplayName').style.display = 'none';
                document.getElementById('player_controls').style.display = 'none';
                currentIndex = -1;
                
            }
            else {
                document.getElementById('player_controls').style.display = 'block';
            }
        }

        // Function to display the next player
        function nextPlayer() {
            if (matchingPlayers.length > 0 && currentIndex < matchingPlayers.length - 1) {
                currentIndex++;
                displayPlayerData(matchingPlayers[currentIndex]);
            }
        }

        // Function to display the previous player
        function prevPlayer() {
            if (matchingPlayers.length > 0 && currentIndex > 0) {
                currentIndex--;
                displayPlayerData(matchingPlayers[currentIndex]);
            }
        }

        // Expose the searchPlayer, nextPlayer, and prevPlayer functions globally
        window.searchPlayer = searchPlayer;
        window.nextPlayer = nextPlayer;
        window.prevPlayer = prevPlayer;
    })
    .catch(error => console.error(error));

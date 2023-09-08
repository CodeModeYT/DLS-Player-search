// Load the JSON data (replace 'data.json' with the actual path to your JSON file)
fetch('Data/players.json')
    .then(response => response.json())
    .then(data => {
        // Store the JSON data in a variable for later use
        const playersData = data;

        // Function to search for a player and display their data
        function searchPlayer() {
            const playerName = document.getElementById('playerName').value;
            const player = playersData.find(player => 
                player["First Name"].toLowerCase() === playerName.toLowerCase() ||
                player["Last Name"].toLowerCase() === playerName.toLowerCase()
            );

            if (player) {
                // Display the player's data
                displayPlayerData(player);
            } else {
                // Player not found
                document.getElementById('playerData').innerHTML = 'Player not found';
            }
        }

        // Function to display player data
        function displayPlayerData(player) {
            const goalkeeper = "GK"
            if (player["Position"] === goalkeeper) {
                const playerDataDiv = document.getElementById('playerData');
                const playerStatsDiv = document.getElementById('playerStats');
                const totalStatsDiv = document.getElementById('totalStats');
                playerDataDiv.innerHTML = `
                    <h2>${player["First Name"]} ${player["Last Name"]}</h2>
                    <p>Rating: ${player["Rating"]}</p>
                    <p>Price: ${player["Price"]}</p>
                    <p>Position: ${player["Position"]}</p>
                    <p>Nationality: ${player["Nationality"]}</p>
                    <p>Club: ${player["Club"]}</p>
                    
                    
                `;
                playerStatsDiv.innerHTML = `
                    <p>Handling (Gk): ${player["Handling (GK)"]}</p>
                    <p>Reactions (Gk): ${player["Reactions (GK)"]}</p>
                    <p>Height (cm): ${player["Height (cm)"]}</p>
                    <p>Speed: ${player["Speed"]}</p>
                    <p>Acceleration: ${player["Acceleration"]}</p>
                    <p>Control: ${player["Control"]}</p>
                    <p>Strength: ${player["Strength"]}</p>
                    <p>Tackling: ${player["Tackling"]}</p>
                    <p>Passing: ${player["Passing"]}</p>
                `;
                totalStatsDiv.innerHTML = `
                    <p>Total Stats: ${player["Total Stats"]}</p>
                `
            }
            else {
                const playerDataDiv = document.getElementById('playerData');
                const playerStatsDiv = document.getElementById('playerStats');
                const totalStatsDiv = document.getElementById('totalStats');
                playerDataDiv.innerHTML = `
                    <h2>${player["First Name"]} ${player["Last Name"]}</h2>
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
            }
            
        }

        // Expose the searchPlayer function globally so that the button can call it
        window.searchPlayer = searchPlayer;
    })
    .catch(error => console.error(error));

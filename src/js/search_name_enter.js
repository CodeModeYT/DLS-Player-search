var input = document.getElementById('playerName');

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("input_button").click();
  }
}); 
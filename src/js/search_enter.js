var input = document.getElementById('searchInput');

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("input_button").click();
  }
}); 
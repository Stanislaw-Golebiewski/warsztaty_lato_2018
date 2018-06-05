var kwasy = [];

//uzupełnić o url i port podany na zajęciach!
const url = "<url>";
const port = "<port>";

//pobierz dane z API
function get_data() {
	axios
		.get("http://" + url + ":" + port + "/api/v1/kwasy")
		.then(function(response) {
			console.log(response.data);
			kwasy = response.data.data;
			//otrzymałeś odpowiedź? Dodaj elementy!
			display_data();
		})
		.catch(function(error) {
			console.log("wystąpil błąd! Treść błędu:");
			console.log(error);
		});
}

//na podstawie zawartości tablicy 'kwasy' uzupełnij ul o nowe elementy
function display_data() {
	var ul = document.getElementById("list");
	for (var i = 0; i < kwasy.length; i++) {
		var new_li = document.createElement("li");
		new_li.innerHTML =
			"<a href=" + kwasy[i].source + ">" + kwasy[i].title + "</a>";
		if (i % 2 == 0) {
			new_li.style.backgroundColor = "LightGray";
		}
		ul.appendChild(new_li);
	}
}

//wczytaniu okna ustaw event dla guzika
window.onload = () => {
	var btn = document.getElementById("btn1");
	btn.addEventListener("click", get_data);
};

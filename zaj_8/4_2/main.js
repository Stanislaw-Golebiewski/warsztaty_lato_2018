var kwasy = [];

//uzupełnić o url i port podany na zajęciach!
const url = "<url>";
const port = "<port>";

function get_data() {
	axios
		.get("http://" + url + ":" + port + "/api/v1/kwasy")
		.then(function(response) {
			console.log(response.data);
			kwasy = response.data.data;
		})
		.catch(function(error) {
			console.log("wystapil blad!");
		});
}

function display_data() {
	var ul = document.getElementById("list");
	for (var i = 0; i < kwasy.length; i++) {
		var new_li = document.createElement("li");
		new_li.innerHTML =
			"<a href=" + kwasy[i].source + ">" + kwasy[i].title + "</a>";
		ul.appendChild(new_li);
	}
}

window.onload = () => {
	var btn = document.getElementById("btn1");
	btn.addEventListener("click", get_data);
};

var kwasy = [];

//uzupełnić o url i port podany na zajęciach!
const url = "<url>";
const port = "<port>";

function get_data() {
	axios
		.get("http://" + url + ":" + port + "/api/v1/kwasy")
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function(error) {
			console.log("wystapil blad!");
		});
}

window.onload = () => {
	var btn = document.getElementById("btn1");
	btn.addEventListener("click", get_data);
};

import home from "./home.js";

function showPage() {
	fetch("http://localhost:3030/users/logout", {
		method: "get",
		headers: {
			"X-Authorization": sessionStorage.getItem("authToken"),
		},
	})
		.then((response) => {
			console.log(response);
			if (response.status == 204) {
				sessionStorage.removeItem("authToken");
				sessionStorage.removeItem('userEmail')
				sessionStorage.removeItem('userID')
				home.showPage();
			}
		})
		.catch((err) => {
			console.error(err);
		});
}

export default {
	showPage,
};

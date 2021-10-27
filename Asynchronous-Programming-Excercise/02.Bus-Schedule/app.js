function solve() {
	let nextStop = "depot";

	let info = document.querySelector("#info > span");
	let departBtn = document.querySelector("#depart");
	let arriveBtn = document.querySelector("#arrive");

	function depart() {
		fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStop}`)
			.then((res) => res.json())
			.then((data) => {
				info.textContent = `Next stop ${data["name"]}`;
				departBtn.disabled = true;
				arriveBtn.disabled = false;
                // nextStop = data['next']
			})
			.catch((err) => {
				info.textContent = "Error";
				departBtn.disabled = true;
				arriveBtn.disabled = true;
			});
	}

	function arrive() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStop}`)
			.then((res) => res.json())
			.then((data) => {
				info.textContent = `Arriving at ${data["name"]}`;
				departBtn.disabled = false;
				arriveBtn.disabled = true;
                nextStop = data['next']
			})
			.catch((err) => {
				info.textContent = "Error";
				departBtn.disabled = true;
				arriveBtn.disabled = true;
			});
    }

	return {
		depart,
		arrive,
	};
}

let result = solve();

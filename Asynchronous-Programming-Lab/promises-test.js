let guestCount = 99;

let engagementPromise = new Promise(function (resolve, reject) {
	if (guestCount > 100) {
		reject("Wedding too big");
	} else {
		resolve("Let's get married");
	}
})
.then(function (message) {
	console.log(`Promise fulfiled`);
	console.log(message);
})
.catch( function (errorMessage) {
    console.log(`Promise rejected`);
    console.log(errorMessage);
})

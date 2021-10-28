function lockedProfile() {
    let mainSection = document.querySelector("#main");
	(async () => {
        
		let profilesRequest = await fetch("http://localhost:3030/jsonstore/advanced/profiles");
		let profiles = await profilesRequest.json();
        
        let existingProfile = document.querySelector('.profile')
        existingProfile.remove()

		Object.keys(profiles).forEach((key, i) => {
			createProfileDiv(i + 1, profiles[key].username, profiles[key].email, profiles[key].age);
		});
	})();

	function createProfileDiv(id, name, email, age) {
		let profileDiv = createElement("div", null, mainSection, "profile");

		let profilePic = createElement("img", null, profileDiv, "userIcon");
		profilePic.src = "./iconProfile2.png";

		let lockLabel = createElement("label", "Lock", profileDiv);

		let lockRadio = createElement("input", null, profileDiv);
		lockRadio.type = "radio";
		lockRadio.name = `user${id}Locked`;
		lockRadio.value = "lock";
		lockRadio.checked = true;

		let unlockLabel = createElement("label", "Unlock", profileDiv);

		let unlockRadio = createElement("input", null, profileDiv);
		unlockRadio.type = "radio";
		unlockRadio.name = `user${id}Locked`;
		unlockRadio.value = "unlock";
        unlockRadio.checked = false

		createElement("br", null, profileDiv);
		createElement("hr", null, profileDiv);

		let userLabel = createElement("label", "Username", profileDiv);
		let userInput = createElement("input", null, profileDiv);
		userInput.value = name;
		userInput.type = "text";
		userInput.name = "user1Username";
		userInput.disabled = true;
		userInput.readOnly = true;

		let hiddenDiv = createElement("div", null, profileDiv);
		hiddenDiv.id = `user${id}HiddenFields`;

		createElement("hr", null, hiddenDiv);

		let emailLabel = createElement("label", "Email:", hiddenDiv);

		let emailInput = createElement("input", null, hiddenDiv);
		emailInput.type = "email";
		emailInput.value = email;
		emailInput.name = `user${id}Email`;
		emailInput.disabled = true;
		emailInput.readOnly = true;

		let ageLabel = createElement("label", "Age:", hiddenDiv);
		let ageInput = createElement("input", null, hiddenDiv);
		ageInput.type = "number";
		ageInput.value = age;
		ageInput.name = `user${id}Age`;
		ageInput.disabled = true;
		ageInput.readOnly = true;

		let showBtn = createElement("button", "Show more", profileDiv);

        showBtn.addEventListener('click', showHiddenFields)

		return profileDiv;
	}

    function showHiddenFields(e) {
        let currentProfile = e.target.parentElement
        let currentHiddenDiv = e.target.previousElementSibling
        let currentBtn = e.target;
        let currentRadio = currentProfile.querySelector('input[type="radio"]:checked')

        if (currentRadio.value !== 'unlock') {
            return
        }
        
        currentBtn.textContent = currentBtn.textContent === 'Show more' ? 'Hide it' : 'Show more'
        currentHiddenDiv.style.display = currentHiddenDiv.style.display === 'block' ? 'none' : 'block'
    }

	function createElement(type, content, parent, className) {
		let el = document.createElement(type);
		el.textContent = content;
		if (parent) {
			parent.appendChild(el);
		}
		if (className) {
			el.classList.add(className);
		}
		return el;
	}
}

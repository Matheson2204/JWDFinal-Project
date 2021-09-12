const all = document.querySelectorAll("*");
const body = document.querySelector("body");
const btn = document.querySelectorAll(".btn");
const card = document.querySelectorAll(".card");
const modal = document.querySelectorAll(".modal-content");

const modeButton = document.getElementById("modeswitch");

function dayMode() {
	body.classList.remove("bg-dark");

	//For whitespace and page bg
	all.forEach((element) => {
		element.classList.remove("text-white");
		element.classList.replace("bg-secondary", "bg-light");
		element.classList.replace("bg-dark", "bg-white");
	});

	//For buttons
	btn.forEach((button) => {
		button.classList.replace("btn-dark", "btn-primary");
		button.classList.replace("btn-dark", "btn-secondary");

		button.classList.remove("border-white");
	});

	//For task column titles
	document.querySelectorAll("h2").forEach((heading) => {
		heading.classList.replace("bg-light", "bg-secondary");
		heading.classList.add("text-white");
	});

	//For card header
	document.querySelectorAll(".card-header").forEach((border) => {
		border.classList.remove("night-header-divide");
	});

	//For card content
	card.forEach((cardbox) => {
		cardbox.classList.remove("border-white");
		cardbox.classList.remove("bg-dark");
	});

	//For modal form
	modal.forEach((formcontent) => {
		formcontent.classList.remove("bg-dark");
	});

	//For form input fields
	document.querySelectorAll("input").forEach((inputField) => {
		inputField.classList.remove("bg-dark");
	});
	document.querySelector("textarea").classList.remove("bg-dark");
	document.querySelector("select").classList.remove("bg-dark");

	//For mode button switching
	document.querySelector("#modeswitch").textContent = "Night Mode";
	modeButton.removeEventListener("click", dayMode);
	modeButton.addEventListener("click", nightMode);
}

function nightMode() {
	body.classList.add("bg-dark");

	//For whitespace and page bg
	all.forEach((element) => {
		element.classList.add("text-white");
		element.classList.replace("bg-light", "bg-secondary");
		element.classList.replace("bg-white", "bg-dark");
	});

	//For buttons
	btn.forEach((button) => {
		button.classList.replace("btn-primary", "btn-dark");
		button.classList.replace("btn-secondary", "btn-dark");

		button.classList.add("border-white");
	});

	//For card content
	card.forEach((cardbox) => {
		cardbox.classList.add("border-white");
		cardbox.classList.add("bg-dark");
	});

	//For card header
	document.querySelectorAll(".card-header").forEach((border) => {
		border.classList.add("night-header-divide");
	});

	//For modal form
	modal.forEach((formcontent) => {
		formcontent.classList.add("bg-dark");
	});
	//For form fields
	document.querySelectorAll("input").forEach((inputField) => {
		inputField.classList.add("bg-dark");
	});
	document.querySelector("textarea").classList.add("bg-dark");
	document.querySelector("select").classList.add("bg-dark");

	//For form close button
	document.querySelector(".btn-close").classList.add("night-close");
	//For mode button switching
	document.querySelector("#modeswitch").textContent = "Day Mode";
	modeButton.removeEventListener("click", nightMode);
	modeButton.addEventListener("click", dayMode);
}

modeButton.addEventListener("click", nightMode);

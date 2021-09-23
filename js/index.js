// Create object to store card data
const taskManager = new TaskManager();

const title = document.querySelector("#title");
const status = document.querySelector("#status");
const description = document.querySelector("#desc");
const assign = document.querySelector("#assign");
const dueDate = document.querySelector("#dueDate");

const submitBtn = document.querySelector("#submit-btn");

let invalidFields = 0;

const formSubmission = (event) => {
	// Grab current values in form fields
	let fieldValues = [
		title.value,
		description.value,
		assign.value,
		status.value,
		dueDate.value,
	];

	const fields = [title, description, assign, status, dueDate];

	// Validates first 3 fields for length < 5
	for (let i = 0; i < 3; i++) {
		if (fieldValues[i] === "" || fieldValues[i].length < 5) {
			fields[i].classList.remove("is-valid");
			fields[i].classList.add("is-invalid");
			invalidFields++;
		} else {
			fields[i].classList.remove("is-invalid");
			fields[i].classList.add("is-valid");
		}
	}

	// Validates status and date fields for length > 0
	for (let i = 3; i < 5; i++) {
		if (fieldValues[i].length === 0) {
			fields[i].classList.remove("is-valid");
			fields[i].classList.add("is-invalid");
			invalidFields++;
		} else {
			fields[i].classList.remove("is-invalid");
			fields[i].classList.add("is-valid");
		}
	}

	dateIsValid();

	event.preventDefault();

	// Allows card creation only if fields are all valid
	if (invalidFields === 0) {
		submitData(fields);
		addCard();
	} else if (invalidFields > 0) {
		invalidFields = 0;
		return;
	}
};

function dateIsValid() {
	// Grabbing current date
	const currentDate = new Date();

	// Ensures month is correct and double digit
	let month = currentDate.getUTCMonth() + 1;
	if (month < 10) {
		let fixedMonth = month.toString();
		fixedMonth = "0" + fixedMonth;
		month = fixedMonth;
	}

	// Ensures day is double digit value
	let day = currentDate.getUTCDate();
	if (day < 10) {
		let fixedDay = day.toString();
		fixedDay = "0" + fixedDay;
		day = fixedDay;
	}

	// Converts current date into an integer (yyyymmdd format)
	const currentFormattedDate = `${currentDate.getUTCFullYear()}${month}${day}`;
	const integerCurrentDate = parseInt(currentFormattedDate);

	// Converts value in dueDate field into an integer (yyyymmdd format)
	let fixedFormFieldValue = dueDate.value.replace(/-/g, "");
	let integerFormFieldValue = parseInt(fixedFormFieldValue);

	// Compares value of field value to value current date
	if (integerFormFieldValue >= integerCurrentDate) {
		dueDate.classList.remove("is-invalid");
		dueDate.classList.add("is-valid");
	} else {
		dueDate.classList.remove("is-valid");
		dueDate.classList.add("is-invalid");
		invalidFields++;
	}
}

const submitData = (fieldArray) => {
	// Adds data into a new task object
	taskManager.addTasks(
		title.value,
		description.value,
		assign.value,
		status.value,
		dueDate.value
	);

	// Clear fields and valid/invalid bootstrap classes
	document.querySelector("form").reset();
	fieldArray.forEach((field) => {
		field.classList.remove("is-valid");
		field.classList.remove("is-invalid");
	});
};

const addCard = () => {
	// Grab object/card in the last position of the array
	const cardData = taskManager.tasks[taskManager.tasks.length - 1];
	console.log(cardData);

	// Target column with a status matching the input
	console.log(cardData.status);
	const column = document.getElementById(`${cardData.status}`);

	// Create new styled card with content
	const newCard = document.createElement("div");
	newCard.classList.add("card");
	newCard.classList.add("text-center");

	// Create data class for task Id and add to card
	const taskId = document.createAttribute("data-task-id");
	taskId.value = cardData.currentId;
	newCard.setAttributeNode(taskId);

	newCard.innerHTML = `<div class="card-header">
                            <h3>${cardData.title}</h3>
                        </div>
                        <div class="card-body border">
                            <p class="description text-start">${cardData.desc}</p>
                            <p class="card-text"><small class=>Assigned to: <br> ${cardData.assign}</small></p>
                            <p class="card-text"><small class=> Due ${cardData.dueDate}</small></p>
                            
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary edit-btn">Edit</button>
                            <button class="btn btn-primary delete-btn">Delete</button>
                        </div>`;

	// Adds delete functionality to delete button
	const deleteBtn = newCard.querySelector(".delete-btn");
	console.log(deleteBtn);
	deleteBtn.addEventListener("click", () => {
		newCard.innerHTML = "";
		column.removeChild(newCard);
	});

	column.appendChild(newCard);
};

function deleteCard(targetId) {
	if (targetId === id) {
		console.log("success");
		console.log(card);
		card.innerHTML = "remove";
	}
}

// Old version
// function deleteCard(targetId) {
// 	document.querySelectorAll(".card").forEach((card) => {
// 		// Target card
// 		// delete the cards innnerHTML
// 		// also delete the parent div (with class of card)
// 		const id = parseInt(card.getAttribute("data-task-id"));
// 		console.log(id);
//     console.log(targetId);
// 		// Above this is working good
// 		//  Checking for exact type, might need to ensure one is not string and other is integer
// 		if (targetId === id) {
// 			console.log("success");
// 			console.log(card);
// 			card.innerHTML = "remove";
// 		}
// 	});
// }
// Add this to the end of the create card function

//
// const footer = deleteBtn.parentElement (this will target the card footer)
// const card = footer.parentElement

// // document.querySelectorAll("@task-form")
// // task-list.addEventListener("click", (event) => {
// //   if() {
// // })

// document.querySelectorAll(".card").forEach((card) => {
//   console.log(card);
// card.addEventListener('click', deleteCard => {
//   if (event.target === document.querySelector("#delete-btn"))
//   card // from your creating function

//  card.parentElement.removeChild(card)
//   setData()
// })
// })
// const editBtn = document.querySelector("#edit-btn");
// // const deleteBtn =

submitBtn.addEventListener("click", formSubmission);

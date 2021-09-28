// Create object to store card data
const taskManager = new TaskManager();

const title = document.querySelector("#title");
const status = document.querySelector("#status");
const description = document.querySelector("#desc");
const assign = document.querySelector("#assign");
const dueDate = document.querySelector("#dueDate");

const fields = [title, description, assign, status, dueDate];

const submitBtn = document.querySelector("#submit-btn");

// Modal
const formModal = new bootstrap.Modal(document.getElementById("task-form"), {});
let invalidFields = 0;

const formSubmission = (event) => {
	validateFields(fields);
	dateIsValid();

	event.preventDefault();

	// Allows card creation only if fields are all valid
	if (invalidFields === 0) {
		submitData();
		clearForm(fields);

		const cardData = taskManager.tasks[taskManager.tasks.length - 1];
		addCard(cardData);
		return;
	} else if (invalidFields > 0) {
		invalidFields = 0;
		return;
	}
};

// let fieldValues = [
// 	title.value,
// 	description.value,
// 	assign.value,
// 	status.value,
// 	dueDate.value,
// ];

const validateFields = (fields) => {
	let fieldValues = [
		title.value,
		description.value,
		assign.value,
		status.value,
		dueDate.value,
	];

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

	// Converts dueDate field value into an integer (yyyymmdd format)
	let fixedFormFieldValue = dueDate.value.replace(/-/g, "");
	let integerFormFieldValue = parseInt(fixedFormFieldValue);

	// Compares value of form field value to the value of current date
	if (integerFormFieldValue >= integerCurrentDate) {
		dueDate.classList.remove("is-invalid");
		dueDate.classList.add("is-valid");
	} else {
		dueDate.classList.remove("is-valid");
		dueDate.classList.add("is-invalid");
		invalidFields++;
	}
}

const submitData = () => {
	// Adds form data into a new task object within .tasks
	taskManager.addTasks(
		title.value,
		description.value,
		assign.value,
		status.value,
		dueDate.value
	);
};

const clearForm = (fieldArray) => {
	// Clear fields and valid/invalid bootstrap styling classes
	document.querySelector("form").reset();
	fieldArray.forEach((field) => {
		field.classList.remove("is-valid");
		field.classList.remove("is-invalid");
	});
};

const addCard = (cardData) => {
	// Store current id and taskList to local storage
	taskManager.save();

	// Target column with a status matching the input
	const column = document.getElementById(`${cardData.status}`);

	// Create new styled card with content
	const newCard = document.createElement("div");

	newCard.classList.add("card");
	newCard.classList.add("text-center");

	// Create data class equal to current id and add to card
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
	deleteBtn.addEventListener("click", () => {
		newCard.innerHTML = "";
		column.removeChild(newCard);
		taskManager.deleteTask(cardData.currentId);
		taskManager.save();
	});

	// Enables edit button functionality
	const editBtn = newCard.querySelector(".edit-btn");
	addEditBtn(editBtn, cardData);

	// IMPORTANT: adds card to page
	column.appendChild(newCard);
};

const addEditBtn = (targetButton, cardData) => {
	// let editFunctionality;
	function editFunctionality() {
		// Opens form modal in 'edit mode'
		formModal.show();
		submitBtn.removeEventListener("click", formSubmission);

		// Fills form with task info from .tasks array
		title.value = cardData.title;
		description.value = cardData.desc;
		assign.value = cardData.assign;
		status.value = cardData.status;
		dueDate.value = cardData.dueDate;

		// Store old status for comparison later
		const oldStatus = cardData.status;

		submitBtn.addEventListener("click", function editSubmit() {
			validateFields(fields);
			dateIsValid();

			if (invalidFields === 0) {
				// Update task info in .tasks
				taskManager.editTask(
					cardData.currentId,
					title.value,
					description.value,
					assign.value,
					status.value,
					dueDate.value
				);

				// Edits the card contents and/or position
				updateCard(cardData.currentId, cardData, oldStatus);

				// Ensures add-task form adds new card again and does not edit existing card
				submitBtn.removeEventListener("click", editSubmit);
				submitBtn.addEventListener("click", formSubmission);

				clearForm(fields);
				// Closes modal
				formModal.hide();

				// Re-adds ability to edit card after submitting an edit
				// targetButton.addEventListener("click", editFunctionality);
			} else if (invalidFields > 0) {
				invalidFields = 0;
				return;
			}
		});
	}
	targetButton.addEventListener("click", editFunctionality);
};

const updateCard = (targetId, cardData, oldStatus) => {
	const oldColumn = document.getElementById(oldStatus);
	// Select correct card
	const cardList = document.querySelectorAll(".card");

	// Check to see if card needs to move status columns
	const newStatus = cardData.status;

	// Everything here only updates contents
	cardList.forEach((cards) => {
		const taskId = cards.getAttribute("data-task-id");
		if (taskId === targetId.toString()) {
			if (oldStatus === newStatus) {
				// Update contents of card without moving columns
				cards.innerHTML = `<div class="card-header">
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

				// Re-add edit button functionality
				const editBtn = cards.querySelector(".edit-btn");
				addEditBtn(editBtn, cardData);

				// Re-add delete button functionality
				const deleteBtn = cards.querySelector(".delete-btn");
				deleteBtn.addEventListener("click", () => {
					cards.innerHTML = "";
					oldColumn.removeChild(cards);
					taskManager.deleteTask(cardData.currentId);
				});
			} else {
				// Delet card and re-render in correct column
				oldColumn.removeChild(cards);
				addCard(cardData);
			}
		}
	});
};

// Render all cards in local storage on page load
taskManager.load();
taskManager.tasks.forEach((task) => {
	const cardData = task;
	addCard(cardData);
});

submitBtn.addEventListener("click", formSubmission);

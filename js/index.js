const taskManager = new TaskManager();
// Declare object



 const title = document.querySelector('#title');
 const status = document.querySelector('#status');
 const description = document.querySelector('#description');
 const assign = document.querySelector('#assign');
 const dueDate = document.querySelector('#dueDate');

 const submitBtn = document.querySelector('#submit-btn');

 console.log("title:  " + title.value);
 console.log("status:  " + status.value);
 console.log("description:  " + description.value);
 console.log("assign:  " + assign.value);
 console.log("dueDate:  " + dueDate.value);

//  Old validate function

// function validate() {
//     let val = title.value;
    
//     console.log(val);
//     if (val === "" || val.length < 5){
//       // if val = 0, or < 5 --> make it look invalid
//       title.classList.add("is-invalid");
//     } else {
//         title.classList.remove("is-invalid")
// }
// }

const validate = (event) => {
    let fieldValues = [title.value, description.value, assign.value, status.value, dueDate.value]
    console.log(fieldValues);

    const fields = [title, description, assign, status, dueDate];

    // Validates first 3 fields for length < 5
    for(let i = 0; i < 3; i++){
      if(fieldValues[i] === "" || fieldValues[i].length < 5){
        fields[i].classList.remove("is-valid");
        fields[i].classList.add("is-invalid");
    } else {
        fields[i].classList.remove("is-invalid")
        fields[i].classList.add('is-valid')
      }
    }

    
    // Validates status and date fields for length > 0
    for(let i = 3; i < 5; i++){
      if(fieldValues[i].length === 0){
        fields[i].classList.remove("is-valid");
        fields[i].classList.add("is-invalid");
    } else {
        fields[i].classList.remove("is-invalid")
        fields[i].classList.add('is-valid')
      }
    }

    dateValidation();
    event.preventDefault()
    submitData(fields);
    addCard();
}
  
  
  function dateValidation() {
    const currentDate = new Date();

    // Ensures month is double digit
    let month = currentDate.getUTCMonth() + 1;
    if (month < 10){
      let fixedMonth = month.toString();
      fixedMonth = "0" + fixedMonth;
      month = fixedMonth;
    }

    // Ensures day is double digit
    let day = currentDate.getUTCDate();
    if (day < 10){
      let fixedDay = day.toString();
      fixedDay = "0" + fixedDay;
      day = fixedDay;
    }

    // Converts current date into an integer
    const currentFormattedDate = `${currentDate.getUTCFullYear()}${month}${day}`
    const integerCurrentDate = parseInt(currentFormattedDate);
    
    // Converts value in dueDate field into an integer
    let fixedDataField = dueDate.value.replace(/-/g, '')
    let integerDataField = parseInt(fixedDataField);

    if (fixedDataField >= integerCurrentDate){
      dueDate.classList.remove("is-invalid")
      dueDate.classList.add('is-valid')
  } else {
      dueDate.classList.remove("is-valid");
      dueDate.classList.add("is-invalid");
    }
    
}

const submitData = (fieldArray) => {
  // Adds data into a new task object
  taskManager.addTasks(title.value, description.value, assign.value, status.value, dueDate.value)

  // Clears form fields
  document.querySelector("form").reset();

  // Clear valid/invalid bootstrap classes
  fieldArray.forEach(field => {
    field.classList.remove("is-valid");
    field.classList.remove("is-invalid");
  })

}

// validate
// each field gets a new bootrap either validate or not valid
// When we submit, those classes stay
// Need to do: remove those classes after we press the submit button
// 


const addCard = () => {
  // Grab object/card in the last position of the array
  const cardData = taskManager.tasks[taskManager.tasks.length -1]
  console.log(cardData);

  // Target column with a status matching the input 
  console.log(cardData.status);
  const column = document.getElementById(`${cardData.status}`);

  // Creates new card
  const newCard = document.createElement("div")

  // Add bootstrap classes for styling
  newCard.classList.add("card");
  newCard.classList.add("text-center");

  // Add inner content of card
  newCard.innerHTML = `<div class="card-header">
                            <h3>${cardData.title}</h3>
                        </div>
                        <div class="card-body border">
                            <p class="description text-start">${cardData.desc}</p>
                            <p class="card-text"><small class=>Assigned to: ${cardData.assign}</small></p>
                            <p class="card-text"><small class=> Due ${cardData.dueDate}</small></p>
                            
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary">Edit</button>
                            <button class="btn btn-primary">Delete</button>
                        </div>`;

  // Add card to respective column
  column.appendChild(newCard);
}

  // newCard.innerHTML = `<div class="card-header">
  //                             <h3>Task title</h3>
  //                         </div>
  //                         <div class="card-body border">
  //                             <p class="description text-start">words</p>
  //                             <p class="card-text"><small class=>Assigned to:</small></p>
  //                             <p class="card-text"><small class=>Due dd/mm/yy</small></p>
                              
  //                         </div>
  //                         <div class="card-footer">
  //                             <button class="btn btn-primary">Edit</button>
  //                             <button class="btn btn-primary">Delete</button>
  //                         </div>`





submitBtn.addEventListener("click", validate);



console.log(taskManager.addTasks("Sleep", "for 10 hours", "Me", "In Progress", "22/10/2021"))
console.log(taskManager.addTasks("Sleep", "for 10 hours", "Me", "In Progress", "22/10/2021"))
console.log(taskManager.addTasks("Sleep", "for 10 hours", "Me", "In Progress", "22/10/2021"))
console.log(taskManager.tasks)




// click newtask button
// --> add the task info into the array (.tasks property)
//  Then, add that info into a new card
// Also, each new task should have unique id (incremented from last)
// (new task is always +1 of current total tasks)


// taskList. tasks = []

// [
  // array of statuses (which are arrays themselves)
  //   statusarray of tasks (each task will be an object)
  //     taskObject of taskInfoproperties
  //       e.g. status: ,
  //           description: ,
  //           dueDate: ,



    


  // [todo 
  //   [task 2: status;, desc, ]], [inprogress], [etc etc]]


// Target column by a new class/id (e.g. #todo)
// add a child to it (card)
// ?? 
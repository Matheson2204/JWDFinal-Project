
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

const validate = () => {
    const fieldValues = [title.value, description.value, assign.value, status.value, dueDate.value]
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
  // Fixes single digit months/dys to double digit
    const currentDate = new Date();
    let month = currentDate.getUTCMonth() + 1;
    if (month < 10){
      let fixedMonth = month.toString();
      fixedMonth = "0" + fixedMonth;
      month = fixedMonth;
    }

    let day = currentDate.getUTCDate();
    if (day < 10){
      let fixedDay = day.toString();
      fixedDay = "0" + fixedDay;
      day = fixedDay;
    }

  // Converts current date into integer
  const currentFormattedDate = `${currentDate.getUTCFullYear()}${month}${day}`
  const integerCurrentDate = parseInt(currentFormattedDate);
  // Converts dueDate data field into an integer
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


submitBtn.addEventListener("click", validate);

let taskArray = [];
let taskContacteArray = [];
let taskSubTaskArray = [];
let taskSubTaskList = [];
let editIndex = false;
let editTaskNr = 0;
let selectedTaskContacts = [];
let taskPrioSelect = "medium_prio";
let currentTaskAdd = {};
taskContacteArray


function init(){  
  startAddTask();
  loadDataFirebase();
  requiredInputAddTask();
  focusOnRequiredFields();
  subTaskListRender();
}


//Tasten Clear und Create Task sperren*/
function startAddTask() {
  document.getElementById('subTaskAddIcon').classList.remove('ele_hide')


}


//Felder prüfen ob Eingabe erfolgte mit QuerySelector
function requiredInputAddTask() {
 document.querySelectorAll(".input-field").forEach(input => {
    input.addEventListener("blur", function () {
      let errorMsg = this.nextElementSibling;
        if (this.value.trim() === "") {
        this.classList.add('error_Msg_Input')
        errorMsg.textContent = "This field is required";
        console.log("Keine Eingabe");
       } else{
     
       
        if (this.type === "date" && !correctDateInput(this.value)) {
          console.log("Datum falsch");
          
          errorMsg.textContent = "no valid date";
          this.classList.add('error_Msg_Input')
        } else {
          console.log("OK Eingabe");
          this.classList.remove('error_Msg_Input')
          errorMsg.textContent = "\u00A0";
        
      }
    }
    })
  })
}


function focusOnRequiredFields() {
  document.querySelectorAll(".input-field").forEach(event => {
    event.addEventListener("focus", function () {
      document.querySelectorAll(".error_Field").forEach(event => {
        event.textContent = "\u00A0";
      });
    })
  });
}



function correctDateInput(dateString) {
  let date = new Date(dateString);
  let year = date.getFullYear();
  if (year.toString().length > 4) {
  }
  else if (year < 2025) {
    return false;
  }
  else {
    return true;
  }
}

//Datum Picker öffnen
function openDatePicker() {
  let dateInput=document.getElementById('taskDate');
     if (dateInput.showPicker) {
      dateInput.showPicker();
      document.getElementById('taskDate').focus();
    } else {
      dateInput.focus();
    }
 }


function btnPrioSelect(btnPrio) {
  taskPrioSelect = "";
  document.querySelectorAll(".prio_img").forEach(el => {
    el.classList.remove('prio_img_with')
  });
  document.querySelectorAll('.btn_prio').forEach(button => {
    button.style.backgroundColor = "white";
    button.style.color = "black";
  });


  if (btnPrio == "urgent") {
    btnPrioBtnSelect("button-urgent", "#FF3D00", 0)
    taskPrioSelect = "high_prio";
  
  }

  if (btnPrio == "medium") {
    btnPrioBtnSelect("button_medium", "#FFA800", 1)
    taskPrioSelect = "medium_prio"

  }

  if (btnPrio == "low") {
    btnPrioBtnSelect("button-low", "#7AE229", 2)
    taskPrioSelect = "low_prio";
  
  }
}


function btnPrioBtnSelect(auswahl, btnColor, id) {
  Object.assign(document.getElementsByClassName(auswahl)[0].style, {
    backgroundColor: btnColor,
    color: "white",
  })
  document.getElementsByClassName("prio_img")[id].classList.add('prio_img_with');
}


function subTaskInputCheck(flag) {
  let subTaskInput = document.getElementById('inputSubtask')
  if (flag) {
    subTaskInput.value === null;
    subTaskInput.focus();
  };
  if (subTaskInput) {
    document.getElementById('subTaskAddIcon').classList.add('ele_hide')
    document.getElementById('subTaskEditIocn').classList.remove('ele_hide')
  } else {
    document.getElementById('subTaskAddIcon').classList.remove('ele_hide')
    document.getElementById('subTaskEditIocn').classList.add('ele_hide')
  }
}


function subTaskClose() {
  document.getElementById('subTaskAddIcon').classList.remove('ele_hide')
  document.getElementById('subTaskEditIocn').classList.add('ele_hide')
  document.getElementById('inputSubtask').value = "";
}


function taskCreateTask() {
  let element = document.getElementById('inputSubtask');
  contents = element.value;
  element.focus();
  if (editIndex) {
    taskSubTaskList[editTaskNr] = contents
    editIndex = false;
    editTaskNr = 0;
  } else {
    taskSubTaskList.push(contents);
  }
  subTaskClose();
  subTaskListRender();

}


function editSubTask(index) {
  let element = document.getElementById('inputSubtask');
  element.value = taskSubTaskList[index];
  document.getElementById('subTaskAddIcon').classList.add('ele_hide')
  document.getElementById('subTaskEditIocn').classList.remove('ele_hide')
  editTaskNr = index;
  editIndex = true;
}


function deleteSubTask(index) {
  taskSubTaskList.splice(index, 1);
  subTaskListRender();
}


function taskReadinArrayTask(taskData) {
  taskId = Object.values(taskData).length;
}



function taskReadinArrayContact(DataContact) {
  let= index=0;
  document.getElementById('taskDropDownList').innerHTML="";
  taskContacteArray = Object.values(DataContact)
  .flatMap(array=>array.map(entry=>({
    name:entry.name,
    email:entry.email,
    color: entry.color || "10"
  })));
  taskContacteArray.map((contact,index) =>{
      taskRenderContactList(index,contact.name,contact.color ||  "10",contact.email);
      });
      
   }



function taskContactListDrobdown() {
  console.log("Starte Contactliste");
  
  document.getElementById('taskContactDrowdownMenue').classList.toggle('ele_show');
  document.getElementById('initialeIconList').classList.toggle('icon_List_hide')
}


function taskContactFilterList() {
  let input = document.getElementById("taskDropDownInput").value.toLowerCase();
  let entries = document.querySelectorAll(".contact_Label_Item");
  entries.forEach(entries => {
    let labelText = entries.textContent.toLowerCase();
    if (labelText.includes(input)) {
      entries.style.display = "flex";
    } else {
      entries.style.display = "none";
    }
  });
}

function contactCheckOKinArray() {
  console.log("Mache Hacken");
  selectedTaskContacts = [];
  document.querySelectorAll(".contact_Label_Item").forEach((entry,contactID) => {
    let checkbox = entry.querySelector("input[type='checkbox']")
    if (checkbox && checkbox.checked) {
      selectedTaskContacts.push(taskContacteArray[contactID]);
      document.getElementById('initialeIconList').innerHTML="";
       taskContacInitialRender(selectedTaskContacts);
     }else{
      document.getElementById('initialeIconList').innerHTML="";
      taskContacInitialRender(selectedTaskContacts);

     }
  })
 }


 function checkInputData(template) {
  let mandatoryFields = document.querySelectorAll('.input-field');
     mandatoryFields.forEach(field => {
    if (field.value.trim() == "") {
       field.classList.add('error_Msg_Input');
            return;
    } else {
      pushTaskToServer();
      timePopUp(2000);
      addTaskClear();
      if(template=="overlay"){
        closeOverlay('addTask_overlay')
     }
    }
  });

}


 function timePopUp(duration){
  let notification = document.getElementById('notificationFinish');
  notification.style.display="flex";
    setTimeout(()=>{
    notification.style.display="none";
  },duration);
}


function collectData() {
  currentTaskAdd = {
    title: document.getElementById('taskTitle').value,
    description: document.getElementById('descriptionTask').value.trim(),// || "empty",  // oder "empty" reinschreiben wenn es leer bleibt
    contacts: selectedTaskContacts, //
      deadline: dateConversion(document.getElementById('taskDate').value),
    prio: taskPrioSelect, // "medium_prio" , oder "low_prio", oder "hgh_prioi"
    category: taskCatergoryRetrieve(document.getElementById('taskCatergory').value), // "Technical Task" oder "User Story"
    subtasks: {
      total: taskSubTaskList.length, // das ist wichtig zum runterladen, daher bitte auf die Datenbank speichern
      number_of_finished_subtasks: 0, // das ist wichtig zum runterladen, daher bitte auf die Datenbank speichern
      subtasks_todo: subTasksObjects(),
    },
    status: "toDo" //  "toDo",  "inProgress", "awaitFeedback", oder "done" 
  }
}


function dateConversion(dateOld) {
  let date = new Date(dateOld);
  let day = String(date.getDate()).padStart(2, '0'); // 25
  let month = String(date.getMonth() + 1).padStart(2, '0'); // 02
  let year = String(date.getFullYear()).slice(-2); // 25 (letzte 2 Stellen)
  return `${day}/${month}/${year}`;
}


function taskCatergoryRetrieve(number) {
  if (number === "1") {
    return "Technical Task";
  } else {
    return "User Story"
  }
}


function subTasksObjects() {
  let todoSatus = "todo";
  let subTasksTodo = {};
  taskSubTaskList.forEach(task => {
    subTasksTodo[task] = todoSatus;
  });
  return subTasksTodo;
}


function addTaskClear() {
  document.getElementById('taskTitle').value = "";
  document.getElementById('descriptionTask').value = "";
  loadDataFirebase();

  document.getElementById('taskContactDrowdownMenue').classList.remove("ele_show");
  selectedTaskContacts = [];
  document.getElementById('initialeIconList').innerHTML="";
  document.getElementById('taskDate').value = "";
  btnPrioSelect('medium');
  document.getElementById('taskCatergory').value = "";
  document.getElementById('inputSubtask').value = "";
 
  subTaskClose();
  taskSubTaskList = [];
  subTaskClose();
  subTaskListRender();
  document.getElementById('taskTitle').focus();
  
}


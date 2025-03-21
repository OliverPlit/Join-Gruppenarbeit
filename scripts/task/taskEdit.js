
//Ab hier Task Edit
console.log("taskEdit.js aufgerufen");

//Variablen Global
let currentTaskEdit = {};
let indexEdit = 0;
let DataTaskEdit = {};
let DataContactsAll = "";
let DataTaskPrio = "";
let DataTaskContactsTask = [];
let DataSubTaskListEdit = [];
let editIndexEdit = false;
let editTaskNrEdit = 0;
selectedTaskContacts="";
subTaskArray="";


dataFromFirebase();


function editTask(index) {
        indexEdit = index;
        DataTaskContactsTask = DataTaskEdit[indexEdit].contacts;
        TaskEditOverlayRender();
}


function TaskEditOverlayRender() {
        document.getElementById('card_overlay').innerHTML = "";
        document.getElementById('card_overlay').innerHTML = editTaskTemplate(indexEdit);
        document.getElementById('taskTitle').value = DataTaskEdit[indexEdit].title;  //title
        document.getElementById('descriptionTask').value = DataTaskEdit[indexEdit].description;
        document.getElementById('taskDate').value = dateConversation(DataTaskEdit[indexEdit].deadline);
        checkPrioEditTask(DataTaskEdit[indexEdit].prio); //prio setzen 
        taskReadinArrayContact(DataContactsAll);
        editTaskWriteContacts(DataTaskContactsTask);
        subTaskListLoadEdit()
}



function checkPrioEditTask(prio) {
           switch (prio) {
                case "high_prio":
                        DataTaskPrio = "high_prio"
                        btnPrioSelect('urgent')
                
                        break;
                case "medium_prio":
                        DataTaskPrio = "medium_prio";
                        btnPrioSelect('medium')
               
                        break;
                case "low_prio":
                        DataTaskPrio = "low_prio";
                        btnPrioSelect('low')
                   break;
        }
}


function taskContactListDrobdownEdit() {
        console.log("Starte Adressen");
        
        document.getElementById('taskContactDrowdownMenue').classList.toggle('ele_show');
        document.getElementById('initialeIconList').classList.toggle('icon_List_hide')
}



function taskContactsLoadTaskDB() {
        let conta = DataTaskEdit[indexEdit].contacts;
}


function editTaskWriteContacts(DataContacts) {
        if (DataContacts.length > 0) {
                let element = document.getElementById('initialeIconList');
                DataContacts.map(emtry => {
                        let name = emtry.name;
                        let color = emtry.color;
                        element.innerHTML += taskContacInitialTemplate(contactColorAssignEdit(color), taskInitialLettersCreate(name));
                });
                function contactColorAssignEdit(color) {
                        return contactColorArray[color];
                }
        }
}



function contactColorAssignEdit(color) {
        return contactColorArray[color];
}



function subTaskListLoadEdit() {
        document.getElementById('subTaskAddIcon').classList.remove('ele_hide')
        document.getElementById('subTaskEditIocn').classList.add('ele_hide')
        if (DataTaskEdit[indexEdit].subtasks.total > 0) {
                DataSubTaskListEdit = Object.keys(DataTaskEdit[indexEdit].subtasks.subtasks_todo);
                subTaskListRenderEdit(DataSubTaskListEdit);
        }


}

function subTaskListRenderEdit(taskSubList) {
        element = document.getElementById('subTaskList');
        element.innerHTML = "";
        element.innerHTML += taskSubList.map((designation, index) =>
                SubtaskListTemplateEdit(designation, index)).join("");
}


function SubtaskListTemplateEdit(subTaskEntry, index) {
        return `
        <div class="sub_task_item">
        <div class="sublist_text">
           <span class="bullet">•</span>
           <span ondblclick="editSubTaskEdit(${index})">${subTaskEntry}</span>
       </div>
       <div class="icons">
           <img src="../assets/icons/edit.svg"  onclick="editSubTaskEdit(${index})">
           <img src="../assets/icons/delete.svg"onclick="deleteSubTaskEdit(${index})">
       </div>
    </div>
    `
}


function taskCreateTaskEdit() {
        let element = document.getElementById('inputSubtask');
        contents = element.value;
        element.focus();
        if (editIndexEdit) {
                DataSubTaskListEdit[editTaskNr] = contents
                editIndexEdit = false;
                editTaskNrEdit = 0;
        } else {
                DataSubTaskListEdit.push(contents);
        }
        subTaskClose();
        subTaskListRenderEdit(DataSubTaskListEdit);

}


function editSubTaskEdit(index) {
        let element = document.getElementById('inputSubtask');
        element.value = DataSubTaskListEdit[index];
        document.getElementById('subTaskAddIcon').classList.add('ele_hide')
        document.getElementById('subTaskEditIocn').classList.remove('ele_hide')
        editTaskNrEdit = index;
        editIndexEdit = true;
}




function deleteSubTaskEdit(posi) {
        DataSubTaskListEdit.splice(posi, 1);
        subTaskListRenderEdit(DataSubTaskListEdit);
}


async function TaskEditSave() {
         collectDataEdit();
         await postTaskDataEdit(`/tasks/${parseInt(indexEdit)}`, currentTaskEdit);
         await fetchTaskData();
              
         updateTaskBoard();
         closeOverlay('bg_overlay')
}


function subtaskinObjekt(subTaskArray){
       return subTask = Object.fromEntries(subTaskArray.map(item => [item, "todo"]));
}


function collectDataEdit() {
        currentTaskEdit = {
                title: document.getElementById('taskTitle').value,
                description: document.getElementById('descriptionTask').value.trim(),  // oder "empty" reinschreiben wenn es leer bleibt
                contacts: checkContacts() ,//
                deadline: dateConversion(document.getElementById('taskDate').value),
                prio: DataTaskPrio, // "medium_prio" , oder "low_prio", oder "hgh_prioi"
                category:DataTaskEdit[indexEdit].category,
                subtasks: {
                        total: DataSubTaskListEdit.length, // das ist wichtig zum runterladen, daher bitte auf die Datenbank speichern
                        number_of_finished_subtasks: 0, // das ist wichtig zum runterladen, daher bitte auf die Datenbank speichern
                        subtasks_todo:subtaskinObjekt(DataSubTaskListEdit),
                },
                status: DataTaskEdit[indexEdit].status,  //  "toDo",  "inProgress", "awaitFeedback", oder "done" 
        }
}



function checkContacts(){
   if (selectedTaskContacts.length>0){
        return selectedTaskContacts
  
    }
    else{
        if(DataTaskContactsTask.length>0){
               return DataTaskContactsTask;
        }
                return "";
   }
}



async function postTaskDataEdit(path = "", task) {
          let CurrentTaskResponse = await fetch(Base_URL + path + ".json", {
                method: "PUT",
                header: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
        });
}


async function dataFromFirebase() {
        const { DataTask, DataContact } = await loadDataFirebaseEdit();
        DataTaskEdit = DataTask;
        DataContactsAll = DataContact
  }


async function loadDataFirebaseEdit() {
        try {
                const [responseTask, responseContact] = await Promise.all([
                        fetch(Base_URL + "/tasks/" + ".json"),
                        fetch(Base_URL + "/contacts/" + ".json")
                ])
                const DataTask = await responseTask.json();
                const DataContact = await responseContact.json();
                return { DataTask, DataContact };

        } catch (error) {
                console.log("Fehler beim lesen ", error);
        }
}


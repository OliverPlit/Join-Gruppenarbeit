console.log("daten von firerbase");

const Base_URL = "https://joinstorage-805e6-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadDataFirebase() {
try{
   const [responseTask,responseContact] = await Promise.all([
        fetch(Base_URL + "/tasks/" + ".json"),
        fetch(Base_URL + "/contacts/" + ".json")
    ])
       const DataTask = await responseTask.json();
       const DataContact= await responseContact.json();
    taskReadinArrayTask(DataTask);   
    taskReadinArrayContact(DataContact); 
}catch(error){
    console.log("Fehler beim lesen " ,error);
}
}


async function saveDataFirebaseTask() {
   
}


async function deleteDataFirebaseTask(params) {
    
}





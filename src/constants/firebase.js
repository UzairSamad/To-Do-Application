import firebase from "firebase"


export const loginUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
        })
        .catch((err) => {
            alert(err.message)
        });
}

export const submitTask = (params) => {
    firebase.database().ref("tasks").push({
        ...params
    })
        .then(res => {
            alert("Task Created Successfully")
        })
        .catch(err => {
            alert(err.message)
        })
}


export const markAsCompleted = (key) => {
    firebase
        .database()
        .ref(`tasks/${key}`).update({ status: "Completed" })
        .then(res => {

        })
        .catch(err => {
            alert(err.message)
        })
};
export const markAsInCompleted = (key) => {
    firebase
        .database()
        .ref(`tasks/${key}`).update({ status: "InCompleted" })
        .then(res => {

        })
        .catch(err => {
            alert(err.message)
        })
};

export const editTask = (params, key) => {
    firebase.database().ref(`tasks/${key}`).update({
        ...params
    })
        .then(res => {
            alert("Task Edit Successfully")
        })
        .catch(err => {
            alert(err.message)
        })
}

export const deleteTask = (key) => {
    firebase.database().ref(`tasks/${key}`).remove()
        .then(res => {
            alert("Task Removed Successfully")
        })
        .catch(err => {
            alert(err.message)
        })
}


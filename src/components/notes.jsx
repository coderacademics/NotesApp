import { React, useState, useEffect } from "react";
import '../CSS/notes.css';
function Notes() {
    function getTask() {
        let task = localStorage.getItem("Tasks");
        if (task)
            return JSON.parse(task);
        else
            return [];
    }
    function getTaskStatus() {
        let taskStatus = localStorage.getItem("TaskStatus");
        if (taskStatus)
            return JSON.parse(taskStatus);
        else {
            let task = JSON.parse(localStorage.getItem("Tasks"));
            if (task)
                return new Array(task.length).fill(false);
            else
                return [];
        }

    }
    const [tasks, setTasks] = useState(getTask());
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState();
    const [taskStatus, setTaskStatus] = useState(getTaskStatus());
    useEffect(() => {
        localStorage.setItem("Tasks", JSON.stringify(tasks));
    }, [tasks]);
    useEffect(() => {
        console.log("entered");
        localStorage.setItem("TaskStatus", JSON.stringify(taskStatus));
    }, [taskStatus])

    function addTaskInsideHook(task) {
        setTasks([task, ...tasks]);
        setTaskStatus([false,...taskStatus]);
    }
    const editTask = (e, taskId) => {
        if (editTaskId === taskId) {
            let editedTask = document.getElementById(taskId).innerText;
            let updatedTasks = [...tasks];
            updatedTasks[taskId] = editedTask;
            setTasks(updatedTasks);
            document.getElementById(taskId).contentEditable = false;
            setEditTaskId();
        }
        else {
            document.getElementById(taskId).contentEditable = true;
            setEditTaskId(taskId);
        }
    }
    function toggleCheckbox(e, taskId) {
        const newTaskStatus = [...taskStatus];
        newTaskStatus[taskId] = !newTaskStatus[taskId];
        setTaskStatus(newTaskStatus);
        console.log(taskStatus);
    }
    function deleteTask(event, taskId) {
        event.preventDefault();
        const updatedTasks = [...tasks];
        const remove = updatedTasks.splice(taskId,1);
        setTasks(updatedTasks);
        const updateTaskStatus = [...taskStatus];
        const removeStatus = updateTaskStatus.splice(taskId,1);
        setTaskStatus(updateTaskStatus);
        console.log(removeStatus);
    }
    const addNewTask = (e) => {
        e.preventDefault();
        if (newTask.length === 0)
            alert("Empty task!!");
        else {
            addTaskInsideHook(newTask);
            setNewTask("");
        }
    }
    return (
        <div className="main-container">
            <div className="task-container">
                <form className="task-form" method="submit" onSubmit={addNewTask}>
                    <input className="task-input" type="text" value={newTask} placeholder="✍️ Add your task here..." onChange={(e) => {
                        setNewTask(e.target.value);
                    }} />
                    <button className="add-task" type="submit"><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/add--v2.png" alt="add--v2" /></button>
                </form>
                <div className="line">
                </div>
                <div className="task-list">
                    {
                        tasks.map((task, key) => {
                            return <div className="task">
                                <li style={{ listStyle: "none" }}> <input type="checkbox" checked={taskStatus[key] === true} style={{ marginLeft:"1em",marginRight: "1em" , transform:"scale(1.7)" }} onChange={(e) => toggleCheckbox(e, key)} /><span id={key}>{task}</span></li>
                                <div className="task-controls">
                                    <span className="edit" onClick={(e) => editTask(e, key)}>
                                        {editTaskId === key ?
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                                <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                                            </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 64 64">
                                                <path d="M7.2 54.5c-.6 1.5.9 3 2.4 2.4L14 55l-5-5L7.2 54.5zM13 42c1.5 1.5 1 4 1 4l1.3.4c1.1.4 1.9 1.2 2.3 2.3L18 50c0 0 3 0 4 1l24-24-8-10L13 42zM54.7 9.3c-3.5-3.5-7-2-7-2L43 12l9 9 4.7-4.7C56.7 16.3 58.2 12.8 54.7 9.3z"></path>
                                            </svg>}
                                    </span>
                                    <svg className="delete" onClick={(e) => deleteTask(e, key)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" style={{ paddingRight: "0.5em" }} >
                                        <path d="M6 8v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8H6zM24 4h-6c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1H6C5.4 4 5 4.4 5 5s.4 1 1 1h18c.6 0 1-.4 1-1S24.6 4 24 4z"></path>
                                    </svg>
                                </div>
                            </div>
                        })}

                </div>
            </div>
        </div>
    );
}

export default Notes;
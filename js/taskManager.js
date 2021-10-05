class TaskManager {
	constructor() {
		this.tasks = [];
		this.currentId = 0;
	}
	//Add task array method
	addTasks(title, desc, assign, status, dueDate) {
		const newTask = {
			currentId: (this.currentId += 1),
			title: title,
			desc: desc,
			assign: assign,
			status: status,
			dueDate: dueDate,
		};
		this.tasks.push(newTask);
	}
	//Method for delete task card info
	deleteTask(targetId) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (this.tasks[i].currentId === targetId) {
				this.tasks.splice(i, 1);
			}
		}
	}
	//editing card info (work in progress)
	editTask(targetId, title, desc, assign, status, dueDate) {
		this.tasks.forEach((task) => {
			if (targetId === task.currentId) {
				task.title = title;
				task.desc = desc;
				task.assign = assign;
				task.dueDate = dueDate;
				task.status = status;
			}
		});
	}
	save() {
		const jsonTasks = JSON.stringify(this.tasks);
		localStorage.setItem("taskList", jsonTasks);
		const currentId = this.currentId;
		localStorage.setItem("currentId", currentId);
	}
	load() {
		const taskList = localStorage.getItem("taskList");
		this.tasks = JSON.parse(taskList);
		const currentId = localStorage.getItem("currentId");
		this.currentId = Number(currentId);
	}
}

// tasks [] as an object {}
// access that object the id

// for loop/forEach thru the .tasks property --> find the object that matches the id
// Edit the properties of that task object

class TaskManager {
    constructor(){
      this.tasks = []
      this.currentId = 0;
    }
    addTasks(title, desc, assign, status, dueDate) {
      
        const newTask = {
        currentId: this.currentId +=1,
        title: title,
        desc: desc ,
        assign: assign,
        status: status, 
        dueDate: dueDate,
      }
      
      this.tasks.push(newTask);
      
    }
}
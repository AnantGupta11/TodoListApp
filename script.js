(function () {
  let tasks=[];
  const tasksList =document.getElementById('list');
  const addTaskInput=document.getElementById('add');
  const tasksCounter=document.getElementById('tasks-counter');

  function addTaskToDOM(task){

      const li =document.createElement('li');

      li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
                    <label for="${task.id}">${task.text}</label>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.rlgyic3-V9P1C_fP3N3lpgHaHa%26pid%3DApi&f=1" class="delete" data-id="${task.id}"/>
                    `;
    tasksList.appendChild(li);
  }

  function renderList() {
    tasksList.innerHTML='';

    for(let i=0;i < tasks.length;i++){
      addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
  }
  function markTaskAsComplete(taskId){
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
      
      tasks[taskIndex].done = !tasks[taskIndex].done;
      renderList();
      return;
    }
  }

  function deleteTask (taskId) {
    
    const newTasks = tasks.filter(function (task) {
      return task.id !== taskId;
    });
  
    tasks = newTasks;
    renderList();
  }
  
  function addTask (task) {
    if (task) {
      tasks.push(task);
      renderList();
      return;
    }
  }
  function handleClickLisetner(e){
    if(e.target.className === 'delete'){
      const taskId = e.target.dataset.id;
      deleteTask(taskId);
  
      return;
    } else if (e.target.className === 'custom-checkbox') {
      // handle marking task as complete
      const taskId = e.target.id;
      markTaskAsComplete(taskId);
  
      return;
    }
  }
  function handleInputKeypress (e) {
    if (event.key === 'Enter') {
      const text = e.target.value;
  
      if (!text) {
        // showNotification('error', 'Task text can not be empty!');
        return;
      }
  
      const task = {
        text,
        id: Date.now().toString(),
        done: false
      }
      e.target.value = '';
      addTask(task);
    }
  }
  

  function initializeTodoList(){
    document.addEventListener('click',handleClickLisetner);
    addTaskInput.addEventListener('keyup', handleInputKeypress)
  }
  
  initializeTodoList();
})();


'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

    
let todoData = [];



const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML  = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

            if(item.completed) {
                todoCompleted.append(li);
            }   else {
                todoList.append(li);
            }

            const btnTodoComplete = li.querySelector('.todo-complete');

            btnTodoComplete.addEventListener('click', function(){
                item.completed = !item.completed;
                localStorage.setItem('newarr', JSON.stringify(todoData));
                render();
            });

            const btnTodoRemove = li.querySelector('.todo-remove');

            btnTodoRemove.addEventListener('click', function(){
                todoData.splice(todoData.indexOf(item), 1);
                localStorage.setItem('newarr', JSON.stringify(todoData));
                render();
            });
            
        });
    
};

    if (localStorage.getItem('newarr')) {
    todoData = JSON.parse(localStorage.getItem('newarr'));
                render();
}


todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value === '') {
        alert("Поле не должно быть пустым");
    }   else {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
        localStorage.newarr = JSON.stringify(todoData);
        render();
        headerInput.value = '';
    }
    
});



render();

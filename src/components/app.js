import { LitElement, html } from '@polymer/lit-element';

import './add-item';
import './list-items';
import './filter';

class TodoApp extends LitElement {

  static get properties() {
    return {
      todoList: Array,
      filter: String,
      todos: Array,
      filter: String
    }
  }

  constructor() {
    super();
    let list = JSON.parse(localStorage.getItem('todo-list'));
    this.todoList = list === null ? [] : list;
    this.todos = this.todoList; 
    this.filter = 'All';
  }

  firstUpdated() {
    this.addEventListener('addTodoItem', (e) => {
      this.todoList = e.detail.todoList;
      this.applyFilter();
    });

    this.addEventListener('removeTodoItem', (e) => {
      const index = this.todoList.map((todoItem) => todoItem.id).indexOf(e.detail.itemId);
      this.todoList.splice(index, 1);
      this.todoList = _.clone(this.todoList);
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
      this.applyFilter();
    });

    this.addEventListener('taskDone', (e) => {
      const index = this.todoList.map((todoItem) => todoItem.id).indexOf(e.detail.itemId);
      this.todoList[index].done = !this.todoList[index].done;
      this.todoList = _.clone(this.todoList);
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
      this.applyFilter();
    });

    this.addEventListener('update-filter', (e) => {
      this.filter = e.detail.filter;
      this.applyFilter();
    });

    this.addEventListener('clear-completed', (e) => {
      this.todoList = this.todoList.filter(todo => !todo.done);
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
      this.applyFilter();
    });
  }

  applyFilter() {
    switch(this.filter) {
      case 'Active':
        this.todos = this.todoList.filter(todo => !todo.done);
        break;
      case 'Completed':
        this.todos = this.todoList.filter(todo => todo.done);
        break;
      default:
        this.todos = this.todoList;
    }
  }

  render() {
    return html `
      <div class="main-container">
        <add-item></add-item>
        <list-items .todoList=${this.todos}></list-items>
        <todo-filter></todo-filter>
      </div>
    `;
  }
}

customElements.define('todo-app', TodoApp);
import { LitElement, html } from '@polymer/lit-element';

import './add-item';
import './list-items';

class TodoApp extends LitElement {

  static get properties() {
    return {
      todoList: Array
    }
  }

  constructor() {
    super();
    let list = JSON.parse(localStorage.getItem('todo-list'));
    this.todoList = list === null ? [] : list;
  }

  firstUpdated() {
    this.addEventListener('addTodoItem', (e) => {
      this.todoList = e.detail.todoList;
    });

    this.addEventListener('removeTodoItem', (e) => {
      const index = this.todoList.map((todoItem) => todoItem.id).indexOf(e.detail.itemId);
      this.todoList.splice(index, 1);
      this.todoList = _.clone(this.todoList);
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    });

    this.addEventListener('taskDone', (e) => {
      const index = this.todoList.map((todoItem) => todoItem.id).indexOf(e.detail.itemId);
      this.todoList[index].done = !this.todoList[index].done;
      this.todoList = _.clone(this.todoList);
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    });
  }

  render() {
    return html `<p>Hello, This is Todo-App</p>
      <add-item></add-item>
      <list-items .todoList=${this.todoList}></list-items>
    `;
  }
}

customElements.define('todo-app', TodoApp);
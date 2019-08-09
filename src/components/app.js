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

  render() {
    return html `<p>Hello, This is Todo-App</p>
      <add-item></add-item>
      <list-items .todoList=${this.todoList}></list-items>
    `;
  }
}

customElements.define('todo-app', TodoApp);
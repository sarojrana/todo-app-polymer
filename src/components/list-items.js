import { LitElement, html } from "@polymer/lit-element";
import { repeat } from 'lit-html/directives/repeat';

import './todo-item';

class ListItems extends LitElement {
  static get properties() {
    return {
      todoList: Array
    }
  }

  constructor() {
    super();
    this.todoList = [];
  }

  render() {
    return html `
      <ul>${repeat(this.todoList, (todoItem) => html `<li><todo-item .todoItem=${todoItem}></todo-item></li>`)}</ul>
    `;
  }
}

customElements.define('list-items', ListItems);
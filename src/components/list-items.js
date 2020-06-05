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
    <style>
      .lists {
        padding-top: 1rem;
      }

      .list .list-wrapper {
        list-style: none;
        margin: 0 0.5rem;
        padding: 0;
      }
    </style>
    <div class="lists">
      <div class="list-wrapper">
        ${repeat(this.todoList, (todoItem) => html `<todo-item .todoItem=${todoItem}></todo-item>`)}
      </div>
    </div>
    `;
  }
}

customElements.define('list-items', ListItems);
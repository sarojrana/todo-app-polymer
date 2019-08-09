import { LitElement, html } from "@polymer/lit-element";
import '@polymer/paper-checkbox';

class TodoItem extends LitElement {
  static get properties() {
    return {
      todoItem: Object
    }
  }

  constructor() {
    super();
  }

  render() {
    return html `
      <paper-checkbox> ${this.todoItem.item} </paper-checkbox>
    `;
  }
}

customElements.define('todo-item', TodoItem);
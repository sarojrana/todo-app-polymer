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

  removeTodoItem(id) {
    this.dispatchEvent(new CustomEvent('removeTodoItem', {
      bubbles: true,
      composed: true,
      detail: {
        itemId: id
      }
    }));
  }

  taskDone(id) {
    this.dispatchEvent(new CustomEvent('taskDone', {
      bubbles: true,
      composed: true,
      detail: {
        itemId: id
      }
    }));
    this.requestUpdate();
  }

  render() {
    return html `
      <paper-checkbox .checked=${this.todoItem.done} 
        @click="${() => this.taskDone(this.todoItem.id)}"> ${this.todoItem.item} </paper-checkbox>
      <button @click="${() => this.removeTodoItem(this.todoItem.id)}"> Remove </button>
    `;
  }
}

customElements.define('todo-item', TodoItem);
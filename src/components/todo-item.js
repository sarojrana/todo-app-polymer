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
    this.todoItem = {};
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
      <custom-style>
        <style is="custom-style">
          paper-checkbox.green {
            --paper-checkbox-checked-color: var(--paper-green-500);
            --paper-checkbox-checked-ink-color: var(--paper-green-500);
            --paper-checkbox-unchecked-color: var(--paper-black-900);
            --paper-checkbox-unchecked-ink-color: var(--paper-black-900);
            --paper-checkbox-label-color: var(--paper-black-700);
            --paper-checkbox-label-checked-color: var(--paper-green-500);
          }

          paper-checkbox[checked] span.title {
            text-decoration: line-through;
          }
        </style>
      </custom-style>

      <style>
        .list-item {
          background: #fff;
          padding: 0.5rem 1rem;
          border: 2px solid #ccc;
          border-radius: 2px;
          margin-bottom: 0.5em;
        }
        .list-item:hover .delete {
          display: block;
        }
        .delete {
          display: none;
          float: right;
          color: #ff0000;
          cursor: pointer;
          font-family: 'Caveat', cursive;
          font-weight: bold;
          padding-right: 1rem; 
        }
        .delete:hover {
          font-weight: bolder;
          font-size: 1.5rem;
        }
      </style>
      <div class="list-item">
        <paper-checkbox class="green" .checked=${this.todoItem.done} 
          @click="${() => this.taskDone(this.todoItem.id)}" noink> 
          <span class="title"> ${this.todoItem.todo} </span>
        </paper-checkbox>
        <span class="delete" @click="${() => this.removeTodoItem(this.todoItem.id)}"> X </span>
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);
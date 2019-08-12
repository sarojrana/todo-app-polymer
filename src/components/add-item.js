import { LitElement, html} from '@polymer/lit-element';

class AddItem extends LitElement {
  static get properties() {
    return {
      todoList: Array,
      todoItem: { type: String, notify: true }
    }
  }

  constructor() {
    super();
    this.todoItem = '';
  }

  /**
   * handles keyup event
   * @param e 
   */
  inputKeyUp(e) {
    if(e.keyCode == 13) {
      this.addItem();
    } else {
      this.todoItem = e.target.value;
    }
  }

  /**
   * adds item to todoList
   */
  addItem() {
    if(!this.todoItem) {
      alert('Input field is empty');
      return;
    }
    const list = JSON.parse(localStorage.getItem('todo-list'));
    this.todoList = list === null ? [] : list;
    this.todoList.push({
      id: new Date().valueOf(),
      todo: this.todoItem,
      done: false
    });
    localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    this.dispatchEvent(new CustomEvent('addTodoItem', {
      bubbles: true,
      composed: true,
      detail: { 
        todoList: this.todoList 
      }
    }));
    this.todoItem = '';
  }

  render() {
    return html `
      <style>
        h3 {
          color: #0581b1;
        }
        .input {
          display:flex;
          flex-direction:row;
          border:1px solid #0581b1;
          padding:2px;
          position: relative;
        }

        input {
          flex-grow: 2;
          border: none;
          min-height: 40px;
          padding-left: 1rem; 
        }

        input:focus {
          outline: none;
          border: none;
        }

        .add-btn {
          border: none;
          font-weight: bold;
          background: none;
          color: #0680b1;
          height: 20px;
          position: absolute;
          bottom: 2px;
          right: 2px;
        }
        .add-btn:hover {
          background: #0680b1;
          color: #fff;
          border-radius: 5px;
        }
      </style>
      <div class="container">
        <div class="header">
          <h3>Add New Todo</h3>
        </div>
        <div class="input">
          <input placeholder="Add Todo Item" .value="${this.todoItem}" @keyup="${(e) => this.inputKeyUp(e)}">
          <button class="add-btn" @click="${(e) => this.addItem()}"> Add Todo </button>
        </div>
      </div>
    `;
  }
}

customElements.define('add-item', AddItem);
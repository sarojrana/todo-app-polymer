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
    let todoList = JSON.parse(localStorage.getItem('todo-list')) || [];
    todoList.push({
      id: new Date().valueOf(),
      item: this.todoItem,
      done: false
    });
    localStorage.setItem('todo-list', JSON.stringify(todoList));
    this.dispatchEvent(new CustomEvent('addTodoItem', {
      bubbles: true,
      composed: true,
      detail: { todoList }
    }));
    this.todoItem = '';
  }

  render(props) {
    return html `
      <div>
        <input .value="${this.todoItem}" @keyup="${(e) => this.inputKeyUp(e)}">
        </input>
        <button @click="${(e) => this.addItem()}"> Add </button>
      </div>
    `;
  }
}

customElements.define('add-item', AddItem);
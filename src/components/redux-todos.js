import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';

import '@polymer/paper-checkbox';
import '@polymer/paper-radio-group';

import { store } from '../redux/store';
import {
  addTodo,
  deleteTodo,
  updateFilter,
  clearCompleted,
  updateTodoStatus
} from '../redux/actions/todo';
import {
  VisibilityFilters,
  getVisibleTodosSelector
} from '../redux/reducers/todo';

class ReduxTodos extends connect(store) (LitElement) {
  static get properties() {
    return {
      todos: Array,
      filter: String,
      task: String
    }
  }

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.filter;
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

          paper-radio-button.blue {
            --paper-radio-button-checked-color: #0680b1;
          }
        </style>
      </custom-style>
      <style>
        h3 {
          color: #0581b1;
        }
        .todo-list {
          padding-top: 1em;
        }
        .todo-item {
          background: #fff;
          padding: 0.5rem 1rem;
          border: 2px solid #ccc;
          border-radius: 2px;
          margin-bottom: 0.5em;
        }
        .todo-item:hover .delete {
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
        .filter {
          margin-top: 2rem;
        }
        .clear-completed {
          background: #0680b1;
          border: none;
          color: #fff;
          font-weight: bold;
          padding: 0.5em;
          border-radius: 5px;
          cursor: pointer;
        }
      </style>
      <h3>Add New Todo</h3>
      <div class="input" @keyup=${this.shortcutListener}>
        <input type="text" placeholder="Add todo task" 
          @change=${this.updateTask} .value=${this.task || ''}>
        <button id="add-todo" class="add-btn" @click=${this.addTodo}>Add Task </button>
      </div>
      <div class="todo-list">
        ${
          this.todos.map(todo => html `
            <div class="todo-item">
              <paper-checkbox class="green" ?checked=${todo.done}
                @change=${e => this.updateTodoStatus(todo)} noink>
                <span class="title"> ${todo.todo} </span>
              </paper-checkbox>
              <span id="delete-todo" class="delete" @click="${e => this.deleteTodoItem(todo)}">X</span>
            </div>
          `)
        }
        
      </div>
      <div class="filter">
        <div class="radio-btns">
          <paper-radio-group .selected=${this.filter} @change=${this.filterChanged}>
            ${
              Object.values(VisibilityFilters).map(filter => html `
                <paper-radio-button class="blue" value="${filter}" name="${filter}" noink>
                  ${filter}
                </paper-radio-button>
              `)
            }
          </paper-radio-group>
          <button class="clear-completed" @click=${this.clearCompleted}>Clear Completed</button>
        </div>
      </div>
    `;
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  shortcutListener(e) {
    if(e.key == 'Enter') {
      this.addTodo();
    }
  }

  addTodo() {
    if(this.task) {
      store.dispatch(addTodo(this.task));
      this.task = '';
    }
  }

  deleteTodoItem(todo) {
    store.dispatch(deleteTodo(todo));
  }

  updateTodoStatus(todo) {
    store.dispatch(updateTodoStatus(todo));
  }

  clearCompleted() {
    store.dispatch(clearCompleted());
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.target.value));
  }
}

customElements.define('redux-todos', ReduxTodos);
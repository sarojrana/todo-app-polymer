import { LitElement, html } from "@polymer/lit-element";

import '@polymer/paper-radio-group';

class Filter extends LitElement {

  static get properties() {
    return {
      filter: String
    }
  }

  constructor() {
    super();
    this.filter = 'All';
  }

  render() {
    return html `
      <custom-style>
        <style is="custom-style">
          paper-radio-button.blue {
            --paper-radio-button-checked-color: #0680b1;
          }
        </style>
      </custom-style>
      <style>
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
      <div class="filter">
        <div class="radio-btns">
          <paper-radio-group .selected=${this.filter} @change=${this.filterChanged}>
            <paper-radio-button class="blue" value="All" name="All" noink>
              All
            </paper-radio-button>
            <paper-radio-button class="blue" value="Active" name="Active" noink>
              Active
            </paper-radio-button>
            <paper-radio-button class="blue" value="Completed" name="Completed" noink>
              Completed
            </paper-radio-button>
          </paper-radio-group>
          <button class="clear-completed" @click=${this.clearCompleted}>Clear Completed</button>
        </div>
      </div>
    `;
  }

  filterChanged(e) {
    this.filter = e.target.value;
    this.dispatchEvent(new CustomEvent('update-filter', {
      bubbles: true,
      composed: true,
      detail: {
        filter: this.filter
      }
    }));
  }

  clearCompleted() {
    this.dispatchEvent(new CustomEvent('clear-completed', {
      bubbles: true,
      composed: true
    }));
  }

}

customElements.define('todo-filter', Filter);
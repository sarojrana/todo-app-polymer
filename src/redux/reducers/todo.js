import { createSelector } from 'reselect';

import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_FILTER,
  CLEAR_COMPLETED,
  UPDATE_TODO_STATUS,
} from '../actions/todo';

export const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

const INITIAL_STATE = {
  todos: [],
  filter: VisibilityFilters.SHOW_ALL
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      }
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo => 
          todo.id === action.todo.id
          ? { ...todo, done: !todo.done }
          : todo
        )
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todo.id)
      }
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.done)
      }
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      }
    default: 
      return state;
  }
}

const getTodosSelector = state => state.todos;
const getFilterSelector = state => state.filter;

export const getVisibleTodosSelector = createSelector(
  getTodosSelector, getFilterSelector,
  (todos, filter) => {
    switch(filter) {
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.done);
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.done);
      default:
        return todos;
    }
  }
);
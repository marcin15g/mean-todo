import { Injectable } from '@angular/core';
import { Todo } from './todos/todo.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TodoService {

  private todos:Todo[] = [];
  private todosUpdated = new Subject<Todo[]>();

  constructor() { }

  getTodos() {
    return [...this.todos];
  }

  getTodosUpdateListener() {
    return this.todosUpdated.asObservable();
  }

  addTodos(todo:string) {
    const newTodo:Todo = {title: todo};
    this.todos.push(newTodo);
    this.todosUpdated.next([...this.todos]);
  }

}

import { Injectable } from '@angular/core';
import { Todo } from './todos/todo.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TodoService {

  private todos:Todo[] = [];
  private todosUpdated = new Subject<Todo[]>();

  constructor(private http: HttpClient) { }

  getTodos() {
    this.http.get<{message: string, todos: Todo[]}>('http://localhost:3000/api/list')
    .subscribe((todoData) => {
      this.todos = todoData.todos;
      this.todosUpdated.next([...this.todos]);
    });
  }

  getTodosUpdateListener() {
    return this.todosUpdated.asObservable();
  }

  addTodos(title: string, desc: string) {
    const newTodo: Todo = {title: title, description: desc};
    this.todos.push(newTodo);
    this.todosUpdated.next([...this.todos]);
  }

}

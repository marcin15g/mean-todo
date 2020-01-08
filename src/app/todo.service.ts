import { Injectable } from '@angular/core';
import { Todo } from './todos/todo.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TodoService {

  private todos:Todo[] = [];
  private todosUpdated = new Subject<Todo[]>();

  constructor(private http: HttpClient) { }

  getTodosUpdateListener() {
    return this.todosUpdated.asObservable();
  }

  getTodos() {
    this.http.get<{message: string, todos: Todo[]}>('http://localhost:3000/api/list')
    .subscribe((todoData) => {
      this.todos = todoData.todos;
      this.todosUpdated.next([...this.todos]);
    });
  }

  addTodos(title: string, desc: string) {
    this.http.post<{message: string, newTodo: Todo}>('http://localhost:3000/api/list', {title: title, description: desc})
      .subscribe((res) => {
        this.todos.push(res.newTodo);
        this.todosUpdated.next([...this.todos]);
      });
  }

  deleteTodo(todoId: string) {
    this.http.delete('http://localhost:3000/api/list/' + todoId)
      .subscribe(() => {       
        const updatedTodos = this.todos.filter(todo => todo._id !== todoId);
        this.todos = updatedTodos;
        this.todosUpdated.next([...this.todos]);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Todo } from '../todo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos:Todo[] = [];
  private todoSub: Subscription;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todoSub = this.todoService.getTodosUpdateListener()
    .subscribe((todos) => {
      this.todos = todos;
    });
  }

  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }



  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }
  

}

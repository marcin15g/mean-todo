import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from 'src/app/todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {

  constructor(public todoService: TodoService) { }

  ngOnInit() {
  }

  onAddTodo(newTodo: NgForm) {
    if(newTodo.invalid) return;
    this.todoService.addTodos(newTodo.value.todoInput);
    newTodo.resetForm();
  }

}

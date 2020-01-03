import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from 'src/app/todo.service';

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
    
    newTodo.resetForm();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {
  constructor(private http: HttpClient) { }
  
  // Add User
  addUser(user) {
    return this.http.post('http://localhost:3030/api/user/addUser/', user);
  }

  // Get User
  getUser() {
    return this.http.get('http://localhost:3030/api/user/getUser/');
  }

  // Update User
  updateUser(user) {
    return this.http.post('http://localhost:3030/api/user/updateUser/', user);
  }

  // Delete User
  deleteUser(user) {
    return this.http.post('http://localhost:3030/api/user/deleteUser/', user);
  }

  // Add Project
  addProject(project) {
    return this.http.post('http://localhost:3030/api/project/addProject/', project);
  }

  // Get Project
  getProject() {
    return this.http.get('http://localhost:3030/api/project/getProject/');
  }

  // Update Project
  updateProject(project) {
    return this.http.post('http://localhost:3030/api/project/updateProject/', project);
  }

  // Delete Project
  deleteProject(project) {
    return this.http.post('http://localhost:3030/api/project/deleteProject/', project);
  }

  // Add Task
  addTask(task) {
    return this.http.post('http://localhost:3030/api/task/addTask/', task);
  }

  // Get Task
  getTask() {
    return this.http.get('http://localhost:3030/api/task/getTask/');
  }

  // Update Task
  updateTask(task) {
    return this.http.post('http://localhost:3030/api/task/updateTask/', task);
  }

  // Delete Task
  deleteTask(task) {
    return this.http.post('http://localhost:3030/api/task/deleteTask/', task);
  }
}

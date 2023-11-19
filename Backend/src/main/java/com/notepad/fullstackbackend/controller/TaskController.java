package com.notepad.fullstackbackend.controller;

import com.notepad.fullstackbackend.exception.TaskNotFoundException;
import com.notepad.fullstackbackend.model.Task;
import com.notepad.fullstackbackend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/task")
    Task newTask(@RequestBody Task newTask){
        return taskRepository.save(newTask);
    }

    @GetMapping("/tasks")
    List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @GetMapping("/task/{id}")
    Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id).orElseThrow(()->new TaskNotFoundException(id));
    }

    @PutMapping("/task/{id}")
    Task updateTask(@RequestBody Task newTask,@PathVariable Long id){
        return taskRepository.findById(id).map(task -> {
            task.setTitle(newTask.getTitle());
            task.setDescription(newTask.getDescription());
            task.setDeadline(newTask.getDeadline());
            return taskRepository.save(task);
        }).orElseThrow(()->new TaskNotFoundException(id));
    }

    @DeleteMapping ("/task/{id}")
    String deleteTask(@PathVariable Long id){
        if(!taskRepository.existsById(id)){
            throw new TaskNotFoundException(id);
        }
        taskRepository.deleteById(id);
        return "Task with id "+id+" has been deleted.";
    }
}

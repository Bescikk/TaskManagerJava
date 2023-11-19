package com.notepad.fullstackbackend.exception;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(Long id){
        super("Could not found the task with id "+id);
    }
}

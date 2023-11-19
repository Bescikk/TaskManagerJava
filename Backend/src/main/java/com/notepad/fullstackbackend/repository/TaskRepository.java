package com.notepad.fullstackbackend.repository;


import com.notepad.fullstackbackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,Long> {

}

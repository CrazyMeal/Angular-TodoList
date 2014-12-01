package todo.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import todo.TodoTask;
import todo.TodoTaskRepository;

@RestController
@RequestMapping("/todo")
public class TodoTaskRestController {
	private final TodoTaskRepository todoTaskRepository;
	
	@RequestMapping(method = RequestMethod.GET)
	Collection<TodoTask> readBookmarks() {
		//this.validateUser(userId);
		return this.todoTaskRepository.findAll();
	}
	
	@Autowired
	TodoTaskRestController(TodoTaskRepository todoTaskRepository) {
		this.todoTaskRepository = todoTaskRepository;
	}
}

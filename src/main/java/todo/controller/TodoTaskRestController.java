package todo.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import todo.TodoTask;
import todo.TodoTaskRepository;

@RestController
@RequestMapping("/todo")
public class TodoTaskRestController {
	private final TodoTaskRepository todoTaskRepository;
	
	@RequestMapping(method = RequestMethod.POST)
	ResponseEntity<?> add(@RequestBody TodoTask input) {
		//this.validateUser(userId);
		
		
		//TodoTask account = this.todoTaskRepository.findById(Long.valueOf(todoId));
		
		TodoTask result = todoTaskRepository.save(new TodoTask(input.title, input.description));

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(result.getId()).toUri());
		return new ResponseEntity<>(null,httpHeaders,HttpStatus.CREATED);
	}
	
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

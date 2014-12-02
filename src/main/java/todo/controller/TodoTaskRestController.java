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
	
	@RequestMapping(method = RequestMethod.POST,produces = "application/json")
	ResponseEntity<?> add(@RequestBody TodoTask input) {
		TodoTask result = todoTaskRepository.save(new TodoTask(input.title, input.description));

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/todo").buildAndExpand(result.getId()).toUri());
		return new ResponseEntity<>("{\"success\" : \"true\"}",httpHeaders,HttpStatus.CREATED);
	}
	
	@RequestMapping(value ="/{id}", method = RequestMethod.PUT,produces = "application/json")
	ResponseEntity<?> update(@PathVariable Long id,@RequestBody TodoTask input) {
		
		TodoTask existing = todoTaskRepository.findById(input.getId());
		existing.title = input.title;
		existing.description = input.description;
		existing.collapse = input.collapse;
		todoTaskRepository.save(existing);

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/todo").buildAndExpand(existing.getId()).toUri());
		return new ResponseEntity<>("{\"success\" : \"true\"}",httpHeaders,HttpStatus.OK);
	}
	
	@RequestMapping(value ="/{id}", method = RequestMethod.DELETE)
	ResponseEntity<Boolean> delete(@PathVariable Long id) {
		
		todoTaskRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE ,HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET,produces = "application/json")
	Collection<TodoTask> readBookmarks() {
		//this.validateUser(userId);
		return this.todoTaskRepository.findAll();
	}
	
	@Autowired
	TodoTaskRestController(TodoTaskRepository todoTaskRepository) {
		this.todoTaskRepository = todoTaskRepository;
	}
}

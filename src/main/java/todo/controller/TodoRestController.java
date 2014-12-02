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

import todo.exception.TodoNotFoundException;
import todo.model.Todo;
import todo.repository.TodoRepository;

@RestController
@RequestMapping("/todo")
public class TodoRestController {
	private final TodoRepository todoTaskRepository;
	
	@RequestMapping(method = RequestMethod.POST,produces = "application/json")
	ResponseEntity<?> add(@RequestBody Todo input) {
		Todo result = todoTaskRepository.save(new Todo(input.title));
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/todo").buildAndExpand(result.getId()).toUri());
		return new ResponseEntity<>(result,httpHeaders,HttpStatus.CREATED);
	}
	
	@RequestMapping(value ="/{id}", method = RequestMethod.PUT,produces = "application/json")
	ResponseEntity<?> update(@PathVariable Long id,@RequestBody Todo input) {
		if(todoTaskRepository.findById(id) == null)
			throw new TodoNotFoundException(id);
		Todo existing = todoTaskRepository.findById(input.getId());
		existing.title = input.title;
		existing.finished = input.finished;
		Todo saved = todoTaskRepository.save(existing);

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/todo").buildAndExpand(existing.getId()).toUri());
		return new ResponseEntity<>(saved,httpHeaders,HttpStatus.OK);
	}
	
	@RequestMapping(value ="/{id}", method = RequestMethod.DELETE)
	ResponseEntity<Boolean> delete(@PathVariable Long id) {
		if(todoTaskRepository.findById(id) == null)
			throw new TodoNotFoundException(id);
		todoTaskRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE ,HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET,produces = "application/json")
	Collection<Todo> readBookmarks() {
		return this.todoTaskRepository.findAll();
	}
	
	@Autowired
	TodoRestController(TodoRepository todoTaskRepository) {
		this.todoTaskRepository = todoTaskRepository;
	}
}

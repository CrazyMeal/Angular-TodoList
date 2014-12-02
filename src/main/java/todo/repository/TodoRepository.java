package todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import todo.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
	Todo findById(Long id);
}

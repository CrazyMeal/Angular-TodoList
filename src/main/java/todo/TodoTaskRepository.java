package todo;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoTaskRepository extends JpaRepository<TodoTask, Long> {
	Collection<TodoTask> findById(Long id);
}

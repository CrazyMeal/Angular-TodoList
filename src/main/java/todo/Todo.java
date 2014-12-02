package todo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Todo {
	
	@Id
	@GeneratedValue
	private Long id;
	
	public String title;
	public boolean finished;

	Todo() { // jpa only
	}
	
	public Todo(String title){
		this.title = title;
		this.finished = false;
	}
	
	public Todo(String title, boolean finished){
		this.title = title;
		this.finished = finished;
	}
	
	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}
}

package todo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class TodoTask {
	
	@Id
	@GeneratedValue
	private Long id;
	
	public String title;
	public String description;
	public State state;
	public boolean collapse;
	
	
	

	TodoTask() { // jpa only
	}
	
	public TodoTask(String title, String description){
		this.title = title;
		this.description = description;
		this.state = State.notFinished;
		this.collapse = false;
		//this.owner = owner;
	}
	
	public Long getId() {
		return id;
	}
	public String getDescription() {
		return description;
	}

	public String getTitle() {
		return title;
	}

	public State getState() {
		return state;
	}

	public boolean isCollapse() {
		return collapse;
	}
}

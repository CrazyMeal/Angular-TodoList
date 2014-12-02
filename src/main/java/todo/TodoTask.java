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
	public boolean finished;
	public boolean collapse;
	
	
	

	TodoTask() { // jpa only
	}
	
	public TodoTask(String title, String description){
		this.title = title;
		this.description = description;
		this.finished = false;
		this.collapse = false;
	}
	
	public TodoTask(String title, String description, boolean finished){
		this.title = title;
		this.description = description;
		this.finished = finished;
		this.collapse = false;
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

	public boolean getState() {
		return finished;
	}

	public boolean isCollapse() {
		return collapse;
	}
}

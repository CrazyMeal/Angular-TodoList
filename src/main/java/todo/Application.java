package todo;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import todo.model.Todo;
import todo.repository.TodoRepository;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application {
	
	@Bean
	CommandLineRunner init(final TodoRepository accountRepository) {
		
		CommandLineRunner runner = new CommandLineRunner(){

			@Override
			public void run(String... arg0) throws Exception {
				for(String s : Arrays.asList("Acheter du pain, Poster des lettres, Nourir le chat".split(","))){
					accountRepository.save(new Todo(s));
				}
				accountRepository.save(new Todo("Faire le projet Todo", true));
				accountRepository.save(new Todo("Se préparer à la nuit de l'info", true));
			}	
		};
		return runner;
	}
	
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

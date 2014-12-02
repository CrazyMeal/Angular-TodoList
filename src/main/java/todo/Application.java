package todo;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application {
	
	@Bean
	CommandLineRunner init(final TodoRepository accountRepository) {
		
		CommandLineRunner runner = new CommandLineRunner(){

			@Override
			public void run(String... arg0) throws Exception {
				for(String s : Arrays.asList("Bring sugar,Watch TV, Buy milk".split(","))){
					accountRepository.save(new Todo(s));
				}
				accountRepository.save(new Todo("Un tache finie", true));
			}	
		};
		return runner;
	}
	
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

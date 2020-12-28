package com.packt.fullstack;

import com.packt.fullstack.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@SpringBootApplication
public class FullstackApplication {

    @Autowired
    private CarRepository repository;


    @Autowired
    private OwnerRepository orepository;

    @Autowired
    private UserRepository urepository;

    private static final Logger logger = LoggerFactory.getLogger(FullstackApplication.class);

    public static void main(String[] args) {
        logger.info("Hello Spring Boot");
        SpringApplication.run(FullstackApplication.class, args);
    }

    public <T> T givenList_shouldReturnARandomElement(List<T> givenList) {
        Random rand = new Random();
        return givenList.get(rand.nextInt(givenList.size()));
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {

            Owner owner1 = new Owner("John", "Johnson");
            Owner owner2 = new Owner("Mary", "Robinson");
            orepository.save(owner1);
            orepository.save(owner2);

           List<String> listBrand = List.of("Ford", "Nissa", "Toyota");
            List<String> listModel = List.of("Mustang", "Leaf", "Prius");
            List<String> listColor = List.of("Red", "White", "Black", "Silver");
            List<String> listRegisterNumber = List.of("ADF-1121", "SSJ-3002", "KKO-0212");
            Random rand = new Random();
            List<Integer> years = Stream.iterate(0, n -> rand.nextInt(21) + 2000).limit(10).collect(Collectors.toList());
            List<Integer> prices = Stream.iterate(0, n -> rand.nextInt(30000) + 20000).limit(10).collect(Collectors.toList());
            List<Owner> owners = List.of(owner1, owner2);

            ArrayList<Car> cars = new ArrayList<>();
            for (int i = 0; i < 8; i++) {
                cars.add(new Car(
                        givenList_shouldReturnARandomElement(listBrand),
                        givenList_shouldReturnARandomElement(listModel),
                        givenList_shouldReturnARandomElement(listColor),
                        givenList_shouldReturnARandomElement(listRegisterNumber),
                        givenList_shouldReturnARandomElement(years),
                        givenList_shouldReturnARandomElement(prices),
                        givenList_shouldReturnARandomElement(owners)));
            }
            repository.saveAll(cars);
            PasswordEncoder bript = new BCryptPasswordEncoder();

            urepository.save(new UserAccount("user", bript.encode("password1"), "USER"));
            urepository.save(new UserAccount("admin", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", "ADMIN"));
        };
    }

}

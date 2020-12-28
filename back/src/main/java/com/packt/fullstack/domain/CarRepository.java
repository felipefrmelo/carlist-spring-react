package com.packt.fullstack.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CarRepository extends CrudRepository <Car, Long> {
    // Fetch cars by brand

    @Query("select c from Car c where  UPPER(c.brand) like UPPER(concat(?1, '%'))")
    List<Car> findByBrandStartsWith(String brand);

    List<Car> findByBrandEndsWith(@Param("brand") String brand);

    // Fetch cars by color
    List<Car> findByColor(@Param("color") String color);
}
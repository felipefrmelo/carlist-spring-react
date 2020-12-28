package com.packt.fullstack;

import com.packt.fullstack.web.CarController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class FullstackApplicationTests {
    @Autowired
    private CarController controller;
    @Test
    void contextLoads() {
        assertThat(controller).isNotNull();
    }

}

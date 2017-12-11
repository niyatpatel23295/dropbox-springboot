package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"service","com.services.controllers", "com.ensat.services"
})
public class SpringBootDemo {
    public static void main(String[] args){
        SpringApplication.run(SpringBootDemo.class,args);
    }
}
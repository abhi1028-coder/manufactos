package com.manufactos.workforce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class WorkforceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkforceServiceApplication.class, args);
    }
}

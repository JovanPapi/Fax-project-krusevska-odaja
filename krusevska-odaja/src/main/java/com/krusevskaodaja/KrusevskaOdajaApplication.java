package com.krusevskaodaja;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
public class KrusevskaOdajaApplication {

    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    public static void main(String[] args) {
        SpringApplication.run(KrusevskaOdajaApplication.class, args);


//        Connection connection = null;
//        try {
//            Class.forName("org.postgresql.Driver");
//            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres",
//                    "postgres", "papalazoski");
//            System.out.println("Opened database succ");
//        } catch (ClassNotFoundException | SQLException e) {
//            e.printStackTrace();
//        }

    }

}

package com.bice.api;

import com.intuit.karate.junit5.Karate;

public class KarateRunner {

    @Karate.Test
    Karate apiTests() {
        return Karate.run("classpath:features/api/users.feature")
        .outputCucumberJson(true);
    }

}

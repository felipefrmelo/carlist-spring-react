package com.packt.fullstack.domain;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserAccount, Long> {
    UserAccount findByUsername(String username);
}
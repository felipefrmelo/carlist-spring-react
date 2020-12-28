package com.packt.fullstack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.packt.fullstack.domain.UserAccount;
import com.packt.fullstack.domain.UserRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository repository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        UserAccount currentUserAccount = repository.findByUsername(username);
        return new org.springframework.security.core
                .userdetails.User(username, currentUserAccount.getPassword()
                , true, true, true, true,
                AuthorityUtils.createAuthorityList(currentUserAccount.getRole()));
    }

}
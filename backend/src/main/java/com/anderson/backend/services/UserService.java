package com.anderson.backend.services;

import com.anderson.backend.models.UserModel;
import com.anderson.backend.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    IUserRepository userRepository;

    public UserModel createUser(UserModel user) {
        return this.userRepository.save(user);
    }

    public Boolean deleteUser(Long id){
        try {
            this.userRepository.deleteById(id);
            return true;
        } catch (Exception e){
            return false;
        }
    }
}

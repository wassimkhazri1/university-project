package com.university.manager.services;

import java.util.List;
import java.util.Optional;

import com.university.manager.models.User;

//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
public interface UserService {

	List<User> listUsers();

	Optional<User> findById(Long id);

	User save(User user);

	void deleteById(Long id);

	List<User> findByMatriculeContaining(String matricule);

	Optional<User> findUserById(Long id);

}
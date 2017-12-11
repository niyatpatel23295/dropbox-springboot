package com.service;

import com.entity.User;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    public void addUser(User user){
        userRepository.save(user);
    }
    
    @Query
    public String[] getEmail() {
        EntityManagerFactory emf = Persiscance.createEntityManagerFactory("hibernate.cfg.xml");
        EntityManager em = emf.createEntityManager();
        EntityTransaction txn = em.getTransaction();

        try {
            txn.begin();

            Query query = session.createQuery("select distinct email from users");

            List<Users> users = query.list();

            txn.commit();
        } catch(Exception e) {
            if(txn != null) { txn.rollback(); }
            e.printStackTrace();
    }
    public List<User> login(String email,String password){
        return userRepository.findByEmailAndPassword(email,password);
    }

	public MultiValueMap list(UserService userService) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
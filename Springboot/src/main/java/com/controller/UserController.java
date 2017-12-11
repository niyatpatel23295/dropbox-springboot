package com.controller;

import com.entity.User;
import com.mysql.fabric.xmlrpc.base.Array;
import com.service.UserService;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.html.HTMLParagraphElement;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user") // This means URL's start with /user (after Application path)
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path="/add",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        userService.addUser(user);
        System.out.println(user);
        return new ResponseEntity(user,HttpStatus.CREATED);
    }

    @GetMapping(path="/all",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON with the users
        return userService.getAllUsers();
    }

    @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        session.setAttribute("email",jsonObject.getString("email"));
        return new ResponseEntity(userService.login(jsonObject.getString("email"),jsonObject.getString("password")),HttpStatus.OK);
    }
    
    @PostMapping(path="/list",consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String list(@RequestBody String req)
    {
    		JSONObject res_json = new JSONObject();
    		res_json.put("files", new JSONArray());
    		res_json.put("folders", new JSONArray());
        JSONObject pathJSON = new JSONObject(req);
        System.out.println(pathJSON);
        File folder = new File("./files/" + pathJSON.getString("path"));
        
        for (File item : folder.listFiles()) {
			if(item.isFile()) {	
				res_json.getJSONArray("files").put(item.getName());
			}
			else {
				res_json.getJSONArray("folders").put(item.getName());
			}
		}
        
        return res_json.toString();
    }

    @PostMapping(path="/getallemails",consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String list(@RequestBody String req)
    {
        EntityManagerFactory emf = Persiscance.createEntityManagerFactory("hibernate.cfg.xml");
        EntityManager em = emf.createEntityManager();
        EntityTransaction txn = em.getTransaction();

        try {
            txn.begin();

            Query query = session.createQuery("select distinct a.authorName from Article s
                                                where s.author like "Joe%" and title = 'Spring boot');

            List<Users> users = query.list();

            txn.commit();
        } catch(Exception e) {
            if(txn != null) { txn.rollback(); }
            e.printStackTrace();
        
        return res_json.toString();
    }

        
    

        @PostMapping(path="/updateprofile",consumes = MediaType.APPLICATION_JSON_VALUE)
        public @ResponseBody String list(@RequestBody String req)
        {
            EntityManagerFactory emf = Persiscance.createEntityManagerFactory("hibernate.cfg.xml");
            EntityManager em = emf.createEntityManager();
            EntityTransaction txn = em.getTransaction();

            try {
                txn.begin();


                Query query = session.createQuery(req.body.userData);

                List<Users> users = query.list();

                txn.commit();
            } catch(Exception e) {
                if(txn != null) { txn.rollback(); }
                e.printStackTrace();
            
            return res_json.toString();
        }
            
            
            
            
    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return  new ResponseEntity(HttpStatus.OK);
    }
}
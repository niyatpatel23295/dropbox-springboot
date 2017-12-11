package usertest;

import java.nio.file.Paths;
import java.util.stream.Stream;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.controller.FileUploadController;
import com.service.StorageFileNotFoundException;
import com.service.StorageService;
import com.service.UserService;

@SpringBootTest(classes = FileUploadController.class)
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc

public class UserTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService userService;

    
    @Test
    public void shouldAllowUserWithValidCreds() throws Exception {


        
        UsernamePasswordAuthenticationToken principal = 
                this.getPrincipal("test1");

        MockHttpSession session = new MockHttpSession();
        session.setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, 
                new MockSecurityContext(principal));


        super.mockMvc
            .perform(
                    get("/api/v1/resource/test")
                    .session(session))
            .andExpect(status().isOk());
        
    }

    @Test
    public void shouldNtAllowUserWithInValidCreds() throws Exception {
        UsernamePasswordAuthenticationToken principal = 
                this.getPrincipal("test1");

        MockHttpSession session = new MockHttpSession();
        session.setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, 
                new MockSecurityContext(principal));


        super.mockMvc
            .perform(
                    get("/api/v1/resource/test")
                    .session(session))
            .andExpect(status().isForbidden());
        
        
    }


}

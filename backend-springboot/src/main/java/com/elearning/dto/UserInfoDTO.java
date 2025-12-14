package com.elearning.dto;

import java.util.List;
import java.util.Map;

public class UserInfoDTO {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
    private Map<String, Object> claims;
    
    // Getters et Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
    
    public Map<String, Object> getClaims() { return claims; }
    public void setClaims(Map<String, Object> claims) { this.claims = claims; }
    
    // Constructeurs
    public UserInfoDTO() {}
    
    public UserInfoDTO(String username, String email, String firstName, 
                      String lastName, List<String> roles, Map<String, Object> claims) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.claims = claims;
    }
}

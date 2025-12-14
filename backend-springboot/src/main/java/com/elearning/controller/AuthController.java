package com.elearning.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("username", jwt.getClaimAsString("preferred_username"));
        userInfo.put("email", jwt.getClaimAsString("email"));
        
        // Extraire les rôles - CORRECTION pour Spring Boot 2.7
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null) {
            List<String> roles = (List<String>) realmAccess.get("roles");
            userInfo.put("roles", roles);
            
            // Rechercher ROLE_ADMIN et ROLE_STUDENT
            boolean isAdmin = false;
            boolean isStudent = false;
            
            for (String role : roles) {
                if (role.equals("ROLE_ADMIN") || role.equals("ADMIN")) {
                    isAdmin = true;
                }
                if (role.equals("ROLE_STUDENT") || role.equals("STUDENT")) {
                    isStudent = true;
                }
            }
            
            userInfo.put("isAdmin", isAdmin);
            userInfo.put("isStudent", isStudent);
        }
        
        return userInfo;
    }
    
    @GetMapping("/test-admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ADMIN')")
    public Map<String, String> adminEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Endpoint ADMIN - Accès autorisé");
        response.put("status", "200 OK");
        return response;
    }
    
    @GetMapping("/test-student")
    @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('STUDENT')")
    public Map<String, String> studentEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "✅ Endpoint STUDENT - Accès autorisé");
        response.put("status", "200 OK");
        return response;
    }
}
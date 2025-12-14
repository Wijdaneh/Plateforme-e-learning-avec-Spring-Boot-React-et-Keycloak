package com.elearning.controller;
import com.elearning.dto.UserInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserInfoDTO> getUserInfo(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        UserInfoDTO userInfo = new UserInfoDTO();
        
        userInfo.setUsername(jwt.getClaimAsString("preferred_username"));
        userInfo.setEmail(jwt.getClaimAsString("email"));
        userInfo.setFirstName(jwt.getClaimAsString("given_name"));
        userInfo.setLastName(jwt.getClaimAsString("family_name"));
        
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null) {
            @SuppressWarnings("unchecked")
            List<String> roles = (List<String>) realmAccess.get("roles");
            userInfo.setRoles(roles);
        }
        
        List<String> springRoles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());
        userInfo.setRoles(springRoles);
        
        userInfo.setClaims(jwt.getClaims());
        
        return ResponseEntity.ok(userInfo);
    }
}
package com.elearning.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    
    private List<Map<String, Object>> courses = new ArrayList<>();
    private Long nextId = 1L;
    
    public CourseController() {
        // Données de test
        courses.add(createCourse(1L, "Java Débutant", "Programmation", 45));
        courses.add(createCourse(2L, "Spring Boot", "Backend", 60));
        courses.add(createCourse(3L, "React JS", "Frontend", 50));
        courses.add(createCourse(4L, "Base de données", "Data", 55));
    }
    
    private Map<String, Object> createCourse(Long id, String title, String category, int duration) {
        Map<String, Object> course = new HashMap<>();
        course.put("id", id);
        course.put("title", title);
        course.put("description", "Description pour " + title);
        course.put("instructor", "Professeur " + title);
        course.put("duration", duration);
        course.put("category", category);
        course.put("price", 199.99);
        return course;
    }
    
    @GetMapping
    public List<Map<String, Object>> getAllCourses() {
        return courses;
    }
    
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Map<String, Object> createCourse(@RequestBody Map<String, Object> newCourse) {
        newCourse.put("id", nextId++);
        courses.add(newCourse);
        return newCourse;
    }
}
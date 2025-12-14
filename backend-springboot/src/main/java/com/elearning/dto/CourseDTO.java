package com.elearning.dto;

import java.time.LocalDateTime;

public class CourseDTO {
    private Long id;
    private String title;
    private String description;
    private String instructor;
    private Integer duration;
    private String category;
    private Double price;
    private LocalDateTime createdAt;
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
    
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    // Constructeurs
    public CourseDTO() {}
    
    public CourseDTO(Long id, String title, String description, String instructor, 
                     Integer duration, String category, Double price, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instructor = instructor;
        this.duration = duration;
        this.category = category;
        this.price = price;
        this.createdAt = createdAt;
    }
}

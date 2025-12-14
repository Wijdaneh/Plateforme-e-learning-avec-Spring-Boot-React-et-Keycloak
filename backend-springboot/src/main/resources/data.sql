-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(255),
    duration INT,
    category VARCHAR(100),
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO courses (title, description, instructor, duration, category, price, created_at, updated_at) VALUES 
('Java Programming Basics', 'Learn Java programming from scratch', 'Dr. Smith', 40, 'Programming', 299.99, NOW(), NOW()),
('Spring Boot Masterclass', 'Build REST APIs with Spring Boot', 'Prof. Johnson', 30, 'Backend', 399.99, NOW(), NOW()),
('React Fundamentals', 'Modern frontend development with React', 'Ms. Williams', 25, 'Frontend', 249.99, NOW(), NOW()),
('Database Design', 'Learn SQL and database design principles', 'Dr. Brown', 35, 'Database', 349.99, NOW(), NOW());
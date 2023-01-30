package com.emanuel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emanuel.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}

//package com.university.manager.services;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.university.manager.models.Student;
//import com.university.manager.repositories.StudentRepository;
//
//@Service
//@Transactional
//public class StudentServiceImpl implements StudentService {
//
//	@Autowired
//	StudentRepository studentRepository;
//
//	@Override
//	public List<Student> listStudents() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public Optional<Student> findById(Long id) {
//		// TODO Auto-generated method stub
//		return studentRepository.findById(id);
//	}
//
//	@Override
//	public Student save(Student student) {
//		// TODO Auto-generated method stub
//		return studentRepository.save(student);
//	}
//
//	@Override
//	public void deleteById(Long id) {
//		// TODO Auto-generated method stub
//		studentRepository.deleteById(id);
//	}
//
//	@Override
//	public List<Student> findByMatriculeContaining(String matricule) {
//		// TODO Auto-generated method stub
//		return studentRepository.findByMatriculeContaining(matricule);
//	}
//
//}

package com.example.rh.service;

import com.example.rh.model.Employee;
import com.example.rh.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAll() {
        return repository.findAll();
    }

    public Employee getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Employee save(Employee e) {
        return repository.save(e);
    }

    public Employee update(Long id, Employee updatedEmployee) {
        return repository.findById(id)
                .map(employee -> {
                    employee.setName(updatedEmployee.getName());
                    employee.setOccupation(updatedEmployee.getOccupation());
                    employee.setSalary(updatedEmployee.getSalary());
                    employee.setIdentificationNumber(updatedEmployee.getIdentificationNumber());
                    employee.setBirthDate(updatedEmployee.getBirthDate());
                    employee.setContractStart(updatedEmployee.getContractStart());
                    employee.setContractEnd(updatedEmployee.getContractEnd());
                    employee.setAddress(updatedEmployee.getAddress());
                    employee.setEmail(updatedEmployee.getEmail());
                    employee.setPhone(updatedEmployee.getPhone());
                    employee.setObservation(updatedEmployee.getObservation());
                    employee.setAbsenceDays(updatedEmployee.getAbsenceDays());
                    return repository.save(employee);
                })
                .orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

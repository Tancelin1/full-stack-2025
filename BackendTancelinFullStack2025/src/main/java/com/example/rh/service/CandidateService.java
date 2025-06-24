package com.example.rh.service;

import com.example.rh.model.Candidate;
import com.example.rh.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateService {
    private final CandidateRepository repository;

    public CandidateService(CandidateRepository repository) {
        this.repository = repository;
    }

    public List<Candidate> getAll() {
        return repository.findAll();
    }

    public Candidate getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Candidate save(Candidate c) {
        return repository.save(c);
    }

    public Candidate update(Long id, Candidate c) {
        Optional<Candidate> existingCandidate = repository.findById(id);
        if (existingCandidate.isPresent()) {
            Candidate candidateToUpdate = existingCandidate.get();

            candidateToUpdate.setName(c.getName());
            candidateToUpdate.setIdCardNumber(c.getIdCardNumber());
            candidateToUpdate.setBirthDate(c.getBirthDate());
            candidateToUpdate.setAddress(c.getAddress());
            candidateToUpdate.setEmail(c.getEmail());
            candidateToUpdate.setPhone(c.getPhone());
            candidateToUpdate.setScore(c.getScore());
            candidateToUpdate.setTechnicalField(c.getTechnicalField());
            candidateToUpdate.setInterviewDate(c.getInterviewDate());
            candidateToUpdate.setObservation(c.getObservation());

            return repository.save(candidateToUpdate);
        } else {
            // Si l'ID n'existe pas, on peut soit renvoyer null, soit créer une nouvelle entrée
            return null;
        }
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

package com.example.rh.controller;

import com.example.rh.model.Candidate;
import com.example.rh.service.CandidateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin (origins = "*")
public class CandidateController {
    private final CandidateService service;

    public CandidateController(CandidateService service) {
        this.service = service;
    }

    @GetMapping
    public List<Candidate> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Candidate getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Candidate save(@RequestBody Candidate c) {
        return service.save(c);
    }

    @PutMapping("/{id}")
    public Candidate update(@PathVariable Long id, @RequestBody Candidate updatedCandidate) {
        return service.update(id, updatedCandidate);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

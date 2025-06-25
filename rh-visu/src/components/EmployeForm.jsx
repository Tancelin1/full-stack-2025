import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EmployeForm = ({ initialData, onSave, onCancel }) => {
  // State local pour tous les champs, avec valeurs initiales ou vides
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    salary: '',
    identificationNumber: '',
    birthDate: '',
    contractStart: '',
    contractEnd: '',
    address: '',
    email: '',
    phone: '',
    observation: '',
    absenceDays: 0,
  });

  // Remplir le formulaire si initialData change (édition)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        occupation: initialData.occupation || '',
        salary: initialData.salary || '',
        identificationNumber: initialData.identificationNumber || '',
        birthDate: initialData.birthDate ? initialData.birthDate.slice(0, 10) : '',
        contractStart: initialData.contractStart ? initialData.contractStart.slice(0, 10) : '',
        contractEnd: initialData.contractEnd ? initialData.contractEnd.slice(0, 10) : '',
        address: initialData.address || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        observation: initialData.observation || '',
        absenceDays: initialData.absenceDays || 0,
      });
    }
  }, [initialData]);

  // Gestion changement inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'absenceDays' || name === 'salary' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  // Soumission formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="occupation">
        <Form.Label>Poste</Form.Label>
        <Form.Control
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="salary">
        <Form.Label>Salaire (€)</Form.Label>
        <Form.Control
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="identificationNumber">
        <Form.Label>Numéro d'identification</Form.Label>
        <Form.Control
          type="text"
          name="identificationNumber"
          value={formData.identificationNumber}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="birthDate">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="contractStart">
        <Form.Label>Début du contrat</Form.Label>
        <Form.Control
          type="date"
          name="contractStart"
          value={formData.contractStart}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="contractEnd">
        <Form.Label>Fin du contrat</Form.Label>
        <Form.Control
          type="date"
          name="contractEnd"
          value={formData.contractEnd}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Adresse</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Téléphone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="observation">
        <Form.Label>Observation</Form.Label>
        <Form.Control
          as="textarea"
          name="observation"
          rows={3}
          value={formData.observation}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="absenceDays">
        <Form.Label>Jours d'absence</Form.Label>
        <Form.Control
          type="number"
          name="absenceDays"
          value={formData.absenceDays}
          onChange={handleChange}
          min="0"
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="me-2">
        Enregistrer
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Annuler
      </Button>
    </Form>
  );
};

export default EmployeForm;

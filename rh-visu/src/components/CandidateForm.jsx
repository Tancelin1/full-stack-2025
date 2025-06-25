import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const CandidateForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    idCardNumber: '',
    birthDate: '',
    address: '',
    email: '',
    phone: '',
    score: '',
    technicalField: '',
    interviewDate: '',
    observation: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        idCardNumber: initialData.idCardNumber || '',
        birthDate: initialData.birthDate || '',
        address: initialData.address || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        score: initialData.score || '',
        technicalField: initialData.technicalField || '',
        interviewDate: initialData.interviewDate || '',
        observation: initialData.observation || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Le nom est requis');
      return;
    }
    if (!formData.email.trim()) {
      alert("L'email est requis");
      return;
    }

    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nom complet"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIdCardNumber">
        <Form.Label>Numéro de carte d'identité</Form.Label>
        <Form.Control
          type="text"
          placeholder="Numéro de carte d'identité"
          name="idCardNumber"
          value={formData.idCardNumber}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthDate">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Adresse</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adresse"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="email@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Téléphone</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Numéro de téléphone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formScore">
        <Form.Label>Note (1 à 10)</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="10"
          name="score"
          value={formData.score}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTechnicalField">
        <Form.Label>Domaine technique</Form.Label>
        <Form.Control
          type="text"
          placeholder="Domaine technique"
          name="technicalField"
          value={formData.technicalField}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formInterviewDate">
        <Form.Label>Date d'entretien</Form.Label>
        <Form.Control
          type="date"
          name="interviewDate"
          value={formData.interviewDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formObservation">
        <Form.Label>Observation</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Observation"
          name="observation"
          value={formData.observation}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Annuler
        </Button>
        <Button variant="primary" type="submit">
          Enregistrer
        </Button>
      </div>
    </Form>
  );
};

export default CandidateForm;

import React, { useState, useEffect } from 'react';

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
        birthDate: initialData.birthDate ? initialData.birthDate.slice(0, 10) : '',
        address: initialData.address || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        score: initialData.score !== undefined ? initialData.score : '',
        technicalField: initialData.technicalField || '',
        interviewDate: initialData.interviewDate ? initialData.interviewDate.slice(0, 10) : '',
        observation: initialData.observation || '',
      });
    } else {
      setFormData({
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
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'score' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>Numéro de carte d'identité</label>
          <input
            type="text"
            name="idCardNumber"
            value={formData.idCardNumber}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Date de naissance</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>Adresse</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-control"
            maxLength={10}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Note (1 à 10)</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            min={1}
            max={10}
            step={1}
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>Domaine technique</label>
          <input
            type="text"
            name="technicalField"
            value={formData.technicalField}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Date d'entretien</label>
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>Observation</label>
          <input
            type="text"
            name="observation"
            value={formData.observation}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-success me-2">
        Enregistrer
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Annuler
      </button>
    </form>
  );
};

export default CandidateForm;

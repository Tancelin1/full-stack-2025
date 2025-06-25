import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import CandidateForm from '../components/CandidateForm';

const API_URL = 'http://localhost:8080/api/candidates';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formInitialData, setFormInitialData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Erreur lors du chargement des candidats');
      const data = await res.json();
      const filtered = data.filter(
        (c) => c.score !== undefined && c.score >= 1 && c.score <= 10
      );
      setCandidates(filtered);
    } catch (error) {
      console.error(error);
      alert('Erreur lors du chargement des candidats');
    }
  };

  const handleAjouterClick = () => {
    setFormInitialData({
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
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormInitialData(null);
  };

  const handleSaveForm = async (data) => {
    let note = Number(data.score);
    if (isNaN(note) || note < 1) note = 1;
    else if (note > 10) note = 10;

    const newData = { ...data, score: note };

    try {
      if (formInitialData && formInitialData.id) {
        const res = await fetch(`${API_URL}/${formInitialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        });
        if (!res.ok) throw new Error('Erreur lors de la mise à jour');
        const updatedCandidate = await res.json();
        setCandidates((prev) =>
          prev.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c))
        );
      } else {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        });
        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        const newCandidate = await res.json();
        if (newCandidate.score >=1 && newCandidate.score <= 10) {
          setCandidates((prev) => [...prev, newCandidate]);
        }
      }
      setShowForm(false);
      setFormInitialData(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleView = (candidate) => {
    setSelectedCandidate(candidate);
    setShowViewModal(true);
  };

  const handleCloseView = () => {
    setShowViewModal(false);
    setSelectedCandidate(null);
  };

  const handleEdit = (candidate) => {
    setFormInitialData(candidate);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmez-vous la suppression de ce candidat ?')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erreur lors de la suppression');
        setCandidates((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 style={{ color: '#0d6efd' }}>Candidats</h2>

      {!showForm && (
        <Button variant="primary" onClick={handleAjouterClick} className="mb-3">
          Ajouter un candidat
        </Button>
      )}

      {showForm && (
        <CandidateForm
          initialData={formInitialData}
          onSave={handleSaveForm}
          onCancel={handleCancelForm}
        />
      )}

      <Table striped bordered hover>
        <thead>
          <tr style={{ backgroundColor: '#0d6efd', color: 'white' }}>
            <th>Nom</th>
            <th>Domaine technique</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.technicalField}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.score}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleView(c)}
                  >
                    Voir
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(c.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                Aucun candidat trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showViewModal} onHide={handleCloseView}>
        <Modal.Header closeButton style={{ backgroundColor: '#0d6efd', color: 'white' }}>
          <Modal.Title>Détails du candidat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCandidate && (
            <div>
              <p><strong>Nom :</strong> {selectedCandidate.name}</p>
              <p><strong>Domaine technique :</strong> {selectedCandidate.technicalField}</p>
              <p><strong>Email :</strong> {selectedCandidate.email}</p>
              <p><strong>Téléphone :</strong> {selectedCandidate.phone}</p>
              <p><strong>Numéro de carte d'identité :</strong> {selectedCandidate.idCardNumber}</p>
              <p><strong>Adresse :</strong> {selectedCandidate.address}</p>
              <p><strong>Date de naissance :</strong> {selectedCandidate.birthDate}</p>
              <p><strong>Date d'entretien :</strong> {selectedCandidate.interviewDate}</p>
              <p><strong>Note :</strong> {selectedCandidate.score}</p>
              <p><strong>Observation :</strong> {selectedCandidate.observation}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Candidates;

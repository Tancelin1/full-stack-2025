import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import CandidateForm from '../components/CandidateForm';
import CandidateDetails from '../components/CandidateDetails';

const API_URL = 'http://localhost:8080/api/candidates';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formInitialData, setFormInitialData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Erreur lors du chargement des candidats');
      const data = await res.json();
      setCandidates(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAjouterClick = () => {
    setFormInitialData({
      name: '',
      technicalField: '',
      email: '',
      phone: '',
      score: '',
    });
    setShowForm(true);
    setSelectedCandidate(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormInitialData(null);
  };

  const handleSaveForm = async (data) => {
    try {
      if (formInitialData && formInitialData.id) {
        const res = await fetch(`${API_URL}/${formInitialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Erreur lors de la mise à jour');
        const updatedCandidate = await res.json();
        setCandidates((prev) =>
          prev.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c))
        );
        setSelectedCandidate(updatedCandidate);
      } else {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Erreur lors de la création');
        const newCandidate = await res.json();
        setCandidates((prev) => [...prev, newCandidate]);
        setSelectedCandidate(newCandidate);
      }
      setShowForm(false);
      setFormInitialData(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleView = (candidate) => {
    setSelectedCandidate(candidate);
    setShowForm(false);
  };

  const handleEdit = (candidate) => {
    setFormInitialData(candidate);
    setShowForm(true);
    setSelectedCandidate(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmez-vous la suppression de ce candidat ?')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erreur lors de la suppression');
        setCandidates((prev) => prev.filter((c) => c.id !== id));
        if (selectedCandidate?.id === id) {
          setSelectedCandidate(null);
        }
      } catch (error) {
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

      {selectedCandidate && !showForm && (
        <div className="mt-4">
          <CandidateDetails
            candidate={selectedCandidate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Candidates;

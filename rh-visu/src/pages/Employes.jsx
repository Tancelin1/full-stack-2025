import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import EmployeForm from '../components/EmployeForm'; // ton formulaire existant

const API_URL = 'http://localhost:8080/api/employees';

const Employes = () => {
  const [employes, setEmployes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formInitialData, setFormInitialData] = useState(null);
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Chargement liste employés
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Erreur lors du chargement des employés');
      const data = await res.json();
      setEmployes(data);
    } catch (error) {
      console.error(error);
      alert('Erreur lors du chargement des employés');
    }
  };

  const handleAjouterClick = () => {
    setFormInitialData({
      name: '',
      identificationNumber: '',
      address: '',
      birthDate: '',
      email: '',
      phone: '',
      occupation: '',
      salary: '',
      contractStart: '',
      contractEnd: '',
      observation: '',
      absenceDays: 0,
    });
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormInitialData(null);
  };

  const handleSaveForm = async (data) => {
    try {
      if (formInitialData && formInitialData.id) {
        // Update existant
        const res = await fetch(`${API_URL}/${formInitialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Erreur lors de la mise à jour');
        const updatedEmploye = await res.json();
        setEmployes((prev) =>
          prev.map((e) => (e.id === updatedEmploye.id ? updatedEmploye : e))
        );
      } else {
        // Ajout nouveau
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        const newEmploye = await res.json();
        setEmployes((prev) => [...prev, newEmploye]);
      }
      setShowForm(false);
      setFormInitialData(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleView = (employe) => {
    setSelectedEmploye(employe);
    setShowViewModal(true);
  };

  const handleCloseView = () => {
    setShowViewModal(false);
    setSelectedEmploye(null);
  };

  const handleEdit = (employe) => {
    setFormInitialData(employe);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmez-vous la suppression de cet employé ?')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erreur lors de la suppression');
        setEmployes((prev) => prev.filter((e) => e.id !== id));
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Employés</h2>

      {!showForm && (
        <Button variant="primary" onClick={handleAjouterClick} className="mb-3">
          Ajouter un employé
        </Button>
      )}

      {showForm && (
        <EmployeForm
          initialData={formInitialData}
          onSave={handleSaveForm}
          onCancel={handleCancelForm}
        />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Poste</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employes.length > 0 ? (
            employes.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.occupation}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleView(e)}
                  >
                    Voir
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(e)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                Aucun employé trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal de visualisation */}
      <Modal show={showViewModal} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmploye && (
            <div>
              <p><strong>Nom :</strong> {selectedEmploye.name}</p>
              <p><strong>Poste :</strong> {selectedEmploye.occupation}</p>
              <p><strong>Email :</strong> {selectedEmploye.email}</p>
              <p><strong>Téléphone :</strong> {selectedEmploye.phone}</p>
              <p><strong>Numéro ID :</strong> {selectedEmploye.identificationNumber}</p>
              <p><strong>Adresse :</strong> {selectedEmploye.address}</p>
              <p><strong>Date de naissance :</strong> {selectedEmploye.birthDate}</p>
              <p><strong>Salaire :</strong> {selectedEmploye.salary} €</p>
              <p><strong>Début contrat :</strong> {selectedEmploye.contractStart}</p>
              <p><strong>Fin contrat :</strong> {selectedEmploye.contractEnd}</p>
              <p><strong>Observation :</strong> {selectedEmploye.observation}</p>
              <p><strong>Jours d'absence :</strong> {selectedEmploye.absenceDays}</p>
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

export default Employes;

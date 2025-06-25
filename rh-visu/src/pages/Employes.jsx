import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import EmployeForm from '../components/EmployeForm';
import EmployeDetails from '../components/EmployeDetails';

const API_URL = 'http://localhost:8080/api/employees';

const Employes = () => {
  const [employes, setEmployes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formInitialData, setFormInitialData] = useState(null);
  const [selectedEmploye, setSelectedEmploye] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEmployes(data);
    } catch {
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
      conges: [],
      absences: [],
    });
    setShowForm(true);
    setSelectedEmploye(null);
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
        if (!res.ok) throw new Error();
        const updatedEmploye = await res.json();
        setEmployes((prev) =>
          prev.map((e) => (e.id === updatedEmploye.id ? updatedEmploye : e))
        );
        setSelectedEmploye(updatedEmploye);
      } else {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error();
        const newEmploye = await res.json();
        setEmployes((prev) => [...prev, newEmploye]);
        setSelectedEmploye(newEmploye);
      }
      setShowForm(false);
      setFormInitialData(null);
    } catch {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleView = (employe) => {
    setSelectedEmploye(employe);
    setShowForm(false);
  };

  const handleEdit = (employe) => {
    setFormInitialData(employe);
    setShowForm(true);
    setSelectedEmploye(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmez-vous la suppression de cet employé ?')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error();
        setEmployes((prev) => prev.filter((e) => e.id !== id));
        if (selectedEmploye?.id === id) {
          setSelectedEmploye(null);
        }
      } catch {
        alert('Erreur lors de la suppression');
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
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleView(e)}>
                    Voir
                  </Button>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(e)}>
                    Modifier
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(e.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">Aucun employé trouvé.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {selectedEmploye && !showForm && (
        <div className="mt-4">
          <h4>Détails de l'employé</h4>
          <EmployeDetails
            employe={selectedEmploye}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Employes;

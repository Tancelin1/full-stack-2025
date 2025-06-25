import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EmployeDetails = ({ employe, handleEdit, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(null); // "conge" ou "absence"
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [congesList, setCongesList] = useState(employe.conges || []);
  const [absencesList, setAbsencesList] = useState(employe.absences || []);

  const openModal = (mode) => {
    setModalMode(mode);
    setStartDate('');
    setEndDate('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode(null);
  };

  const handleSave = () => {
    if (!startDate) {
      alert('Veuillez saisir la date');
      return;
    }
    if (modalMode === 'conge') {
      if (!endDate) {
        alert('Veuillez saisir la date de fin');
        return;
      }
      setCongesList([...congesList, { startDate, endDate }]);
    } else if (modalMode === 'absence') {
      setAbsencesList([...absencesList, { date: startDate }]);
    }
    closeModal();
  };

  return (
    <div>
      <p><strong>Nom :</strong> {employe.name}</p>
      <p><strong>Poste :</strong> {employe.occupation}</p>
      <p><strong>Email :</strong> {employe.email}</p>
      <p><strong>Téléphone :</strong> {employe.phone}</p>

      <Button variant="warning" className="me-2" onClick={() => handleEdit(employe)}>
        Mettre à jour
      </Button>
      <Button variant="info" className="me-2" onClick={() => openModal('conge')}>
        Attribuer un congé
      </Button>
      <Button variant="primary" className="me-2" onClick={() => openModal('absence')}>
        Signaler une absence
      </Button>
      <Button variant="danger" onClick={() => handleDelete(employe.id)}>
        Supprimer
      </Button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === 'conge'
              ? "Donner des congés à l'employé"
              : "Signaler une absence à l'employé"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              {modalMode === 'conge' ? 'Date de début' : "Date de l'absence"}
            </Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>

          {modalMode === 'conge' && (
            <Form.Group className="mb-3">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSave}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ marginTop: '20px' }}>
        <div style={{ backgroundColor: '#cce5ff', padding: '10px', marginBottom: '10px' }}>
          <strong>Congés :</strong>
          <ul>
            {congesList.length > 0 ? (
              congesList.map((conge, i) => (
                <li key={i}>
                  Du {conge.startDate} au {conge.endDate}
                </li>
              ))
            ) : (
              <li>Aucun congé</li>
            )}
          </ul>
        </div>

        <div style={{ backgroundColor: '#d4edda', padding: '10px' }}>
          <strong>Absences :</strong>
          <ul>
            {absencesList.length > 0 ? (
              absencesList.map((absence, i) => (
                <li key={i}>
                  Le {absence.date}
                </li>
              ))
            ) : (
              <li>Aucune absence</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeDetails;

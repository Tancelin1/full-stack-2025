import React from 'react';
import { Button, Card } from 'react-bootstrap';

const CandidateDetails = ({ candidate, onBack, onEdit }) => {
  return (
    <Card className="p-4">
      <h2>Détails du candidat</h2>

      <div className="mb-3">
        <strong>Nom :</strong> {candidate.name}
      </div>
      <div className="mb-3">
        <strong>Poste :</strong> {candidate.occupation}
      </div>
      <div className="mb-3">
        <strong>Salaire :</strong> {candidate.salary} €
      </div>
      <div className="mb-3">
        <strong>Numéro d'identification :</strong> {candidate.identificationNumber}
      </div>
      <div className="mb-3">
        <strong>Date de naissance :</strong> {candidate.birthDate}
      </div>
      <div className="mb-3">
        <strong>Début du contrat :</strong> {candidate.contractStart}
      </div>
      <div className="mb-3">
        <strong>Fin du contrat :</strong> {candidate.contractEnd}
      </div>
      <div className="mb-3">
        <strong>Adresse :</strong> {candidate.address}
      </div>
      <div className="mb-3">
        <strong>Email :</strong> {candidate.email}
      </div>
      <div className="mb-3">
        <strong>Téléphone :</strong> {candidate.phone}
      </div>
      <div className="mb-3">
        <strong>Observation :</strong> {candidate.observation}
      </div>

      <div className="mb-3">
        <strong>Jours de congé globaux :</strong> {candidate.globalConges}
      </div>
      <div className="mb-3">
        <strong>Jours d'absence globaux :</strong> {candidate.globalAbsences}
      </div>

      <div className="d-flex">
        <Button variant="secondary" onClick={onBack} className="me-2">
          Retour
        </Button>
        <Button variant="primary" onClick={onEdit}>
          Modifier
        </Button>
      </div>
    </Card>
  );
};

export default CandidateDetails;

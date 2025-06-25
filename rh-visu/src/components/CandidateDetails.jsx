import React from 'react';
import { Button, Table } from 'react-bootstrap';

const CandidateDetails = ({ candidate, handleEdit, handleDelete }) => {
  if (!candidate) return null;

  return (
    <div>
      <h4>Détails du candidat</h4>
      <div className="mb-3">
        <Button variant="primary" className="me-2" onClick={() => handleEdit(candidate)}>
          Mettre à jour les données
        </Button>
        <Button variant="danger" onClick={() => handleDelete(candidate.id)}>
          Supprimer le candidat
        </Button>
      </div>

      <Table
        striped={false}
        bordered={false}
        hover={false}
        responsive={false}
        style={{ borderCollapse: 'collapse' }}
      >
        <tbody>
          {[
            ['Nom', candidate.name],
            ['Numéro de carte identité', candidate.identificationNumber || '—'],
            ['Date de naissance', candidate.birthDate || '—'],
            ['Adresse', candidate.address || '—'],
            ['Email', candidate.email],
            ['Téléphone', candidate.phone || '—'],
            ['Note (1-10)', candidate.score || '—'],
            ['Domaine technique', candidate.technicalField || '—'],
            ['Date de l\'entretien', candidate.interviewDate || '—'],
            ['Observation', candidate.observation || '—'],
          ].map(([label, value]) => (
            <tr key={label}>
              <td style={{ padding: '4px 8px', fontWeight: 'bold', width: '40%' }}>{label}</td>
              <td style={{ padding: '4px 8px' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CandidateDetails;

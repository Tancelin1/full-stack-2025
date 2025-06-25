import React, { useEffect, useState } from 'react';

export default function Accueil() {
  const [candidatesCount, setCandidatesCount] = useState(null);
  const [employeesCount, setEmployeesCount] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/candidates')
      .then(res => res.json())
      .then(data => setCandidatesCount(data.length || 0))
      .catch(() => setCandidatesCount(0));

    fetch('http://localhost:8080/api/employees')
      .then(res => res.json())
      .then(data => setEmployeesCount(data.length || 0))
      .catch(() => setEmployeesCount(0));
  }, []);

  return (
    <div className="p-4">
      <h1>Accueil</h1>
      <div className="d-flex gap-4 mt-4">
        <div className="card flex-fill">
          <div className="card-body">
            <h5 className="card-title">Nombre de candidats</h5>
            <p className="card-text fs-3">{candidatesCount !== null ? candidatesCount : 'Chargement...'}</p>
          </div>
        </div>
        <div className="card flex-fill">
          <div className="card-body">
            <h5 className="card-title">Nombre d'employés</h5>
            <p className="card-text fs-3">{employeesCount !== null ? employeesCount : 'Chargement...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

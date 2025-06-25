import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column p-3 bg-light vh-100" style={{ width: '200px' }}>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" end>
            {t('nav.home')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/employes" className="nav-link">
            {t('nav.employees')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/candidats" className="nav-link">
            {t('nav.candidates')}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
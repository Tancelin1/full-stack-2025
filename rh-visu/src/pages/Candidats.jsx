import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Candidats() {
  const { t } = useTranslation();
  return <h1>{t('pages.candidates')}</h1>;
}
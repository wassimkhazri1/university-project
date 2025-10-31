import React, { useState } from 'react';
import './DepartmentsSection.css';

function DepartmentDropdown({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setOpen(!open)}>
        {title}
        <span className="arrow">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div className="dropdown-content">
          {links.map((link, index) => (
            <a key={index} href={link.href} className="dropdown-item">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function DepartmentsSection() {
  return (
    <section id="departments" className="section departments">
      <h2>Départements</h2>
      <div className="dropdown-group">
        <DepartmentDropdown
          title="Génie Électrique"
          links={[
            { label: 'Présentation', href: '/presentationelec' },
            { label: 'Liste d\'Enseignants', href: '/elec/listenseignants' },
            { label: 'Nouveautés', href: '/elec/news' },
          ]}
        />
        <DepartmentDropdown
          title="Informatique"
          links={[
            { label: 'Présentation', href: '/presentationinfo' },
            { label: 'Liste d\'Enseignants', href: '/info/listenseignants' },
            { label: 'Nouveautés', href: '/info/news' },
          ]}
        />
        <DepartmentDropdown
          title="Gestion"
          links={[
            { label: 'Présentation', href: '/presentationgest' },
            { label: 'Liste d\'Enseignants', href: '/gest/listenseignants' },
            { label: 'Nouveautés', href: '/gest/news' },
          ]}
        />
      </div>
    </section>
  );
}

export default DepartmentsSection;

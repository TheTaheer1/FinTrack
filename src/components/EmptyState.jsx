import React from 'react';
import { LuPackageOpen as PackageOpen } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const EmptyState = ({ title, message, actionText, actionLink }) => {
  return (
    <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        <PackageOpen size={64} opacity={0.5} />
      </div>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
        {message}
      </p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;

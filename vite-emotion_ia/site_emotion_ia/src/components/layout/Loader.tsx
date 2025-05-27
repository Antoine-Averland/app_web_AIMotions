import React from 'react';

const loaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '100px',
};

const spinnerStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    border: '6px solid #e0e0e0',
    borderTop: '6px solid #1976d2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
};

const styleSheet = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
`;

interface LoaderProps {
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => (
    <div style={loaderStyle}>
        <style>{styleSheet}</style>
        <div style={spinnerStyle} />
        {message && (
            <span style={{ marginLeft: '16px', fontSize: '1rem', color: '#1976d2' }}>
                {message}
            </span>
        )}
    </div>
);

export default Loader;
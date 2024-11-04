import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface LoadingSpinnerProps {
  loading: boolean;
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading, size = 50, color = '#3498db' }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <ClipLoader color={color} loading={loading} size={size} />
  </div>
);

export default LoadingSpinner;
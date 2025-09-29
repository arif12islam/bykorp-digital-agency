interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function LoadingSpinner({ size = 'medium', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/bykorp_logo.png"
        alt="Loading..."
        className={`${sizeClasses[size]} animate-pulse`}
        style={{
          animation: 'pulse 1.5s ease-in-out infinite alternate'
        }}
      />
    </div>
  );
}

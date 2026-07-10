import { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackInitials?: string;
}

export function SafeImage({ src, alt, className, fallbackInitials = "NQ", ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-neutral-900 border border-white/10 text-[#C81D31] font-display font-bold ${className}`}>
        {fallbackInitials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}

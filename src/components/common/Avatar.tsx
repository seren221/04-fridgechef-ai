import Image from 'next/image';
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  className?: string;
}

export function Avatar({ src, alt, fallback, className }: AvatarProps) {
  // Use a reliable placeholder service if src is missing or invalid
  const imageSrc = src && src.startsWith('http') 
    ? src 
    : `https://ui-avatars.com/api/?name=${fallback}&background=random`;

  return (
    <div className={cn("relative h-10 w-10 overflow-hidden rounded-full shrink-0", className)}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="40px"
        onError={(e) => {
          // Fallback logic handled by ui-avatars default
        }}
      />
    </div>
  );
}

/**
 * Avatar — circular user avatar with image or fallback letter.
 *
 * Falls back to the first character of `alt` when `src` is missing.
 */

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASS: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-18 h-18',
};

export function Avatar(props: AvatarProps) {
  const { src, alt, size = 'md', className } = props;
  const fallback = alt?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <div
      data-bui-avatar=""
      className={`bg-surface-elev rounded-full overflow-hidden flex items-center justify-center ${SIZE_CLASS[size]} ${className ?? ''}`}
    >
      {src ? (
        <img src={src} alt={alt ?? ''} className="w-full h-full object-cover" />
      ) : (
        <span className="text-text-secondary font-bold text-body-1">{fallback}</span>
      )}
    </div>
  );
}

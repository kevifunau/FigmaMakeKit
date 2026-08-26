import { useState, useCallback, type ReactNode } from 'react';

interface DraggableProps {
  id: string;
  children: ReactNode;
  onDragStart?: (id: string) => void;
  onDragEnd?: () => void;
  className?: string;
}

interface DropZoneProps {
  onDrop: (id: string) => void;
  children?: ReactNode;
  className?: string;
}

export function Draggable({
  id,
  children,
  onDragStart,
  onDragEnd,
  className = '',
}: DraggableProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('text/plain', id);
      setIsDragging(true);
      onDragStart?.(id);
    },
    [id, onDragStart],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    onDragEnd?.();
  }, [onDragEnd]);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`cursor-grab active:cursor-grabbing transition-opacity ${
        isDragging ? 'opacity-50' : ''
      } ${className}`}
      data-bui-draggable=""
    >
      {children}
    </div>
  );
}

export function DropZone({
  onDrop,
  children,
  className = '',
}: DropZoneProps) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsOver(false);
      const id = e.dataTransfer.getData('text/plain');
      if (id) onDrop(id);
    },
    [onDrop],
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
        isOver
          ? 'border-primary bg-primary-soft'
          : 'border-border'
      } ${className}`}
      data-bui-dropzone=""
    >
      {children}
    </div>
  );
}

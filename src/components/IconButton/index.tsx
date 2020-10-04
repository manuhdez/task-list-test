import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  title: string;
  icon: string;
}

export default function IconButton({ title, icon, onClick }: IconButtonProps) {
  return (
    <button onClick={onClick}>
      <span role="img" aria-label={title} title={title}>
        {icon}
      </span>
    </button>
  );
}

interface CustomIconButtonProps {
  onClick: () => void;
}

export function SaveIconButton({ onClick }: CustomIconButtonProps) {
  return <IconButton onClick={onClick} title="Save" icon="💾" />;
}

export function CancelIconButton({ onClick }: CustomIconButtonProps) {
  return <IconButton onClick={onClick} title="Cancel" icon="❌" />;
}

export function RemoveIconButton({ onClick }: CustomIconButtonProps) {
  return <IconButton onClick={onClick} title="Remove" icon="🗑" />;
}

export function EditIconButton({ onClick }: CustomIconButtonProps) {
  return <IconButton onClick={onClick} title="Edit" icon="️✏️" />;
}

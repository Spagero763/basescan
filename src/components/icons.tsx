import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 12a2 2 0 0 0-2-2H6l-4 4 4 4h6a2 2 0 0 0 2-2v-4Z" />
      <path d="M10 12a2 2 0 0 1 2-2h6l4 4-4 4h-6a2 2 0 0 1-2-2v-4Z" />
    </svg>
  );
}

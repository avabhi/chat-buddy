// icon:messages-square | Lucide https://lucide.dev/ | Lucide
import * as React from "react";

function IconMessagesSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M14 9a2 2 0 01-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 012 2v5zM18 9h2a2 2 0 012 2v11l-4-4h-6a2 2 0 01-2-2v-1" />
    </svg>
  );
}

export default IconMessagesSquare;

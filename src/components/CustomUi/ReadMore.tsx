"use client";

import { useState, ReactNode, CSSProperties } from "react";
import { Button } from "../ui/button";

interface ReadMoreProps {
  children: ReactNode;
  maxLines?: number;
  className?: string;
  readMoreText?: string;
  readLessText?: string;
  minLength?: number;
}

export function ReadMore({
  children,
  maxLines = 4,
  className = "",
  minLength = 300,
  readMoreText = "Weiterlesen",
  readLessText = "Weniger anzeigen",
}: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const clampStyle: CSSProperties = !isExpanded
    ? {
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }
    : {};

  const shouldShowButton =
    (typeof children == "string" && children.length > minLength) || false; // TODO: Add a batter way to check if the text is long enough

  return (
    <div className="space-y-2">
      <div className={className} style={clampStyle}>
        {children}
      </div>
      {shouldShowButton && (
        <Button
          variant="link"
          className="p-0 h-auto text-primary font-medium"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? readLessText : readMoreText}
        </Button>
      )}
    </div>
  );
}

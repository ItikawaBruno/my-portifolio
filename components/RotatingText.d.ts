import { Ref } from "react";

interface RotatingTextProps {
  texts: string[];
  transition?: Record<string, unknown>;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  animatePresenceMode?: "wait" | "sync" | "popLayout";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  [key: string]: unknown;
}

declare const RotatingText: React.ForwardRefExoticComponent<
  RotatingTextProps & React.RefAttributes<unknown>
>;

export default RotatingText;

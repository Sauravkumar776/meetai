import { Loader2Icon } from "lucide-react";

interface LoadingStateProps {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: LoadingStateProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background backdrop-blur-sm">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-7 rounded-3xl border border-border/40 bg-card/90 px-12 py-10 shadow-xl backdrop-blur-md"
      >
        {/* Spinner with pulsing aura */}
        <div className="relative">
          <span className="absolute inset-0 h-14 w-14 rounded-full bg-primary/10 blur-md animate-pulse"></span>
          <Loader2Icon
            className="relative h-12 w-12 animate-spin text-primary drop-shadow-sm"
            aria-hidden="true"
          />
        </div>

        {/* Title & Description */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 w-48 overflow-hidden rounded-full bg-muted">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary to-primary/30 animate-[progressSlide_1.5s_linear_infinite]" />
        </div>
      </div>

      {/* Keyframes for progress bar */}
      <style>{`
        @keyframes progressSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

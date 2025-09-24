import { AlertTriangleIcon } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className="fixed inset-0  flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-background via-muted/30 to-background backdrop-blur-sm px-4">
      
      {/* Centered Error Card */}
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-destructive/30 bg-card/95 px-8 py-6 shadow-xl backdrop-blur-md max-w-sm text-center">
        <AlertTriangleIcon className="h-10 w-10 text-destructive" />
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Toast-style Error Card (bottom-right corner, non-blocking) */}

    </div>
  );
};

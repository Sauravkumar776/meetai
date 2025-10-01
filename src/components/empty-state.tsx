// components/ui/empty-state.tsx
"use client"

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  image?: string;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary" | "ghost";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  image,
  title = "No data yet",
  description = "Get started by creating your first item",
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6",
        className
      )}
    >
      {/* Visual Element - either image or icon */}
      {image ? (
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl" />
          <Image 
            src={image} 
            alt={title}
            width={240}
            height={240}
            className="relative opacity-80 dark:opacity-60"
          />
        </div>
      ) : Icon ? (
        <div className="mb-8">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            
            {/* Icon container */}
            <div className="relative rounded-full bg-gradient-to-br from-muted to-muted/50 p-5 shadow-sm">
              <Icon className="h-8 w-8 text-muted-foreground/70" />
            </div>
          </div>
        </div>
      ) : (
        // Default illustration if no icon or image provided
        <div className="mb-8">
          <svg
            className="w-32 h-32 text-muted-foreground/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={0.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
      )}
      
      {/* Text Content */}
      <div className="text-center space-y-2 mb-8 max-w-md">
        <h3 className="text-xl font-semibold tracking-tight">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || "default"}
              size="sm"
              className="min-w-[120px]"
            >
              {action.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-configured empty states for common use cases
export const EmptyStates = {
  NoAgents: () => (
    <EmptyState
      image="/empty.svg" // or use an icon
      title="Create your first Agent"
      description="Create an agent to join meetings. Each agent will follow your instructions and can interact with participants during the call."
    //   action={{
    //     label: "Create Agent",
    //     onClick: () => console.log("Create agent"),
    //   }}
    //   secondaryAction={{
    //     label: "Learn more",
    //     onClick: () => console.log("Learn more"),
    //   }}
    />
  ),
  
  NoResults: () => (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
      action={{
        label: "Clear filters",
        onClick: () => console.log("Clear filters"),
        variant: "outline",
      }}
    />
  ),
  
  NoMeetings: () => (
    <EmptyState
      image="/empty-calendar.svg" // or use a calendar icon
      title="No meetings scheduled"
      description="Schedule your first meeting to start collaborating with your team."
      action={{
        label: "Schedule Meeting",
        onClick: () => console.log("Schedule meeting"),
      }}
    />
  ),
};
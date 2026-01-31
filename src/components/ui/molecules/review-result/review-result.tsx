"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/atoms/card";
import { Badge } from "@/components/ui/atoms/badge";
import { Heading } from "@/components/ui/atoms/heading";
import type { Sentiment } from "@/lib/api/dto/review";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, MinusCircle } from "lucide-react";

const SENTIMENT_CONFIG: Record<
  Sentiment,
  { variant: "success" | "warning" | "error"; label: string; icon: React.ReactNode }
> = {
  POSITIVE: {
    variant: "success",
    label: "Positive",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  NEUTRAL: {
    variant: "warning",
    label: "Neutral",
    icon: <MinusCircle className="h-4 w-4" />,
  },
  NEGATIVE: {
    variant: "error",
    label: "Negative",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
};

export interface ReviewResultProps {
  sentiment: Sentiment;
  summary: string;
  suggestedActions: string[];
  className?: string;
}

export function ReviewResult({
  sentiment,
  summary,
  suggestedActions,
  className,
}: ReviewResultProps) {
  const config = SENTIMENT_CONFIG[sentiment];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3">
        <Heading level={5}>Analysis Result</Heading>
        <Badge variant={config.variant} style="subtle" size="default" dot>
          {config.label}
        </Badge>
      </div>

      <Card variant="filled">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-font-secondary">
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-font-primary text-sm leading-relaxed">{summary}</p>
        </CardContent>
      </Card>

      {suggestedActions.length > 0 && (
        <Card variant="filled">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-font-secondary">
              Suggested Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestedActions.map((action, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-font-primary"
                >
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-60" />
                  {action}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

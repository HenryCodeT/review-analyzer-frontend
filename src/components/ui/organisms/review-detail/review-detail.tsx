"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/atoms/card";
import { Badge } from "@/components/ui/atoms/badge";
import { Button } from "@/components/ui/atoms/button";
import { Skeleton } from "@/components/ui/atoms/skeleton";
import { Alert, AlertDescription } from "@/components/ui/atoms/alert";
import { Heading } from "@/components/ui/atoms/heading";
import type { ReviewDetailResponseDto } from "@/lib/api/dto/review";
import type { Sentiment } from "@/lib/api/dto/review";
import { X } from "lucide-react";

const SENTIMENT_VARIANT: Record<Sentiment, "success" | "warning" | "error"> = {
  POSITIVE: "success",
  NEUTRAL: "warning",
  NEGATIVE: "error",
};

const SENTIMENT_LABEL: Record<Sentiment, string> = {
  POSITIVE: "Positivo",
  NEUTRAL: "Neutral",
  NEGATIVE: "Negativo",
};

export interface ReviewDetailProps {
  detail: ReviewDetailResponseDto | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

export function ReviewDetail({
  detail,
  isLoading,
  error,
  onClose,
}: ReviewDetailProps) {
  if (isLoading) {
    return (
      <Card variant="outlined" className="space-y-4">
        <CardContent className="space-y-3 pt-4">
          <Skeleton width="40%" height={24} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={40} />
          <Skeleton width="80%" height={40} />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="error">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!detail) return null;

  return (
    <Card variant="outlined">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heading level={5}>Detalle del Review</Heading>
            <Badge
              variant={SENTIMENT_VARIANT[detail.sentiment]}
              style="subtle"
              dot
            >
              {SENTIMENT_LABEL[detail.sentiment]}
            </Badge>
          </div>
          <Button variant="link" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-font-tertiary mb-1">
            Texto Original
          </p>
          <p className="text-sm text-font-primary leading-relaxed">
            {detail.rawText}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-font-tertiary mb-1">
            Resumen
          </p>
          <p className="text-sm text-font-primary leading-relaxed">
            {detail.summary}
          </p>
        </div>

        {detail.suggestedActions.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-font-tertiary mb-1">
              Acciones Sugeridas
            </p>
            <ul className="space-y-1">
              {detail.suggestedActions.map((action, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-font-primary"
                >
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-60" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="text-xs font-semibold text-font-tertiary mb-1">
            Respuesta Sugerida
          </p>
          <p className="text-sm text-font-primary leading-relaxed">
            {detail.suggestedResponse}
          </p>
        </div>

        <div className="flex gap-4 pt-2 text-xs text-font-tertiary">
          <span>Modelo: {detail.modelProvider} ({detail.modelVersion})</span>
          {detail.language && <span>Idioma: {detail.language}</span>}
          <span>
            Fecha: {new Date(detail.createdAt).toLocaleDateString("es-ES")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

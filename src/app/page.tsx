"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/atoms/heading";
import { Alert, AlertDescription } from "@/components/ui/atoms/alert";
import { Button } from "@/components/ui/atoms/button";
import { Skeleton } from "@/components/ui/atoms/skeleton";
import { ReviewForm } from "@/components/ui/organisms/review-form";
import { ReviewResult } from "@/components/ui/molecules/review-result";
import { TextareaField } from "@/components/ui/form-controls/primitive-inputs/textarea";
import { useReviewAnalysis } from "@/hooks/use-review-analysis";
import { Send, RotateCcw, CheckCircle } from "lucide-react";

export default function AnalysisPage() {
  const {
    result,
    isAnalyzing,
    isSending,
    error,
    sendSuccess,
    analyze,
    sendResponse,
    reset,
  } = useReviewAnalysis();

  const [editedResponse, setEditedResponse] = useState("");

  const handleAnalyze = (text: string) => {
    analyze(text);
    setEditedResponse("");
  };

  const handleSend = () => {
    if (editedResponse.trim()) {
      sendResponse(editedResponse.trim());
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Heading level={3}>Review Analysis</Heading>
        <p className="mt-1 text-sm text-font-tertiary">
          Paste a customer review to get an automated AI analysis.
        </p>
      </div>

      <ReviewForm
        onSubmit={handleAnalyze}
        isLoading={isAnalyzing}
        disabled={isSending}
      />

      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isAnalyzing && (
        <div className="space-y-3">
          <Skeleton width="30%" height={24} />
          <Skeleton width="100%" height={80} />
          <Skeleton width="100%" height={60} />
        </div>
      )}

      {result && !isAnalyzing && (
        <div className="space-y-6">
          <ReviewResult
            sentiment={result.sentiment}
            summary={result.summary}
            suggestedActions={result.suggestedActions}
          />

          <div className="space-y-3">
            <TextareaField
              label="Suggested Response"
              description="You can edit the response before sending it."
              value={editedResponse || result.suggestedResponse}
              onChange={(e) => setEditedResponse(e.target.value)}
              rows={4}
              resize="vertical"
              disabled={isSending || sendSuccess}
            />

            <div className="flex items-center gap-3">
              {!sendSuccess ? (
                <Button
                  variant="primary"
                  colorScheme="success"
                  onClick={handleSend}
                  isLoading={isSending}
                  disabled={sendSuccess}
                >
                  <Send className="h-4 w-4" />
                  Send Response
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-sm font-medium text-font-success">
                  <CheckCircle className="h-4 w-4" />
                  Response sent successfully
                </div>
              )}

              <Button variant="default" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
                New Analysis
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

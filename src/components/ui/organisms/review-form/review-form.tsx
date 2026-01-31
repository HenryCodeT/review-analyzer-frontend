"use client";

import * as React from "react";
import { Button } from "@/components/ui/atoms/button";
import { TextareaField } from "@/components/ui/form-controls/primitive-inputs/textarea";
import { Sparkles } from "lucide-react";

export interface ReviewFormProps {
  onSubmit: (text: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ReviewForm({
  onSubmit,
  isLoading = false,
  disabled = false,
}: ReviewFormProps) {
  const [text, setText] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) onSubmit(text.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextareaField
        label="Customer Review"
        placeholder="Paste the customer review here to analyze..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        inputSize="large"
        rows={5}
        resize="vertical"
        disabled={isLoading || disabled}
      />
      <Button
        type="submit"
        variant="primary"
        size="default"
        isLoading={isLoading}
        disabled={!text.trim() || disabled}
      >
        <Sparkles className="h-4 w-4" />
        Analyze with AI
      </Button>
    </form>
  );
}

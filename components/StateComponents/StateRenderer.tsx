// components/StateRenderer.tsx
import { ReactNode } from "react";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { SuccessState } from "./SuccessState";

type StateRendererProps<T> = {
  loading: boolean;
  error?: Error | null;
  data?: T | null | undefined;
  successMessage?: string;
  onRetry?: () => void;
  emptyMessage?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  children: ReactNode;
};

export function StateRenderer<T>({
  loading,
  error,
  data,
  successMessage,
  onRetry,
  emptyMessage,
  emptyActionLabel,
  onEmptyAction,
  children,
}: StateRendererProps<T>) {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={onRetry} />;

  const isEmpty =
    data == null ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === "object" &&
      !Array.isArray(data) &&
      Object.keys(data).length === 0);

  if (isEmpty) {
    return (
      <EmptyState
        message={emptyMessage}
        actionLabel={emptyActionLabel}
        onAction={onEmptyAction}
      />
    );
  }

  if (successMessage) return <SuccessState message={successMessage} />;

  return <>{children}</>;
}

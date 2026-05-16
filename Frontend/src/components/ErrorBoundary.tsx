import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  name: string;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.name}] render error`, {
      componentStack: info.componentStack,
      message: error.message,
      stack: error.stack,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-4 text-danger">
          Erro ao renderizar esta area.
        </div>
      );
    }

    return this.props.children;
  }
}

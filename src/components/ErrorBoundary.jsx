import { Component } from "react";
import { siteMeta } from "../config/site";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("App error boundary caught an error:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-fallback" role="alert">
          <div>
            <p>{siteMeta.name}</p>
            <h1>Something went wrong.</h1>
            <span>
              Please refresh the page, or contact the GLAMGO team if the issue
              continues.
            </span>
            <a href="/">Back to home</a>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

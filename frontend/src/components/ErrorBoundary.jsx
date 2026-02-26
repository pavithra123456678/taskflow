import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error info here
    if (process.env.NODE_ENV !== "production") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center animate-fade-in-up">
          <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-red-100">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-red-500">Something went wrong</h2>
          <p className="text-base text-gray-500 mb-4">An unexpected error occurred. Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

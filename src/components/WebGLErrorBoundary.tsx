import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if it's a WebGL-related error or a React Three Fiber error
    const isWebGLError = error.message.includes('WebGL') || 
                         error.message.includes('context') ||
                         error.message.includes('canvas') ||
                         error.stack?.includes('three') ||
                         error.message.includes('Cannot read properties of undefined') ||
                         error.message.includes('reading \'S\'') ||
                         // Additional React Three Fiber error patterns
                         error.message.includes('Fiber') ||
                         error.message.includes('reconciler') ||
                         error.stack?.includes('@react-three');
    
    if (isWebGLError) {
      console.error('WebGL/React Three Fiber Error caught by boundary:', error);
      return { hasError: true, error };
    }
    
    // Re-throw non-WebGL errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('WebGL Error Boundary caught an error:', error, errorInfo);
    
    // Attempt to recover from WebGL context loss or Three.js initialization errors
    const isRecoverableError = 
      error.message.includes('context') || 
      error.message.includes('Cannot read properties of undefined') ||
      error.message.includes('reading \'S\'') ||
      error.stack?.includes('@react-three/fiber') ||
      error.stack?.includes('reconciler');
      
    if (isRecoverableError) {
      // Log the specific error type for debugging
      console.log(`Caught recoverable error type: ${
        error.message.includes('context') ? 'WebGL context loss' :
        error.message.includes('Cannot read properties of undefined') ? 'Undefined property access' :
        error.message.includes('reading \'S\'') ? 'R3F S property error' :
        'Other Three.js error'
      }`);
      
      setTimeout(() => {
        console.log('Attempting to recover from Three.js/R3F error...');
        this.setState({ hasError: false, error: undefined });
      }, 2000);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Alert className="bg-red-500/10 border-red-500/20 text-red-400 max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold">3D Visualization Unavailable</p>
                <p className="text-sm">
                  {this.state.error?.message?.includes('reading \'S\'') 
                    ? 'React Three Fiber initialization error detected.'
                    : 'WebGL context issues detected.'} 
                  This might be due to:
                </p>
                <ul className="text-xs space-y-1 ml-4 list-disc">
                  <li>Hardware acceleration disabled</li>
                  <li>Browser compatibility issues</li>
                  <li>GPU memory limitations</li>
                  {this.state.error?.message?.includes('reading \'S\'') && (
                    <li>React Three Fiber version compatibility issue</li>
                  )}
                </ul>
                <p className="text-xs mt-2">
                  The page will continue to function normally. 
                  {this.state.error?.message?.includes('reading \'S\'') && 
                    ' Trying to recover automatically...'}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;

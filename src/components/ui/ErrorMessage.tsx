import React from 'react';
import { cn } from '@/utils/cn';
import { ApiError } from '@/types/token';

interface ErrorMessageProps {
  error: ApiError | string;
  className?: string;
  showDetails?: boolean;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  className,
  showDetails = false,
  onClose,
}) => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorCode = typeof error === 'string' ? null : error.code;
  const errorDetails = typeof error === 'string' ? null : error.details;

  return (
    <div
      className={cn(
        'bg-red-50 border border-red-200 rounded-md p-4',
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {errorMessage}
          </h3>
          {errorCode && (
            <p className="mt-1 text-sm text-red-700">
              Error code: {errorCode}
            </p>
          )}
          {showDetails && errorDetails != null && (
            <pre className="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto">
              {typeof errorDetails === 'string' 
                ? errorDetails 
                : JSON.stringify(errorDetails, null, 2)
              }
            </pre>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
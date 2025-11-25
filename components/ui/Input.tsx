"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    // Generate a unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              "block w-full rounded-lg border bg-white px-3 py-2.5 text-secondary-900 shadow-sm transition-all duration-200",
              "placeholder:text-secondary-400",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:bg-secondary-50 disabled:text-secondary-500",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error
                ? "border-error-500 focus:border-error-500 focus:ring-error-500"
                : "border-secondary-300 focus:border-primary-500 focus:ring-primary-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    // Generate a unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "block w-full rounded-lg border bg-white px-3 py-2.5 text-secondary-900 shadow-sm transition-all duration-200",
            "placeholder:text-secondary-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:bg-secondary-50 disabled:text-secondary-500",
            "resize-y min-h-[100px]",
            error
              ? "border-error-500 focus:border-error-500 focus:ring-error-500"
              : "border-secondary-300 focus:border-primary-500 focus:ring-primary-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, placeholder, id, ...props }, ref) => {
    // Generate a unique ID if not provided
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <select
          id={selectId}
          className={cn(
            "block w-full rounded-lg border bg-white px-3 py-2.5 text-secondary-900 shadow-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:bg-secondary-50 disabled:text-secondary-500",
            error
              ? "border-error-500 focus:border-error-500 focus:ring-error-500"
              : "border-secondary-300 focus:border-primary-500 focus:ring-primary-500",
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={cn(
              "w-4 h-4 rounded border-secondary-300 text-primary-600 shadow-sm transition-all duration-200",
              "focus:ring-primary-500 focus:ring-2 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:bg-secondary-50",
              error && "border-error-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-2 text-sm">
            <label className="font-medium text-secondary-700 cursor-pointer">
              {label}
              {props.required && <span className="text-error-500 ml-1">*</span>}
            </label>
          </div>
        )}
        {error && (
          <p className="ml-2 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="radio"
            className={cn(
              "w-4 h-4 border-secondary-300 text-primary-600 shadow-sm transition-all duration-200",
              "focus:ring-primary-500 focus:ring-2 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:bg-secondary-50",
              error && "border-error-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-2 text-sm">
            <label className="font-medium text-secondary-700 cursor-pointer">
              {label}
            </label>
          </div>
        )}
        {error && (
          <p className="ml-2 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
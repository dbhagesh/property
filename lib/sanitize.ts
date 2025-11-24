import createDOMPurify from 'isomorphic-dompurify';

// Create DOMPurify instance
const DOMPurify = createDOMPurify();

// Configuration for different types of content
const sanitizeConfigs = {
  // For basic text input (strips all HTML)
  TEXT: {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  },

  // For rich text content (allows safe HTML)
  HTML: {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'b', 'i',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote'
    ],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  },

  // For property descriptions (more permissive)
  PROPERTY_DESC: {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'b', 'i',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'div', 'span'
    ],
    ALLOWED_ATTR: ['class'],
    KEEP_CONTENT: true,
  },

  // For URLs (strict validation)
  URL: {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  },
};

/**
 * Sanitize text input to prevent XSS attacks
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(input, sanitizeConfigs.TEXT);
}

/**
 * Sanitize HTML content while preserving safe tags
 */
export function sanitizeHTML(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(input, sanitizeConfigs.HTML);
}

/**
 * Sanitize property descriptions with more permissive HTML
 */
export function sanitizePropertyDescription(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(input, sanitizeConfigs.PROPERTY_DESC);
}

/**
 * Sanitize and validate URLs
 */
export function sanitizeURL(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // First sanitize
  const sanitized = DOMPurify.sanitize(input, sanitizeConfigs.URL);

  // Then validate URL format
  try {
    new URL(sanitized);
    return sanitized;
  } catch {
    return '';
  }
}

/**
 * Sanitize object properties recursively
 */
export function sanitizeObject(obj: unknown, config: 'TEXT' | 'HTML' | 'PROPERTY_DESC' = 'TEXT'): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    switch (config) {
      case 'HTML':
        return sanitizeHTML(obj);
      case 'PROPERTY_DESC':
        return sanitizePropertyDescription(obj);
      default:
        return sanitizeText(obj);
    }
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, config));
  }

  if (typeof obj === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      sanitized[sanitizeText(key)] = sanitizeObject(value, config);
    }
    return sanitized;
  }

  return obj;
}

/**
 * Validate email format and sanitize
 */
export function sanitizeEmail(email: string): string {
  const sanitized = sanitizeText(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : '';
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  const sanitized = sanitizeText(phone);
  // Allow only digits, spaces, hyphens, parentheses, and plus sign
  return sanitized.replace(/[^0-9\s\-\(\)\+]/g, '');
}

/**
 * Sanitize form data for API endpoints
 */
export function sanitizeFormData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    const cleanKey = sanitizeText(key);

    switch (cleanKey) {
      case 'email':
        sanitized[cleanKey] = sanitizeEmail(value as string);
        break;
      case 'phone':
        sanitized[cleanKey] = sanitizePhone(value as string);
        break;
      case 'description':
      case 'overview':
        sanitized[cleanKey] = sanitizePropertyDescription(value as string);
        break;
      case 'virtualTourUrl':
      case 'videoUrl':
      case 'floorPlanUrl':
      case 'website':
        sanitized[cleanKey] = sanitizeURL(value as string);
        break;
      default:
        if (typeof value === 'string') {
          sanitized[cleanKey] = sanitizeText(value);
        } else if (Array.isArray(value)) {
          sanitized[cleanKey] = value.map(item =>
            typeof item === 'string' ? sanitizeText(item) : item
          );
        } else {
          sanitized[cleanKey] = value;
        }
    }
  }

  return sanitized;
}
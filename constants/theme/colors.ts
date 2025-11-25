/**
 * Centralized Color Theme Configuration for Mahadev Realtors
 *
 * To change the website colors, simply uncomment one of the theme options below
 * or create your own custom theme.
 */

// ============================================================================
// AVAILABLE COLOR THEMES
// ============================================================================

// Theme 1: Saffron & Gold (Traditional, Bold, Culturally Resonant)
// Perfect for: Strong brand presence, spiritual connection
const saffronTheme = {
  primary: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316", // Main saffron
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
};

// Theme 2: Emerald Green (Growth, Prosperity, Trust)
// Perfect for: Modern real estate, investment focus
const emeraldTheme = {
  primary: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981", // Main emerald
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
};

// Theme 3: Royal Blue (Professional, Trustworthy, Premium)
// Perfect for: Corporate image, reliability
const royalBlueTheme = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main royal blue
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
};

// Theme 4: Deep Teal (Modern, Sophisticated, Balanced)
// Perfect for: Contemporary look, professionalism
const tealTheme = {
  primary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6", // Main teal
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },
};

// Theme 5: Crimson Red (Bold, Attention-Grabbing, Energetic)
// Perfect for: Strong presence, premium properties
const crimsonTheme = {
  primary: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // Main crimson
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
};

// Theme 6: Deep Purple (Luxury, Premium, Elegant)
// Perfect for: High-end properties, sophisticated brand
const purpleTheme = {
  primary: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7", // Main purple
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },
};

// ============================================================================
// ACTIVE THEME - Change this to switch the entire website theme
// ============================================================================

// 👇 CHANGE THIS LINE TO SWITCH THEMES
// Options: saffronTheme, emeraldTheme, royalBlueTheme, tealTheme, crimsonTheme, purpleTheme
export const activeTheme = saffronTheme;

// ============================================================================
// FIXED COLOR PALETTES (Don't change unless necessary)
// ============================================================================

export const colors = {
  // Primary brand color (changes based on active theme)
  primary: activeTheme.primary,

  // Secondary colors (neutral grays - consistent across all themes)
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // Accent color (warm gold - complements most themes)
  accent: {
    50: "#fef3c7",
    100: "#fde68a",
    200: "#fcd34d",
    300: "#fbbf24",
    400: "#f59e0b",
    500: "#d97706",
    600: "#b45309",
    700: "#92400e",
    800: "#78350f",
    900: "#451a03",
  },

  // Status colors (fixed for consistency)
  success: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },

  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
};

// ============================================================================
// QUICK REFERENCE
// ============================================================================

/**
 * HOW TO CHANGE WEBSITE COLORS:
 *
 * 1. Go to line 91 in this file (export const activeTheme = ...)
 * 2. Change the theme name to one of these options:
 *    - saffronTheme (Orange/Saffron - Bold, Traditional)
 *    - emeraldTheme (Green - Growth, Investment)
 *    - royalBlueTheme (Blue - Professional, Corporate)
 *    - tealTheme (Teal - Modern, Sophisticated)
 *    - crimsonTheme (Red - Bold, Premium)
 *    - purpleTheme (Purple - Luxury, Elegant)
 *
 * 3. Save the file and the website will automatically update!
 *
 * Example:
 *   export const activeTheme = emeraldTheme; // Changes to green theme
 */

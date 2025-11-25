# Mahadev Realtors - Color Theme Guide

## 🎨 How to Change Website Colors

All website colors are managed from a **single file**: `constants/theme/colors.ts`

### Quick Start

1. Open `constants/theme/colors.ts`
2. Find line 91: `export const activeTheme = saffronTheme;`
3. Change `saffronTheme` to any of the available themes
4. Save the file - the website updates automatically!

---

## 📋 Available Color Themes

### 1. **Saffron Theme** (Currently Active)
```typescript
export const activeTheme = saffronTheme;
```
- **Color**: Orange/Saffron (#f97316)
- **Best For**: Bold presence, traditional values, culturally resonant
- **Mood**: Energetic, warm, spiritual

### 2. **Emerald Theme**
```typescript
export const activeTheme = emeraldTheme;
```
- **Color**: Green (#10b981)
- **Best For**: Growth, investment, prosperity
- **Mood**: Fresh, trustworthy, positive

### 3. **Royal Blue Theme**
```typescript
export const activeTheme = royalBlueTheme;
```
- **Color**: Blue (#3b82f6)
- **Best For**: Professional, corporate image
- **Mood**: Reliable, stable, trustworthy

### 4. **Teal Theme**
```typescript
export const activeTheme = tealTheme;
```
- **Color**: Teal (#14b8a6)
- **Best For**: Modern, sophisticated look
- **Mood**: Contemporary, balanced, professional

### 5. **Crimson Theme**
```typescript
export const activeTheme = crimsonTheme;
```
- **Color**: Red (#ef4444)
- **Best For**: Bold statements, premium properties
- **Mood**: Powerful, energetic, attention-grabbing

### 6. **Purple Theme**
```typescript
export const activeTheme = purpleTheme;
```
- **Color**: Purple (#a855f7)
- **Best For**: Luxury properties, high-end brand
- **Mood**: Elegant, premium, sophisticated

---

## 🔧 Advanced Customization

### Creating a Custom Theme

To create your own custom color palette:

1. Open `constants/theme/colors.ts`
2. Add a new theme object following the same pattern:

```typescript
const customTheme = {
  primary: {
    50: "#...",   // Lightest shade
    100: "#...",
    200: "#...",
    300: "#...",
    400: "#...",
    500: "#...",  // Main color (this is your primary brand color)
    600: "#...",
    700: "#...",
    800: "#...",
    900: "#...",  // Darkest shade
    950: "#...",
  },
};
```

3. Set it as active:
```typescript
export const activeTheme = customTheme;
```

### Need Help Choosing Colors?

- Use [Coolors.co](https://coolors.co/) to generate color palettes
- Use [TailwindShades](https://www.tailwindshades.com/) to generate shade variations
- Use [ColorSpace](https://mycolor.space/) for color matching

---

## 📍 Where Colors Are Used

- **Primary**: Headers, buttons, links, highlights, navbar accent
- **Secondary**: Text, borders, backgrounds (grays)
- **Accent**: Call-to-action buttons, special highlights
- **Success**: Positive messages, confirmations
- **Warning**: Alerts, cautions
- **Error**: Error messages, validation

---

## 💡 Recommendations

### For Professional Corporate Look
→ Use **Royal Blue Theme** or **Teal Theme**

### For Traditional/Cultural Connect
→ Use **Saffron Theme** (current)

### For Modern Real Estate Brand
→ Use **Emerald Theme** or **Teal Theme**

### For Luxury Properties Focus
→ Use **Purple Theme** or **Crimson Theme**

---

## 🚀 Testing Your Colors

After changing the theme:

1. Check the homepage
2. Visit the About page
3. Check contact forms and buttons
4. Test on mobile view
5. Verify all pages look consistent

---

## 📞 Need Support?

If you need help customizing colors or creating a unique theme, contact your developer.

**Current Theme**: Saffron (Orange) - Bold and prominent for Mahadev Realtors

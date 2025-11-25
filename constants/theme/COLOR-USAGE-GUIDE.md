# Color Usage Guide - Proper Balance

## 🎨 The Problem
Too much primary color everywhere makes the website overwhelming and tiring to look at.

## ✅ The Solution
Use a **balanced color hierarchy** where each color has a specific purpose.

---

## 📊 Color Balance Rules (60-30-10 Rule)

### 60% - Secondary/Neutral Colors (Grays)
**Use For:**
- Page backgrounds
- Card backgrounds
- Text (body copy, headings)
- Borders and dividers
- Input fields
- Most UI elements

**Colors:**
```typescript
secondary-50, secondary-100  // Light backgrounds
secondary-200, secondary-300  // Borders, dividers
secondary-500, secondary-600  // Body text
secondary-700, secondary-800  // Headings
neutral-100, neutral-200      // Alternative backgrounds
```

### 30% - Accent Color (Gold/Warm)
**Use For:**
- Secondary buttons
- Hover states
- Badges and tags
- Icons (non-critical)
- Highlights
- Decorative elements

**Colors:**
```typescript
accent-400, accent-500  // Main accent
accent-100, accent-200  // Light accents
```

### 10% - Primary Color (Brand Green)
**Use For:** (SPARINGLY!)
- Main CTA buttons (Call Now, WhatsApp, Submit)
- Active navigation items
- Important badges
- Key highlights only
- Logo accent

**Colors:**
```typescript
primary-600, primary-700  // Main brand color
primary-500              // Lighter brand color
```

---

## 🎯 Specific Component Guidelines

### Navigation Header
```typescript
✅ Background: white or secondary-50
✅ Text: secondary-700
✅ Active link: primary-600 (ONE item only)
❌ Don't: Make entire header primary color
```

### Buttons
```typescript
✅ Primary CTA: bg-primary-600 (1-2 per page max)
✅ Secondary: bg-secondary-700 or bg-accent-500
✅ Outline: border-secondary-300
❌ Don't: Make all buttons primary color
```

### Cards/Sections
```typescript
✅ Background: white or secondary-50
✅ Border: secondary-200
✅ Title: secondary-800
✅ Body text: secondary-600
✅ Icon/Badge: accent-500 or primary-600 (sparingly)
❌ Don't: Use primary for card backgrounds
```

### Hero Section
```typescript
✅ Background: gradient from secondary-50 to white
✅ Heading: secondary-900
✅ Body: secondary-600
✅ CTA Button: primary-600 (ONE main CTA)
✅ Secondary button: accent-500 or secondary-700
❌ Don't: Use primary background or multiple primary CTAs
```

### Forms
```typescript
✅ Input background: white or secondary-50
✅ Input border: secondary-300
✅ Input text: secondary-700
✅ Label: secondary-600
✅ Submit button: primary-600
❌ Don't: Use primary for input borders or backgrounds
```

### Footer
```typescript
✅ Background: secondary-800 or secondary-900
✅ Text: secondary-300
✅ Links: secondary-400
✅ Link hover: primary-400 or accent-400
❌ Don't: Use primary background
```

---

## 🔍 Visual Hierarchy

### Priority 1 (Most Important) - Use Primary Color
- Main "Call Now" button
- Main "WhatsApp" button
- Primary form submit button
- One key CTA per page

### Priority 2 (Important) - Use Accent Color
- Secondary buttons
- Badge highlights
- Icon accents
- Hover states

### Priority 3 (Standard) - Use Secondary Colors
- Everything else!
- Text, backgrounds, borders
- Navigation (except active)
- Cards, containers

---

## 📝 Examples of Good Balance

### Good Homepage:
```
- Background: white/secondary-50 (60%)
- Text & borders: secondary colors (60%)
- Badges, icons: accent colors (30%)
- Main CTAs: primary-600 (10%)
```

### Bad Homepage:
```
❌ Navigation: primary-600 background
❌ All buttons: primary-600
❌ All headings: primary-600
❌ All icons: primary-600
Result: Overwhelming, tiring to look at
```

---

## 🎨 Recommended Color Combinations

### For Backgrounds:
```typescript
Primary: white or secondary-50
Alternate: secondary-100 or neutral-50
Dark sections: secondary-800 or secondary-900
```

### For Text:
```typescript
Headings: secondary-800 or secondary-900
Body: secondary-600 or secondary-700
Muted: secondary-400 or secondary-500
```

### For Borders:
```typescript
Light: secondary-200
Medium: secondary-300
Dark: secondary-400
```

### For Buttons:
```typescript
Primary action: bg-primary-600 hover:bg-primary-700
Secondary action: bg-accent-500 hover:bg-accent-600
Tertiary: bg-secondary-700 hover:bg-secondary-800
Outline: border-secondary-300 text-secondary-700
Ghost: text-secondary-600 hover:text-primary-600
```

---

## 🚀 Quick Checklist

Before using primary color, ask:
- [ ] Is this a main call-to-action?
- [ ] Is this the most important element on the page?
- [ ] Do I already have 2+ primary elements visible?
- [ ] Would accent or secondary work better?

If you answered "no" to the first two or "yes" to the last two, **use accent or secondary instead**!

---

## 💡 Pro Tips

1. **One Hero per Section**: Each section should have max 1-2 primary color elements
2. **White Space**: Use more white/light backgrounds - they make primary color pop
3. **Text Hierarchy**: Most text should be gray (secondary), not colored
4. **Hover Effects**: Use subtle color shifts, not always primary
5. **Icons**: Use secondary-400 or accent-500, reserve primary for key icons only

---

## 🎯 Current Theme Balance

With Forest Green theme:
- **Primary Green**: For CTAs, active states (10% usage)
- **Gold Accent**: For secondary actions, highlights (30% usage)
- **Gray/Neutral**: For everything else (60% usage)

This creates a **professional, balanced look** that's easy on the eyes while still maintaining strong brand presence.

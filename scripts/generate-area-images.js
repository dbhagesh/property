#!/usr/bin/env node
/**
 * Generate placeholder images for areas using SVG
 * These are temporary placeholders until real images are added
 */

const fs = require('fs');
const path = require('path');

const areas = [
  {
    name: 'IMT Kharkhoda',
    filename: 'imt-kharkhoda.jpg',
    description: 'Industrial Model Township',
    color: '#2563eb' // Blue for industrial
  },
  {
    name: 'Bahadurgarh',
    filename: 'bahadurgarh.jpg',
    description: 'Gateway to Haryana',
    color: '#16a34a' // Green for metro connectivity
  },
  {
    name: 'Sonipat',
    filename: 'sonipat.jpg',
    description: 'Educational Hub & DDJAY',
    color: '#ea580c' // Orange for education
  },
  {
    name: 'Rohtak',
    filename: 'rohtak.jpg',
    description: 'IIM & PGIMS City',
    color: '#9333ea' // Purple for prestigious institutions
  }
];

const heroProperties = [
  {
    name: 'IMT Kharkhoda Plots',
    filename: 'property-1.jpg',
    description: '₹45 Lakhs',
    color: '#2563eb'
  },
  {
    name: 'DDJAY Plots',
    filename: 'property-2.jpg',
    description: '₹15 Lakhs',
    color: '#16a34a'
  },
  {
    name: 'Industrial Land',
    filename: 'property-3.jpg',
    description: 'Prime Locations',
    color: '#ea580c'
  },
  {
    name: 'Agriculture Land',
    filename: 'property-4.jpg',
    description: '₹25 Lakhs',
    color: '#15803d'
  }
];

function generateSVG(text, subtitle, color, width = 800, height = 600) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${text}
  </text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">
    ${subtitle}
  </text>
  <text x="50%" y="95%" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.7)" text-anchor="middle">
    Mahadev Real Estate - Your Trusted Property Partner
  </text>
</svg>`;
}

// Create images directory if it doesn't exist
const areasDir = path.join(__dirname, '..', 'public', 'images', 'areas');
const heroDir = path.join(__dirname, '..', 'public', 'images', 'hero');

if (!fs.existsSync(areasDir)) {
  fs.mkdirSync(areasDir, { recursive: true });
}
if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}

// Generate area images
console.log('Generating area placeholder images...\n');
areas.forEach(area => {
  const svg = generateSVG(area.name, area.description, area.color);
  const filepath = path.join(areasDir, area.filename);
  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created ${area.filename}`);
});

// Generate hero property images
console.log('\nGenerating hero property placeholder images...\n');
heroProperties.forEach(prop => {
  const svg = generateSVG(prop.name, prop.description, prop.color, 600, 400);
  const filepath = path.join(heroDir, prop.filename);
  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created ${prop.filename}`);
});

console.log('\n✅ All placeholder images generated successfully!');
console.log('\n📝 Note: Replace these SVG placeholders with actual property images when available.');
console.log('   Recommended image sources:');
console.log('   - Professional photographer');
console.log('   - Stock photos (Unsplash, Pexels)');
console.log('   - Client-provided images');

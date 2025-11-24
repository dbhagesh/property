const fs = require('fs');
const path = require('path');

// Create a simple SVG placeholder image
function createPlaceholderSVG(width, height, text, bgColor = '#e2e8f0', textColor = '#475569') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-family="Arial, sans-serif" font-size="20" fill="${textColor}">
      ${text}
    </text>
  </svg>`;
}

// Define placeholder images to create
const placeholders = [
  // Hero images
  { path: 'public/images/hero/property-1.jpg', width: 600, height: 400, text: 'Luxury Villa' },
  { path: 'public/images/hero/property-2.jpg', width: 600, height: 400, text: 'Modern Apartment' },
  { path: 'public/images/hero/property-3.jpg', width: 600, height: 400, text: 'Commercial Space' },
  { path: 'public/images/hero/property-4.jpg', width: 600, height: 400, text: 'Builder Floor' },

  // Area images
  { path: 'public/images/areas/sector-45.jpg', width: 400, height: 300, text: 'Sector 45' },
  { path: 'public/images/areas/dlf-phase-3.jpg', width: 400, height: 300, text: 'DLF Phase 3' },
  { path: 'public/images/areas/sohna-road.jpg', width: 400, height: 300, text: 'Sohna Road' },
  { path: 'public/images/areas/golf-course-extension.jpg', width: 400, height: 300, text: 'Golf Course Ext' },
  { path: 'public/images/areas/dwarka-expressway.jpg', width: 400, height: 300, text: 'Dwarka Expressway' },
  { path: 'public/images/areas/mg-road.jpg', width: 400, height: 300, text: 'MG Road' },
  { path: 'public/images/areas/new-gurgaon.jpg', width: 400, height: 300, text: 'New Gurgaon' },

  // Testimonial images
  { path: 'public/images/testimonials/client-1.jpg', width: 200, height: 200, text: 'Client 1' },
  { path: 'public/images/testimonials/client-2.jpg', width: 200, height: 200, text: 'Client 2' },
  { path: 'public/images/testimonials/client-3.jpg', width: 200, height: 200, text: 'Client 3' },
  { path: 'public/images/testimonials/client-4.jpg', width: 200, height: 200, text: 'Client 4' },
  { path: 'public/images/testimonials/client-5.jpg', width: 200, height: 200, text: 'Client 5' },

  // Other images
  { path: 'public/images/why-choose-us.jpg', width: 600, height: 400, text: 'Why Choose Us' },
  { path: 'public/images/og-image.jpg', width: 1200, height: 630, text: 'PropertyXpert Gurgaon' },
  { path: 'public/images/office.jpg', width: 600, height: 400, text: 'Our Office' },

  // Team member images
  { path: 'public/images/team/rajesh-kumar.jpg', width: 300, height: 300, text: 'Rajesh Kumar' },
  { path: 'public/images/team/priya-sharma.jpg', width: 300, height: 300, text: 'Priya Sharma' },
  { path: 'public/images/team/amit-singh.jpg', width: 300, height: 300, text: 'Amit Singh' },
];

// Generate all placeholder images
placeholders.forEach(({ path: filePath, width, height, text }) => {
  const svg = createPlaceholderSVG(width, height, text);
  const dir = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save as SVG (browsers will handle SVG even with .jpg extension)
  fs.writeFileSync(filePath, svg);
  console.log(`Created placeholder: ${filePath}`);
});

console.log('\nAll placeholder images created successfully!');
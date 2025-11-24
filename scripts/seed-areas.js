// Script to seed initial area data
// Run with: node scripts/seed-areas.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Sample area data based on the constants
const areasData = [
  {
    name: 'DLF Phase 5',
    slug: 'dlf-phase-5',
    city: 'Gurgaon',
    state: 'Haryana',
    description: 'DLF Phase 5 is one of the most sought-after residential areas in Gurgaon, known for its premium infrastructure, excellent connectivity, and high-end residential complexes.',
    overview: 'DLF Phase 5 offers a perfect blend of luxury and convenience. With well-planned infrastructure, premium amenities, and close proximity to business districts, it has become a preferred choice for homebuyers and investors.',
    priceRangeMin: 8000000,
    priceRangeMax: 50000000,
    avgPricePerSqFt: 12000,
    connectivity: [
      'Metro connectivity via Sector 53-54 Metro Station',
      '10 minutes drive to Cyber Hub',
      'Direct connectivity to NH-8',
      'Close to Golf Course Road'
    ],
    amenities: [
      'Premium Shopping Malls',
      'Top Educational Institutions',
      'Multi-specialty Hospitals',
      'Golf Course',
      'Parks and Green Spaces',
      'Fine Dining Restaurants'
    ],
    metaTitle: 'Properties in DLF Phase 5 Gurgaon - Buy, Sell, Rent',
    metaDescription: 'Find best properties in DLF Phase 5 Gurgaon. Premium apartments, villas for sale & rent. Expert property dealer services with 15+ years experience.',
    keywords: ['dlf phase 5', 'gurgaon properties', 'luxury apartments', 'villas for sale']
  },
  {
    name: 'Sector 43',
    slug: 'sector-43',
    city: 'Gurgaon',
    state: 'Haryana',
    description: 'Sector 43 is a well-established residential sector in Gurgaon with excellent infrastructure, connectivity, and a mix of independent houses and apartments.',
    overview: 'Sector 43 offers a balanced lifestyle with good connectivity to major business hubs, educational institutions, and healthcare facilities. The area is known for its peaceful environment and well-maintained infrastructure.',
    priceRangeMin: 6000000,
    priceRangeMax: 35000000,
    avgPricePerSqFt: 10000,
    connectivity: [
      'Well-connected to Sohna Road',
      'Easy access to Golf Course Road',
      'Close to Huda Metro Station',
      'Good connectivity to Delhi via NH-8'
    ],
    amenities: [
      'Local Markets',
      'Schools and Colleges',
      'Healthcare Centers',
      'Parks and Playgrounds',
      'Public Transportation',
      'Shopping Centers'
    ],
    metaTitle: 'Properties in Sector 43 Gurgaon - Best Deals & Expert Advice',
    metaDescription: 'Explore properties in Sector 43 Gurgaon. Independent houses, apartments for sale & rent. Trusted property dealer with local expertise.',
    keywords: ['sector 43 gurgaon', 'independent houses', 'apartments for sale', 'property dealer']
  },
  {
    name: 'Golf Course Road',
    slug: 'golf-course-road',
    city: 'Gurgaon',
    state: 'Haryana',
    description: 'Golf Course Road is the premium commercial and residential corridor of Gurgaon, featuring high-end properties, luxury hotels, and upscale shopping destinations.',
    overview: 'Golf Course Road represents the pinnacle of luxury living in Gurgaon. This prestigious address offers world-class amenities, premium real estate options, and unparalleled connectivity to business districts.',
    priceRangeMin: 15000000,
    priceRangeMax: 100000000,
    avgPricePerSqFt: 18000,
    connectivity: [
      'Direct connectivity to Cyber Hub',
      'Close to IGI Airport via NH-8',
      'Metro connectivity planned',
      'Easy access to Delhi and NCR'
    ],
    amenities: [
      'Luxury Hotels',
      'Premium Shopping Malls',
      'Fine Dining Restaurants',
      'Golf Courses',
      'Spa and Wellness Centers',
      'High-end Retail Outlets'
    ],
    metaTitle: 'Golf Course Road Gurgaon Properties - Luxury Real Estate',
    metaDescription: 'Premium properties on Golf Course Road Gurgaon. Luxury apartments, penthouses, commercial spaces. Expert property consultant services.',
    keywords: ['golf course road', 'luxury properties', 'premium apartments', 'commercial spaces']
  }
];

async function seedAreas() {
  try {
    console.log('🌱 Starting area data seeding...');

    for (const areaData of areasData) {
      // Check if area already exists
      const existingArea = await prisma.area.findUnique({
        where: { slug: areaData.slug },
      });

      if (existingArea) {
        console.log(`⚠️  Area ${areaData.name} already exists, skipping...`);
        continue;
      }

      // Create area
      await prisma.area.create({
        data: areaData
      });

      console.log(`✅ Created area: ${areaData.name}`);
    }

    console.log('');
    console.log('🎉 Area seeding completed successfully!');
    console.log(`📊 Total areas seeded: ${areasData.length}`);

  } catch (error) {
    console.error('❌ Error seeding areas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAreas();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testProperties = [
  {
    areaSlug: 'dlf-phase-5',
    properties: [
      {
        title: 'Luxury 4BHK Apartment in DLF Phase 5',
        description: 'Stunning 4BHK apartment in the heart of DLF Phase 5 with premium finishes, modular kitchen, marble flooring, and breathtaking views. This property offers spacious rooms, ample natural light, and modern amenities. Perfect for families looking for luxury living with excellent connectivity to offices, schools, and shopping centers.',
        price: 35000000, // 3.5 Cr
        propertyType: 'RESIDENTIAL',
        status: 'AVAILABLE',
        bedrooms: 4,
        bathrooms: 3,
        areaSize: 2500,
        address: 'Tower B, DLF Gardencity',
        locality: 'DLF Phase 5',
        furnishing: 'Semi-Furnished',
        yearBuilt: 2020,
        features: ['Modular Kitchen', 'Marble Flooring', 'Reserved Parking', 'Power Backup', 'Intercom', 'Balcony', 'Study Room'],
        amenities: ['Swimming Pool', 'Gym', 'Clubhouse', '24x7 Security', 'Children Play Area', 'Jogging Track', 'Lift', 'Visitor Parking'],
        images: [
          'https://via.placeholder.com/800x600/0ea5e9/ffffff?text=Luxury+Living+Room',
          'https://via.placeholder.com/800x600/10b981/ffffff?text=Master+Bedroom',
          'https://via.placeholder.com/800x600/f59e0b/ffffff?text=Modern+Kitchen',
          'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Balcony+View'
        ],
        metaTitle: '4BHK Luxury Apartment in DLF Phase 5 - ₹3.5 Cr',
        metaDescription: 'Premium 4BHK apartment for sale in DLF Phase 5, Gurgaon. Modern amenities, excellent location, spacious rooms.',
        keywords: ['4bhk apartment dlf phase 5', 'luxury apartment gurgaon', 'dlf property'],
        isFeatured: true,
        isActive: true,
      },
      {
        title: 'Modern 3BHK Builder Floor DLF Phase 5',
        description: 'Beautiful independent 3BHK builder floor in DLF Phase 5. This property features contemporary design, wooden flooring, modular kitchen, and private terrace. Located in a peaceful neighborhood with easy access to market, schools, and metro station.',
        price: 22500000, // 2.25 Cr
        propertyType: 'RESIDENTIAL',
        status: 'AVAILABLE',
        bedrooms: 3,
        bathrooms: 3,
        areaSize: 1800,
        address: 'Pocket A, DLF Phase 5',
        locality: 'DLF Phase 5',
        furnishing: 'Unfurnished',
        yearBuilt: 2019,
        floors: 3,
        features: ['Wooden Flooring', 'Modular Kitchen', 'Private Terrace', 'Reserved Parking', 'Power Backup'],
        amenities: ['Gated Community', '24x7 Security', 'Park Nearby', 'Water Supply'],
        images: [
          'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Builder+Floor+Exterior',
          'https://via.placeholder.com/800x600/06b6d4/ffffff?text=Spacious+Living',
          'https://via.placeholder.com/800x600/14b8a6/ffffff?text=Bedroom'
        ],
        metaTitle: '3BHK Builder Floor in DLF Phase 5 - ₹2.25 Cr',
        metaDescription: 'Independent 3BHK builder floor for sale in DLF Phase 5. Modern design, private terrace, excellent location.',
        keywords: ['3bhk builder floor dlf phase 5', 'independent floor gurgaon'],
        isFeatured: false,
        isActive: true,
      }
    ]
  },
  {
    areaSlug: 'sector-43',
    properties: [
      {
        title: 'Premium 3BHK Apartment Sector 43',
        description: 'Spacious 3BHK apartment in prime location of Sector 43. Features include vitrified tiles, modern kitchen, attached bathrooms, and covered parking. The society offers excellent amenities including swimming pool, gym, and landscaped gardens. Close to schools, hospitals, and shopping complexes.',
        price: 18500000, // 1.85 Cr
        propertyType: 'RESIDENTIAL',
        status: 'AVAILABLE',
        bedrooms: 3,
        bathrooms: 2,
        areaSize: 1650,
        address: 'Central Park 2, Sector 43',
        locality: 'Sector 43',
        furnishing: 'Semi-Furnished',
        yearBuilt: 2018,
        features: ['Vitrified Tiles', 'Modular Kitchen', 'Attached Bathrooms', 'Covered Parking', 'Power Backup', 'Intercom'],
        amenities: ['Swimming Pool', 'Gym', 'Landscaped Gardens', '24x7 Security', 'Lift', 'Community Hall', 'Kids Play Area'],
        images: [
          'https://via.placeholder.com/800x600/ec4899/ffffff?text=Premium+Apartment',
          'https://via.placeholder.com/800x600/f43f5e/ffffff?text=Living+Area',
          'https://via.placeholder.com/800x600/fb923c/ffffff?text=Kitchen'
        ],
        metaTitle: '3BHK Apartment in Sector 43 Gurgaon - ₹1.85 Cr',
        metaDescription: 'Premium 3BHK apartment for sale in Sector 43, Gurgaon. Excellent amenities, prime location.',
        keywords: ['3bhk sector 43', 'apartment gurgaon', 'sector 43 property'],
        isFeatured: true,
        isActive: true,
      }
    ]
  },
  {
    areaSlug: 'golf-course-road',
    properties: [
      {
        title: 'Ultra Luxury 5BHK Penthouse Golf Course Road',
        description: 'Exclusive 5BHK penthouse on Golf Course Road with panoramic views. This ultra-luxury property features Italian marble flooring, imported fixtures, smart home automation, private elevator, and expansive terrace. Includes dedicated parking for 4 cars. Located in the most prestigious area with access to premium clubs, fine dining, and high-end shopping.',
        price: 85000000, // 8.5 Cr
        propertyType: 'RESIDENTIAL',
        status: 'AVAILABLE',
        bedrooms: 5,
        bathrooms: 5,
        areaSize: 5200,
        address: 'DLF Magnolias, Golf Course Road',
        locality: 'Golf Course Road',
        furnishing: 'Fully Furnished',
        yearBuilt: 2021,
        floors: 2,
        features: ['Italian Marble', 'Smart Home Automation', 'Private Elevator', 'Private Pool', 'Home Theater', 'Wine Cellar', 'Servant Quarters', 'Panoramic Views'],
        amenities: ['Concierge Service', 'Infinity Pool', 'Spa', 'Private Gym', 'Clubhouse', 'Golf Course Access', 'Valet Parking', '24x7 Security'],
        images: [
          'https://via.placeholder.com/800x600/6366f1/ffffff?text=Luxury+Penthouse',
          'https://via.placeholder.com/800x600/a855f7/ffffff?text=Living+Room',
          'https://via.placeholder.com/800x600/ec4899/ffffff?text=Master+Suite',
          'https://via.placeholder.com/800x600/14b8a6/ffffff?text=Terrace',
          'https://via.placeholder.com/800x600/f59e0b/ffffff?text=Kitchen'
        ],
        metaTitle: '5BHK Ultra Luxury Penthouse Golf Course Road - ₹8.5 Cr',
        metaDescription: 'Exclusive 5BHK penthouse for sale on Golf Course Road, Gurgaon. Ultra-luxury living with panoramic views.',
        keywords: ['5bhk penthouse golf course road', 'luxury property gurgaon', 'dlf magnolias'],
        isFeatured: true,
        isActive: true,
      },
      {
        title: 'Premium Commercial Office Space Golf Course Road',
        description: 'Grade A commercial office space on Golf Course Road. This fully fitted office features modern interiors, central air conditioning, power backup, and high-speed elevators. Perfect for corporate offices, IT companies, or professional services. Located in a premium business district with excellent connectivity.',
        price: 45000000, // 4.5 Cr
        propertyType: 'COMMERCIAL',
        status: 'AVAILABLE',
        areaSize: 3000,
        address: 'JMD Megapolis, Golf Course Road',
        locality: 'Golf Course Road',
        furnishing: 'Furnished',
        yearBuilt: 2019,
        floors: 1,
        features: ['Fully Fitted', 'Central AC', 'False Ceiling', 'Workstations', 'Conference Rooms', 'Pantry', 'Reception Area'],
        amenities: ['High Speed Elevators', 'Power Backup', 'Visitor Parking', '24x7 Security', 'Food Court', 'ATM'],
        images: [
          'https://via.placeholder.com/800x600/0ea5e9/ffffff?text=Office+Space',
          'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Workstation+Area',
          'https://via.placeholder.com/800x600/06b6d4/ffffff?text=Conference+Room'
        ],
        metaTitle: 'Commercial Office Space Golf Course Road - ₹4.5 Cr',
        metaDescription: 'Grade A office space for sale on Golf Course Road, Gurgaon. Fully fitted, premium location.',
        keywords: ['office space golf course road', 'commercial property gurgaon', 'jmd megapolis'],
        isFeatured: false,
        isActive: true,
      }
    ]
  },
  {
    areaSlug: 'test',
    properties: [
      {
        title: 'Cozy 2BHK Apartment in Test Area',
        description: 'Affordable 2BHK apartment in a well-maintained society. Perfect for small families or working professionals. Features include modern kitchen, good ventilation, and covered parking.',
        price: 8500000, // 85 Lakhs
        propertyType: 'RESIDENTIAL',
        status: 'AVAILABLE',
        bedrooms: 2,
        bathrooms: 2,
        areaSize: 1100,
        address: 'Green Valley Apartments',
        locality: 'Test Area',
        furnishing: 'Semi-Furnished',
        yearBuilt: 2017,
        features: ['Modular Kitchen', 'Vitrified Tiles', 'Power Backup', 'Covered Parking'],
        amenities: ['Gym', '24x7 Security', 'Lift', 'Park'],
        images: [
          'https://via.placeholder.com/800x600/10b981/ffffff?text=Cozy+Apartment',
          'https://via.placeholder.com/800x600/059669/ffffff?text=Bedroom'
        ],
        metaTitle: '2BHK Apartment in Test Area - ₹85 Lakhs',
        metaDescription: 'Affordable 2BHK apartment for sale in Test Area. Perfect for small families.',
        keywords: ['2bhk apartment test area', 'affordable property'],
        isFeatured: false,
        isActive: true,
      }
    ]
  }
];

async function seedProperties() {
  console.log('Starting property seeding...\n');

  try {
    // Get all areas
    const areas = await prisma.area.findMany({
      select: { id: true, slug: true, name: true }
    });

    console.log(`Found ${areas.length} areas in database\n`);

    let totalCreated = 0;

    for (const areaGroup of testProperties) {
      const area = areas.find(a => a.slug === areaGroup.areaSlug);

      if (!area) {
        console.log(`⚠️  Area '${areaGroup.areaSlug}' not found, skipping...`);
        continue;
      }

      console.log(`📍 Creating properties for: ${area.name}`);

      for (const propData of areaGroup.properties) {
        try {
          // Generate slug from title
          const slug = propData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          const property = await prisma.property.create({
            data: {
              ...propData,
              slug,
              areaId: area.id,
            }
          });

          console.log(`   ✅ Created: ${property.title}`);
          totalCreated++;
        } catch (error) {
          console.log(`   ❌ Failed to create: ${propData.title}`);
          console.log(`      Error: ${error.message}`);
        }
      }
      console.log('');
    }

    console.log(`\n🎉 Successfully created ${totalCreated} properties!`);

    // Show summary
    const summary = await prisma.property.groupBy({
      by: ['propertyType'],
      _count: true,
    });

    console.log('\n📊 Summary:');
    summary.forEach(item => {
      console.log(`   ${item.propertyType}: ${item._count} properties`);
    });

  } catch (error) {
    console.error('❌ Error seeding properties:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedProperties();

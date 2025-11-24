const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportToJSON() {
  console.log('🚀 Starting data export to JSON...\n');

  try {
    // Export Areas
    console.log('📍 Exporting Areas...');
    const areas = await prisma.area.findMany({
      orderBy: { name: 'asc' }
    });

    // Create areas index
    const areasIndex = {
      areas: areas.map(area => ({
        id: area.id,
        name: area.name,
        slug: area.slug,
        city: area.city,
        state: area.state,
        description: area.description.substring(0, 200) + '...',
        imageUrl: `/images/areas/${area.slug}.jpg`,
        propertyCount: area.totalProperties || 0,
        priceRangeMin: area.priceRangeMin || 0,
        priceRangeMax: area.priceRangeMax || 0,
        featured: true
      })),
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'data/areas/index.json'),
      JSON.stringify(areasIndex, null, 2)
    );
    console.log(`   ✅ Created areas/index.json (${areas.length} areas)`);

    // Create individual area files
    for (const area of areas) {
      const areaData = {
        id: area.id,
        name: area.name,
        slug: area.slug,
        city: area.city,
        state: area.state,
        description: area.description,
        overview: area.overview || area.description,
        coordinates: area.coordinates || null,
        priceRangeMin: area.priceRangeMin || 0,
        priceRangeMax: area.priceRangeMax || 0,
        avgPricePerSqFt: area.avgPricePerSqFt || 0,
        totalProperties: area.totalProperties || 0,
        connectivity: area.connectivity || [],
        amenities: area.amenities || [],
        images: {
          featured: `/images/areas/${area.slug}.jpg`,
          gallery: [
            `/images/areas/${area.slug}-1.jpg`,
            `/images/areas/${area.slug}-2.jpg`,
            `/images/areas/${area.slug}-3.jpg`
          ]
        },
        seo: {
          metaTitle: area.metaTitle || `Properties in ${area.name} ${area.city} | Best Deals`,
          metaDescription: area.metaDescription || area.description.substring(0, 160),
          keywords: area.keywords || []
        },
        createdAt: area.createdAt.toISOString(),
        updatedAt: area.updatedAt.toISOString()
      };

      fs.writeFileSync(
        path.join(process.cwd(), `data/areas/${area.slug}.json`),
        JSON.stringify(areaData, null, 2)
      );
      console.log(`   ✅ Created areas/${area.slug}.json`);
    }

    // Export Properties
    console.log('\n🏠 Exporting Properties...');
    const properties = await prisma.property.findMany({
      include: { area: true },
      orderBy: { createdAt: 'desc' }
    });

    // Create properties index
    const propertiesIndex = {
      properties: properties.map(prop => ({
        id: prop.id,
        title: prop.title,
        slug: prop.slug,
        price: parseFloat(prop.price.toString()),
        propertyType: prop.propertyType,
        status: prop.status,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        areaSize: prop.areaSize,
        areaSlug: prop.area.slug,
        areaName: prop.area.name,
        address: prop.address,
        imageUrl: `/images/properties/${prop.slug}-1.jpg`,
        isFeatured: prop.isFeatured,
        isActive: prop.isActive
      })),
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'data/properties/index.json'),
      JSON.stringify(propertiesIndex, null, 2)
    );
    console.log(`   ✅ Created properties/index.json (${properties.length} properties)`);

    // Create individual property files
    for (const prop of properties) {
      const propertyData = {
        id: prop.id,
        title: prop.title,
        slug: prop.slug,
        description: prop.description,
        price: parseFloat(prop.price.toString()),
        propertyType: prop.propertyType,
        status: prop.status,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        areaSize: prop.areaSize,
        floors: prop.floors,
        yearBuilt: prop.yearBuilt,
        furnishing: prop.furnishing,
        address: prop.address,
        locality: prop.locality,
        area: {
          id: prop.area.id,
          name: prop.area.name,
          slug: prop.area.slug,
          city: prop.area.city,
          state: prop.area.state
        },
        coordinates: prop.coordinates || null,
        features: prop.features || [],
        amenities: prop.amenities || [],
        nearbyPlaces: prop.nearbyPlaces || [],
        images: prop.images && prop.images.length > 0
          ? prop.images
          : [
              `/images/properties/${prop.slug}-1.jpg`,
              `/images/properties/${prop.slug}-2.jpg`,
              `/images/properties/${prop.slug}-3.jpg`,
              `/images/properties/${prop.slug}-4.jpg`
            ],
        virtualTourUrl: prop.virtualTourUrl,
        videoUrl: prop.videoUrl,
        floorPlanUrl: prop.floorPlanUrl,
        seo: {
          metaTitle: prop.metaTitle || `${prop.title} | PropertyXpert`,
          metaDescription: prop.metaDescription || prop.description.substring(0, 160),
          keywords: prop.keywords || []
        },
        isFeatured: prop.isFeatured,
        isActive: prop.isActive,
        createdAt: prop.createdAt.toISOString(),
        updatedAt: prop.updatedAt.toISOString()
      };

      fs.writeFileSync(
        path.join(process.cwd(), `data/properties/${prop.slug}.json`),
        JSON.stringify(propertyData, null, 2)
      );
      console.log(`   ✅ Created properties/${prop.slug}.json`);
    }

    // Export Blog Posts
    console.log('\n📝 Exporting Blog Posts...');
    const blogPosts = await prisma.blogPost.findMany({
      include: { author: true },
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' }
    });

    // Create blog index
    const blogIndex = {
      posts: blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        featuredImage: `/images/blog/${post.slug}.jpg`,
        author: {
          id: post.author.id,
          name: post.author.name
        },
        category: post.category?.name || 'General',
        tags: post.tags || [],
        status: post.status,
        publishedAt: post.publishedAt?.toISOString() || new Date().toISOString()
      })),
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'data/blog/index.json'),
      JSON.stringify(blogIndex, null, 2)
    );
    console.log(`   ✅ Created blog/index.json (${blogPosts.length} posts)`);

    // Create individual blog files
    for (const post of blogPosts) {
      const blogData = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: `/images/blog/${post.slug}.jpg`,
        author: {
          id: post.author.id,
          name: post.author.name,
          email: post.author.email
        },
        category: post.category?.name || 'General',
        tags: post.tags || [],
        status: post.status,
        publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
        seo: {
          metaTitle: post.metaTitle || `${post.title} | PropertyXpert Blog`,
          metaDescription: post.metaDescription || post.excerpt,
          keywords: post.keywords || []
        },
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      };

      fs.writeFileSync(
        path.join(process.cwd(), `data/blog/${post.slug}.json`),
        JSON.stringify(blogData, null, 2)
      );
      console.log(`   ✅ Created blog/${post.slug}.json`);
    }

    // Create About page content
    console.log('\n📄 Creating About page content...');
    const aboutData = {
      hero: {
        title: "About PropertyXpert",
        subtitle: "Your Trusted Property Partner in Gurgaon",
        description: "With over 10 years of experience in the Gurgaon real estate market, PropertyXpert has helped thousands of families find their dream homes.",
        image: "/images/about/hero.jpg"
      },
      story: {
        title: "Our Story",
        content: "<p>Founded in 2015, PropertyXpert has been serving the Gurgaon real estate market with dedication and transparency. What started as a small team of passionate property consultants has grown into one of the most trusted names in the region.</p><p>Our journey has been marked by countless success stories of families finding their perfect homes and investors making sound property decisions.</p>",
        image: "/images/about/story.jpg"
      },
      mission: {
        title: "Our Mission",
        content: "To provide transparent, reliable, and professional real estate services that help our clients make informed property decisions.",
        values: [
          {
            title: "Transparency",
            description: "We believe in complete transparency in all our dealings. No hidden charges, no misleading information.",
            icon: "transparency"
          },
          {
            title: "Trust",
            description: "Building long-term relationships based on trust and reliability is at the core of our business.",
            icon: "trust"
          },
          {
            title: "Excellence",
            description: "We strive for excellence in every interaction, ensuring the best service for our clients.",
            icon: "excellence"
          },
          {
            title: "Expertise",
            description: "Our team brings decades of combined experience in the Gurgaon real estate market.",
            icon: "expertise"
          }
        ]
      },
      statistics: [
        {
          label: "Properties Sold",
          value: "500+",
          icon: "properties"
        },
        {
          label: "Happy Clients",
          value: "1000+",
          icon: "clients"
        },
        {
          label: "Years of Experience",
          value: "10+",
          icon: "experience"
        },
        {
          label: "Areas Covered",
          value: "20+",
          icon: "areas"
        }
      ],
      seo: {
        metaTitle: "About PropertyXpert - Leading Real Estate Company in Gurgaon",
        metaDescription: "Learn about PropertyXpert, Gurgaon's trusted property dealer with over 10 years of experience. We help you find your dream home.",
        keywords: ["about propertyxpert", "real estate gurgaon", "property dealer gurgaon"]
      }
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'data/about/content.json'),
      JSON.stringify(aboutData, null, 2)
    );
    console.log('   ✅ Created about/content.json');

    // Create Site Settings
    console.log('\n⚙️  Creating Site Settings...');
    const siteSettings = {
      siteName: "PropertyXpert Gurgaon",
      tagline: "Your Trusted Property Partner",
      description: "Leading property dealer in Gurgaon offering the best deals in residential and commercial properties.",
      url: "https://propertyxpertgurgaon.com",
      logo: "/images/logo.png",
      favicon: "/favicon.ico",
      social: {
        facebook: "https://facebook.com/propertyxpert",
        twitter: "https://twitter.com/propertyxpert",
        instagram: "https://instagram.com/propertyxpert",
        linkedin: "https://linkedin.com/company/propertyxpert",
        youtube: "https://youtube.com/@propertyxpert"
      },
      features: {
        blog: true,
        search: true,
        contactForm: true
      }
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'data/config/site-settings.json'),
      JSON.stringify(siteSettings, null, 2)
    );
    console.log('   ✅ Created config/site-settings.json');

    // Create Contact Info
    console.log('\n📞 Creating Contact Info...');
    const contactInfo = {
      primaryPhone: "+91-98765-43210",
      secondaryPhone: "+91-98765-43211",
      primaryEmail: "info@propertyxpert.com",
      supportEmail: "support@propertyxpert.com",
      whatsapp: "+91-98765-43210",
      address: {
        street: "123 Main Street, DLF Phase 5",
        area: "DLF Phase 5",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122002",
        country: "India"
      },
      hours: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed"
      },
      formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID"
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'data/config/contact-info.json'),
      JSON.stringify(contactInfo, null, 2)
    );
    console.log('   ✅ Created config/contact-info.json');

    console.log('\n✅ Data export completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Areas: ${areas.length} exported`);
    console.log(`   Properties: ${properties.length} exported`);
    console.log(`   Blog Posts: ${blogPosts.length} exported`);
    console.log('   About: 1 page created');
    console.log('   Config: 2 files created');

  } catch (error) {
    console.error('❌ Error during export:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportToJSON();

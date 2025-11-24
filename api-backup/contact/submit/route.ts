import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number').min(10).max(20),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  propertyId: z.string().optional(),
  areaSlug: z.string().optional(),
  source: z.enum(['contact-page', 'property-inquiry', 'area-inquiry', 'whatsapp']).default('contact-page'),
});

// WhatsApp configuration - Replace with your WhatsApp number
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '919999999999'; // Default format: country code + number (no + or spaces)

// Rate limiting map (in-memory for now, should use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit - 5 requests per minute
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting (safe fallback)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || '127.0.0.1';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();

    // Check for honeypot field (anti-spam)
    if (body.honeypot) {
      // Silently accept but don't process spam
      return NextResponse.json({ success: true, message: 'Thank you for your submission.' });
    }

    // Validate form data directly (Zod provides basic sanitization)
    const validatedData = contactSchema.parse(body);

    // Log submission for record keeping
    console.log('Contact form submission:', {
      ...validatedData,
      submittedAt: new Date().toISOString(),
      ip: ip,
      userAgent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer'),
    });

    // Create WhatsApp message
    const propertyInfo = validatedData.propertyId ? `\nProperty ID: ${validatedData.propertyId}` : '';
    const areaInfo = validatedData.areaSlug ? `\nArea: ${validatedData.areaSlug}` : '';

    const whatsappMessage = `*New Inquiry from Website*\n\n` +
      `*Name:* ${validatedData.name}\n` +
      `*Email:* ${validatedData.email}\n` +
      `*Phone:* ${validatedData.phone}\n` +
      `*Message:* ${validatedData.message}` +
      propertyInfo +
      areaInfo +
      `\n\n*Source:* ${validatedData.source}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry. You will be redirected to WhatsApp.',
      data: {
        id: `inquiry-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        whatsappUrl: whatsappUrl,
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}
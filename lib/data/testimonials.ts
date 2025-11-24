import testimonialsData from "@/data/config/testimonials.json";

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  property: string;
  rating: number;
  text: string;
  date: string;
}

export interface TestimonialStats {
  averageRating: string;
  happyCustomers: string;
  satisfactionRate: string;
  customerSupport: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
  stats: TestimonialStats;
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData.testimonials as Testimonial[];
}

export function getTestimonialStats(): TestimonialStats {
  return testimonialsData.stats as TestimonialStats;
}

export function getAllTestimonialsData(): TestimonialsData {
  return testimonialsData as TestimonialsData;
}

// Helper function to get initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Helper function to get color for avatar based on name
export function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-teal-500",
  ];

  // Use name length and first char code to determine color
  const charCode = name.charCodeAt(0);
  const colorIndex = charCode % colors.length;

  return colors[colorIndex];
}

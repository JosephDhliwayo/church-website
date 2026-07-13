export const siteConfig = {
  name: "Prayer Movement International",
  url: "https://prayermovementinternational.org",
  tagline: "Transforming Lives by the Superpower of Prophecy",
  address: "Harare, Zimbabwe",
  phone: "+263787999918",
  email: "info@example.org",
  serviceTimes: [
    { day: "Every day", time: "8:00 PM – 9:00 PM (CAT)", label: "WhatsApp Prayer Service" },
  ],
  whatsappGroupUrl: "https://chat.whatsapp.com/JxbT2XkrgRVA0ie6xjRYle",
  whatsappTimeZones: [
    { region: "Zimbabwe (CAT)", time: "8:00 PM – 9:00 PM" },
    { region: "UK (GMT/BST)", time: "6:00 PM – 7:00 PM / 7:00 PM – 8:00 PM" },
    { region: "US Eastern (EST/EDT)", time: "1:00 PM – 2:00 PM / 2:00 PM – 3:00 PM" },
  ],
  navPrimary: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/sermons", label: "Sermons" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ],
  navMore: [
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/prayer-requests", label: "Prayer Requests" },
    { href: "/store", label: "Book Store" },
  ],
  social: {
    facebook: "https://www.facebook.com/share/1DnNoE3WND/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/prayer_movement_international?igsh=djQ1ZHhwa2JhdWpo&utm_source=qr",
    tiktok: "https://www.tiktok.com/@tadiwanasheronal8?_r=1&_t=ZP-97uRsWEmjCY",
  },
} as const;

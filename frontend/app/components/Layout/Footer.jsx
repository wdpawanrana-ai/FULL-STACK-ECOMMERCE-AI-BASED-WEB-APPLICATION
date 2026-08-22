import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Clock,
  ArrowUp
} from "lucide-react";

/**
 * Footer Component
 * Renders the brand footer with corporate links, office address listings, and copyright details.
 */
const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Scooters", path: "/products" },
    { name: "Spare Parts", path: "/products?category=Spare%20Parts" },
    { name: "Services", path: "/#services" },
    { name: "Reviews", path: "/#reviews" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const customerSupport = [
    { name: "FAQ", path: "/faq" },
    { name: "Shipping Policy", path: "/faq" },
    { name: "Return Policy", path: "/faq" },
    { name: "Warranty", path: "/faq" },
    { name: "Terms & Conditions", path: "/faq" },
    { name: "Privacy Policy", path: "/faq" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070b13] border-t border-slate-900 text-slate-305 select-none text-slate-300">
      <div className="container mx-auto px-6 py-16">

        {/* Upper Grid Directories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Logo Brand info */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                ECONOMICS
              </span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary -mt-3 ml-0.5">
              RIDE THE FUTURE
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              We are committed to providing the best electric scooters, spare parts, and services for a sustainable future.
            </p>
            {/* Social media icons (Green rounded circles) */}
            <div className="flex items-center space-x-3 pt-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-[#070b13] text-primary flex items-center justify-center transition-all duration-300 active:scale-90"
                >
                  <social.icon size={13} className="stroke-[2.5]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 relative pb-1">
              Quick Links
              <span className="absolute bottom-0 left-0 w-6 h-[1.5px] bg-primary"></span>
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-xs text-slate-300 hover:text-primary transition-colors font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support Column */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 relative pb-1">
              Customer Support
              <span className="absolute bottom-0 left-0 w-6 h-[1.5px] bg-primary"></span>
            </h3>
            <ul className="space-y-2.5">
              {customerSupport.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-xs text-slate-300 hover:text-primary transition-colors font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 relative pb-1">
              Contact Us
              <span className="absolute bottom-0 left-0 w-6 h-[1.5px] bg-primary"></span>
            </h3>
            <div className="space-y-3.5">
              <div className="flex gap-2.5 text-xs font-semibold text-slate-300">
                <MapPin size={15} className="text-primary flex-shrink-0 mt-0.5" />
                <span>123, Green Road, Eco City, Gurgaon, Haryana 122001</span>
              </div>
              <div className="flex gap-2.5 text-xs font-semibold text-slate-300">
                <Phone size={15} className="text-primary flex-shrink-0" />
                <span>+91 98765-43210</span>
              </div>
              <div className="flex gap-2.5 text-xs font-semibold text-slate-300">
                <Mail size={15} className="text-primary flex-shrink-0" />
                <span>info@economicscooters.com</span>
              </div>
              <div className="flex gap-2.5 text-xs font-semibold text-slate-300">
                <Clock size={15} className="text-primary flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-900 mt-8 relative">
          <div className="text-xs font-bold text-slate-400 text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Economics. All Rights Reserved.
          </div>

          <div className="text-xs font-bold text-slate-400 text-center md:text-right">
            Designed with <span className="text-red-500">♥</span> for a Greener Tomorrow.
          </div>

          {/* Floating Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="absolute -top-14 right-0 p-3 bg-primary hover:bg-primary/95 text-[#070b13] rounded-full shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all duration-300"
            title="Scroll to Top"
          >
            <ArrowUp size={16} className="stroke-[3]" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

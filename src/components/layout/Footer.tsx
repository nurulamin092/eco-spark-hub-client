import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
export function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">EcoSpark Hub</h3>
            <p className="text-sm text-muted-foreground">
              Empowering communities to share sustainable ideas for a better
              planet.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/ideas"
                  className="text-muted-foreground hover:text-primary"
                >
                  All Ideas
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@ecospark.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +1 (555) 123-4567
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Link href="#">
                <FaFacebookF className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#">
                <FaTwitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#">
                <FaLinkedinIn className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

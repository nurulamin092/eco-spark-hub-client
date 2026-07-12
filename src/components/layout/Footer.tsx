import { NewsletterForm } from "@/features/newsletter/components/NewsletterForm";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
export function Footer() {
  return (
    <footer
      className="relative
    mt-auto
    overflow-hidden
    border-t
    border-border/60
    py-24"
    >
      <div
        aria-hidden="true"
        className="
    pointer-events-none
    absolute
    inset-0
    overflow-hidden
  "
      >
        <div
          className="
      absolute
      left-0
      top-0
      h-96
      w-96
      rounded-full
      bg-primary/10
      blur-[160px]
    "
        />

        <div
          className="
      absolute
      right-0
      bottom-0
      h-96
      w-96
      rounded-full
      bg-emerald-500/10
      blur-[160px]
    "
        />
      </div>
      <div className="container relative mx-auto px-4">
        <div
          className="
    glass
    border-gradient
    rounded-[32px]
    p-10
    shadow-card
    lg:p-14
  "
        >
          <div
            className="grid grid-cols-1
gap-10
md:grid-cols-2
xl:grid-cols-5"
          >
            <div>
              <div className="space-y-6">
                <div>
                  <h3
                    className="
        text-3xl
        font-extrabold
        tracking-tight
      "
                  >
                    EcoSpark Hub
                  </h3>

                  <p
                    className="
        mt-5
        text-base
        leading-8
        text-muted-foreground/80
      "
                  >
                    Empowering communities to share sustainable ideas for a
                    greener, smarter, and more sustainable future.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4
                className="mb-6
    text-lg
    font-bold
    tracking-tight"
              >
                Subscribe
              </h4>
              <NewsletterForm variant="footer" />
            </div>

            <div>
              <h4
                className="mb-6
    text-lg
    font-bold
    tracking-tight"
              >
                Quick Links
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground
transition-all
duration-300
hover:text-primary
hover:translate-x-1
inline-block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ideas"
                    className="text-muted-foreground
transition-all
duration-300
hover:text-primary
hover:translate-x-1
inline-block"
                  >
                    All Ideas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testimonials"
                    className="text-muted-foreground
transition-all
duration-300
hover:text-primary
hover:translate-x-1
inline-block"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="mb-6
    text-lg
    font-bold
    tracking-tight"
              >
                Support
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground
transition-all
duration-300
hover:text-primary
hover:translate-x-1
inline-block"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground
transition-all
duration-300
hover:text-primary
hover:translate-x-1
inline-block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground
transition-all
duration-300
hover:text-primary
hover:translate-x-1
inline-block"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="mb-6
    text-lg
    font-bold
    tracking-tight"
              >
                Contact
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail
                    className="h-4
w-4
text-primary"
                  />{" "}
                  hello@ecospark.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone
                    className="h-4
w-4
text-primary"
                  />{" "}
                  +1 (555) 123-4567
                </li>
              </ul>
              <div
                className=" mt-6
    flex
    gap-3"
              >
                <Link
                  href="#"
                  className="group
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-border
text-muted-foreground
transition-all
duration-300
hover:-translate-y-1
hover:border-primary/30
hover:bg-primary
hover:text-primary-foreground"
                >
                  <FaFacebookF className="h-5 w-5 transition-colors duration-300" />
                </Link>
                <Link
                  href="#"
                  className=" group
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-border
text-muted-foreground
transition-all
duration-300
hover:-translate-y-1
hover:border-primary/30
hover:bg-primary
hover:text-primary-foreground"
                >
                  <FaTwitter className="h-5 w-5 transition-colors duration-300" />
                </Link>
                <Link
                  href="#"
                  className=" group
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-border
text-muted-foreground
transition-all
duration-300
hover:-translate-y-1
hover:border-primary/30
hover:bg-primary
hover:text-primary-foreground"
                >
                  <FaLinkedinIn className="h-5 w-5 transition-colors duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className=" mt-12
    border-t
    border-border/60
    pt-8"
        >
          <div
            className="
    flex
    flex-col
    items-center
    justify-between
    gap-6
    text-sm
    text-muted-foreground
    md:flex-row
  "
          >
            © {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
            <div
              className="
    flex
    flex-wrap
    items-center
    gap-6
  "
            >
              <Link
                href="/privacy"
                className="
      transition-colors
      duration-300
      hover:text-primary
    "
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="
      transition-colors
      duration-300
      hover:text-primary
    "
              >
                Terms
              </Link>

              <Link
                href="/contact"
                className="
      transition-colors
      duration-300
      hover:text-primary
    "
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { UtensilsCrossed, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { CONTACT_PHONE, CONTACT_ADDRESS } from "@/lib/constants";

const LINKS = {
  Company:  [{ href: "/about",       label: "About Us"     }, { href: "/careers",  label: "Careers"      }, { href: "/blog",    label: "Blog"        }],
  Explore:  [{ href: "/restaurants", label: "Restaurants"  }, { href: "/",         label: "Categories"   }, { href: "/",        label: "Offers"      }],
  Support:  [{ href: "/",            label: "Help Centre"  }, { href: "/",         label: "Privacy Policy"}, { href: "/",        label: "Terms"       }],
};

const RESTAURANT_NAMES = [
  "Burning Brownie", "Shandana's Kitchen", "Pizza Master", "Chai Wala",
  "Karahi House", "Biryani Centre", "The Dessert Lab", "Tandoori Nights",
  "Sandwich Republic", "Sushi Garden",
];

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-charcoal-300 mt-auto">

      {/* Restaurant name ticker */}
      <div className="border-b border-charcoal-800 py-3 overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] w-max gap-8">
          {[...RESTAURANT_NAMES, ...RESTAURANT_NAMES].map((name, i) => (
            <span key={i} className="flex items-center gap-2 text-xs text-charcoal-500 whitespace-nowrap">
              <UtensilsCrossed className="h-3 w-3 text-brand-500/60" />
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="page-container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
                <UtensilsCrossed className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Smart Food Delivery</span>
            </Link>
            <p className="text-sm leading-relaxed text-charcoal-400 mb-5 max-w-xs">
              Connecting you with the best local restaurants. Fresh food delivered to your door in 30 minutes or less.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-brand-500 shrink-0" />
                <span>{CONTACT_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-500 shrink-0" />
                <a href={`tel:${CONTACT_PHONE}`} className="hover:text-white transition-colors">{CONTACT_PHONE}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-500 shrink-0" />
                <a href="mailto:hello@smartfood.pk" className="hover:text-white transition-colors">hello@smartfood.pk</a>
              </div>
            </div>
          </div>

          {/* Nav groups */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-white mb-4">{group}</h3>
              <ul className="space-y-2.5">
                {items.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-charcoal-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — NO Next.js logo */}
        <div className="border-t border-charcoal-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal-500">
            © {new Date().getFullYear()} Smart Food Delivery. All rights reserved. · Peshawar, Pakistan
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-charcoal-800 text-charcoal-400 hover:bg-brand-500 hover:text-white transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

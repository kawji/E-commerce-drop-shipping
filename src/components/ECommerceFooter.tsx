import Link from "next/link"
import type { ComponentType } from "react"
import {
    RotateCcw,
    Truck,
    PackageSearch,
    HelpCircle,
    Phone,
    Mail,
    MapPin,
    CreditCard,
    Wallet,
    Banknote,
    ShieldCheck,
    Headphones,
} from "lucide-react"
import VisaIcon from "@/icons/visa"
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "@/icons/socials"

/** โครงสร้างลิงก์ใน Footer */
interface FooterLink {
    label: string;
    href: string;
    icon?: ComponentType<{ className?: string }>;
}

const CUSTOMER_SERVICE_LINKS: FooterLink[] = [
    { label: "Return & Refund Policy", href: "/help/returns", icon: RotateCcw },
    { label: "Shipping & Delivery", href: "/help/shipping", icon: Truck },
    { label: "Order Tracking", href: "/help/tracking", icon: PackageSearch },
    { label: "FAQ", href: "/help/faq", icon: HelpCircle },
    { label: "Contact Us", href: "/help/contact", icon: Phone },
]

const COMPANY_LINKS: FooterLink[] = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog & News", href: "/blog" },
    { label: "Sell on MyMerce", href: "/sellers" },
    { label: "Privacy Policy", href: "/privacy" },
]

const SOCIAL_LINKS: FooterLink[] = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Youtube", href: "https://youtube.com" },
]

const SOCIAL_ICONS = [FacebookIcon, InstagramIcon, XIcon, YoutubeIcon]

/**
 * Reusable Component: Footer สไตลE-commerce มืออาชีพ (คล้าย Lazada/Shopee)
 * แบ่งช่อง: เกี่ยวกับเรา / บริการลูกค้า / บริษัท / ช่องทางชำระเงิน + โซเชียลมีเดีย
 * ใช้โทนสีเขียวเข้ม (#0f3612) ตามธีมหลักของโปรเจกต์
 */
export default function ECommerceFooter() {
    return (
        <footer className="flex flex-col w-full bg-[#0f3612] text-zinc-200 mt-16">
            {/* ส่วนเนื้อหาหลักของ Footer */}
            <div className="flex flex-col w-full max-w-380 px-6 sm:px-10 md:px-14 py-12 md:py-16 gap-10 md:gap-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    
                    {/* ช่อง 1: ข้อมูลบริษัท / เกี่ยวกับเรา */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-50/10">
                                <Headphones className="w-5 h-5 text-zinc-50" />
                            </span>
                            <p className="text-xl font-bold text-zinc-50 tracking-wide">MyMerce</p>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-300/80">
                            Your one-stop destination for authentic gadgets and electronics.
                            We deliver quality products, best prices, and trusted service
                            to customers nationwide.
                        </p>
                        <div className="flex flex-col gap-2 text-sm text-zinc-300/80">
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 shrink-0 text-zinc-400" />
                                123 Rama IX Rd, Bangkok 10320, Thailand
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4 shrink-0 text-zinc-400" />
                                support@mymerce.example
                            </span>
                        </div>
                    </div>

                    {/* ช่อง 2: บริการช่วยเหลือลูกค้า */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-bold text-zinc-50 uppercase tracking-wider">
                            Customer Service
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {CUSTOMER_SERVICE_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2 text-sm text-zinc-300/80 hover:text-zinc-50 hover:translate-x-0.5 transition-all duration-200"
                                    >
                                        {link.icon && <link.icon className="w-4 h-4 shrink-0 text-zinc-400" />}
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ช่อง 3: ข้อมูลบริษัท */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-bold text-zinc-50 uppercase tracking-wider">
                            MyMerce
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {COMPANY_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-300/80 hover:text-zinc-50 hover:translate-x-0.5 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* โซเชียลมีเดีย */}
                        <div className="flex flex-col gap-3 mt-1">
                            <h3 className="text-base font-bold text-zinc-50 uppercase tracking-wider">
                                Follow Us
                            </h3>
                            <div className="flex items-center gap-2">
                                {SOCIAL_ICONS.map((Icon, i) => (
                                    <Link
                                        key={SOCIAL_LINKS[i].label}
                                        href={SOCIAL_LINKS[i].href}
                                        aria-label={SOCIAL_LINKS[i].label}
                                        className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-50/8 hover:bg-zinc-50/15 text-zinc-200 hover:text-zinc-50 transition-all duration-200"
                                    >
                                        <Icon className="w-4.5 h-4.5" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ช่อง 4: ช่องทางชำระเงิน */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-bold text-zinc-50 uppercase tracking-wider">
                            Payment Methods
                        </h3>
                        <div className="grid grid-cols-2 gap-2.5">
                            <span className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-50/8 border border-zinc-50/10 text-zinc-100">
                                <VisaIcon className="w-6 h-6 shrink-0" />
                                <span className="text-xs font-semibold">Visa</span>
                            </span>
                            <span className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-50/8 border border-zinc-50/10 text-zinc-100">
                                <CreditCard className="w-6 h-6 shrink-0" />
                                <span className="text-xs font-semibold">Mastercard</span>
                            </span>
                            <span className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-50/8 border border-zinc-50/10 text-zinc-100">
                                <Wallet className="w-6 h-6 shrink-0" />
                                <span className="text-xs font-semibold">TrueMoney</span>
                            </span>
                            <span className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-50/8 border border-zinc-50/10 text-zinc-100">
                                <Banknote className="w-6 h-6 shrink-0" />
                                <span className="text-xs font-semibold">PromptPay</span>
                            </span>
                        </div>
                        <p className="flex items-center gap-2 text-xs text-zinc-300/70">
                            <ShieldCheck className="w-4 h-4 shrink-0 text-green-400" />
                            100% Secure Payment & Buyer Protection
                        </p>
                    </div>
                </div>
            </div>

            {/* แถบล่าง: ลิขสิทธิ์ */}
            <div className="w-full border-t border-zinc-50/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full max-w-380 px-6 sm:px-10 md:px-14 py-5">
                    <p className="text-xs text-zinc-400">
                        © {new Date().getFullYear()} MyMerce Co., Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                        <Link href="/terms" className="hover:text-zinc-100 transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-zinc-100 transition-colors">Privacy Policy</Link>
                        <Link href="/cookies" className="hover:text-zinc-100 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
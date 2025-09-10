"use client";

import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import footerTranslations from "./footer-content.json" assert { type: "json" };

export default function Footer({ lang = "de" }: { lang?: "de" | "en" }) {
    const t = footerTranslations[lang];

    return (
        <footer className="w-full border-t mt-12">
            <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-8 text-sm">
                <div>
                    <span className="font-bold block mb-1">{t.company}</span>
                    <a href="/impress" className="text-green-700 hover:text-green-600 hover:underline block mb-1 transition-colors">{t.impressum}</a>
                    <a href="https://shop.spreadshirt.ch/vcs-ethz/" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-600 hover:underline block transition-colors">{t.merch}</a>
                    <span className="text-xs text-gray-400 mt-2 block">&copy; {t.copyright}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="font-bold block mb-1">{t.footerNote}</span>
                    <a href="https://vseth.ethz.ch" target="_blank" rel="noopener noreferrer" className="mt-2">
                        <Image src="/vseth_logo.png" alt="VSETH Logo" width={120} height={64} className="h-16 w-auto" />
                    </a>
                </div>
                <div className="flex flex-col items-start gap-4 md:justify-end">
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram className="text-3xl hover:text-green-600" />
                    </a>
                    <a href="https://www.linkedin.com/company/vcs-ethz/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin className="text-3xl hover:text-green-600" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

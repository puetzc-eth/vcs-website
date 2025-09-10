"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { MdTranslate, MdLogin } from "react-icons/md";
// ...existing code...
import Image from "next/image";
import navTranslations from "./header-content.json" assert { type: "json" };

// Sprachumschalter als Icon-Button
function LanguageSwitch({ lang, setLang }: { lang: "de" | "en"; setLang: (l: "de" | "en") => void }) {
    return (
        <button
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            aria-label="Sprache wechseln"
            type="button"
            className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors`}
        >
            <MdTranslate className="text-2xl text-gray-700" />
        </button>
    );
}

// Theme Toggle Button als Icon
function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            setDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDark(false);
        }
    }, []);

    const toggleTheme = () => {
        if (dark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDark(true);
        }
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            aria-label="Theme wechseln"
            type="button"
            className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors`}
        >
            {dark ? <FaSun className="text-2xl text-gray-700" /> : <FaMoon className="text-2xl text-gray-700" />}
        </button>
    );
}


export default function Header({
    lang = "de",
    setLang,
}: {
    lang?: "de" | "en";
    setLang?: (l: "de" | "en") => void;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const t = navTranslations[lang];
    const m = t.menu;

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-sm transition-all duration-500 ${menuOpen ? 'h-[60rem] bg-gray-200 rounded-b-xl' : 'h-20 bg-gray-100'} flex flex-col items-center overflow-hidden`}>
                <div className="flex items-center px-4 w-full max-w-7xl mx-auto justify-between h-20">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 focus:outline-none" aria-label="Zur Startseite">
                            <div className="w-28 h-28 relative">
                                <Image
                                    src="/logo.png"
                                    alt="Firmenlogo"
                                    fill
                                    style={{ objectFit: "contain" }}
                                    priority
                                />
                            </div>
                        </Link>
                        <nav className="flex flex-row items-center gap-6 ml-2">
                            <Link href="/about" className={`text-black font-medium text-lg px-3 py-2 rounded transition-colors ${menuOpen ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}>{t.vcs}</Link>
                            <Link href="/events/calendar" className={`text-black font-medium text-lg px-3 py-2 rounded transition-colors ${menuOpen ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}>{t.events}</Link>
                            <Link href="/commissions" className={`text-black font-medium text-lg px-3 py-2 rounded transition-colors ${menuOpen ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}>{t.commissions}</Link>
                            <a href="https://exams.vcs.ethz.ch" target="_blank" rel="noopener noreferrer" className={`text-black font-medium text-lg px-3 py-2 rounded transition-colors ${menuOpen ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`}>{t.exams}</a>
                            <button className={`ml-2 p-2 rounded-full transition-colors ${menuOpen ? 'hover:bg-gray-300' : 'hover:bg-gray-200'}`} aria-label="Menü öffnen" onClick={() => setMenuOpen(v => !v)}>
                                {menuOpen ? (
                                    <MdClose className="text-2xl text-gray-700" />
                                ) : (
                                    <GiHamburgerMenu className="text-2xl text-gray-700" />
                                )}
                            </button>
                        </nav>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        {setLang && <LanguageSwitch lang={lang} setLang={setLang} />}
                        <ThemeToggle />
                        <button className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors`} aria-label="Anmelden">
                            <MdLogin className="text-xl text-gray-700" />
                        </button>
                    </div>
                </div>
                {/* Aufklappmenü */}
                <div className={`w-full max-w-7xl mx-auto flex-col px-4 pt-4 transition-opacity duration-500 ${menuOpen ? 'flex opacity-100' : 'hidden opacity-0'}`}>
                    <div className="flex flex-row gap-6 items-start">
                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 w-[19rem]">
                                <h3 className="font-bold text-gray-700 mb-2 text-base uppercase tracking-wide">{m.ueber}</h3>
                                <Link href="/about/board" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.vorstand}</Link>
                                <Link href="/about/alumni" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.ehemalige}</Link>
                                <Link href="/about/safety" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.safety}</Link>
                                <Link href="/about/legal" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.recht}</Link>
                                <Link href="/about/code" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.kodex}</Link>
                                <a href="https://wiki.vcs.ethz.ch" target="_blank" rel="noopener noreferrer" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.wiki}</a>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 w-[19rem]">
                                <h3 className="font-bold text-gray-700 mb-2 text-base uppercase tracking-wide">{m.events}</h3>
                                <Link href="/events/calendar" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.eventkalender}</Link>
                                <Link href="/events/help" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.helfen}</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 w-[19rem]">
                                <h3 className="font-bold text-gray-700 mb-2 text-base uppercase tracking-wide">{m.hopo}</h3>
                                <Link href="/hopo/semrep" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.semestersprechende}</Link>
                                <Link href="/hopo/delegates" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.delegierte}</Link>
                                <Link href="/hopo/hopoko" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.hopoko}</Link>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 w-[19rem]">
                                <h3 className="font-bold text-gray-700 mb-2 text-base uppercase tracking-wide">{m.exsikkator}</h3>
                                <Link href="/exsi/current" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.ausgaben}</Link>
                                <Link href="/exsi/archive" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.archiv}</Link>
                                <Link href="/exsi/reko" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.reko}</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 w-[19rem]">
                                <h3 className="font-bold text-gray-700 mb-2 text-base uppercase tracking-wide">{m.bamk}</h3>
                                <a href="https://exams.ethz.ch" target="_blank" rel="noopener noreferrer" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{t.exams}</a>
                                <Link href="/bamk/pvk" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.pvk}</Link>
                                <Link href="/bamk/research" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.forschungsgruppen}</Link>
                                <Link href="/bamk/elective" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.wahlfach}</Link>
                                <Link href="/bamk/books" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.buecherboerse}</Link>
                                <Link href="/bamk/protocol" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.protokoll}</Link>
                                <Link href="/bamk/award" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.award}</Link>
                                <Link href="/bamk/bamko" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.bamko}</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 w-[19rem]">
                                <h3 className="font-bold text-gray-700 mb-2 text-base uppercase tracking-wide">{m.karriere}</h3>
                                <a href="https://chemconnect.ethz.ch" target="_blank" rel="noopener noreferrer" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.chemconnect}</a>
                                <Link href="/career/sirop" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.sirop}</Link>
                                <a href="https://chemtogether.ethz.ch" target="_blank" rel="noopener noreferrer" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.chemtogether}</a>
                            </div>
                            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 w-[19rem]">
                                <h3 className="font-bold text-gray-700 mb-2 text-base uppercase tracking-wide">{m.erstiecke}</h3>
                                <Link href="/freshers/studies" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.studium}</Link>
                                <Link href="/freshers/administrative" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.administratives}</Link>
                                <Link href="/freshers/housing" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.wohnen}</Link>
                                <Link href="/freshers/weekend" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.wochenende}</Link>
                                <Link href="/freshers/trialstudy" className="text-black font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors">{m.schnupper}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
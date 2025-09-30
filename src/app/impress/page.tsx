"use client";

import Image from 'next/image';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './page.module.css';
import content from './content.json' assert { type: "json" };

export default function Home() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = content[lang].home;

    return(
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} setLang={setLang} />

            <main className="flex-1">
                <section
                    id="start"
                    className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center mb-8"
                >
                    
                  
                </section>
            </main>

            <div className="w-full">
                <Footer lang={lang} />
            </div>
        </div>
    );
}
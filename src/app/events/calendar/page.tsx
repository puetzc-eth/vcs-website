"use client";

import Image from 'next/image';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './page.module.css';
import content from './content.json' assert { type: "json" };

export default function Home() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = content[lang].home;

                // Beispiel-Events
                    const events = [
                        { date: '2025-10-05', title: 'Ersti-Apéro', description: 'Begrüßung der Erstsemester', location: 'HXE', time: '18:00' },
                        { date: '2025-10-12', title: 'VCS Generalversammlung', description: 'Mitgliederversammlung', location: 'CAB', time: '17:30' },
                        { date: '2025-10-20', title: 'Prüfungsvorbereitungskurs', description: 'Crashkurs für OC1', location: 'HCI', time: '16:00' }
                    ];

                // State für Monat und Jahr
                const [selectedYear, setSelectedYear] = useState(2025);
                const [selectedMonth, setSelectedMonth] = useState(9); // Oktober (0-basiert)

                // Kalenderdaten
                const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
                const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
                const weeks = [];
                let day = 1 - (firstDay === 0 ? 6 : firstDay - 1); // Mo=0, JS So=0
                for (let w = 0; w < 6; w++) {
                    const week = [];
                    for (let d = 0; d < 7; d++) {
                        if (day > 0 && day <= daysInMonth) {
                            week.push(day);
                        } else {
                            week.push(null);
                        }
                        day++;
                    }
                    weeks.push(week);
                }

                // Events nach Tag
                const eventMap = Object.fromEntries(
                    events
                        .filter(ev => {
                            const [y, m] = ev.date.split('-');
                            return parseInt(y) === selectedYear && parseInt(m) === selectedMonth + 1;
                        })
                        .map(ev => [parseInt(ev.date.split('-')[2]), ev])
                );

                // Monatsnamen
                const monthNames = [
                    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
                ];

                // Jahr-Auswahl
                const years = Array.from({ length: 6 }, (_, i) => 2023 + i);

                return(
                        <div className="min-h-screen flex flex-col">
                                <Header lang={lang} setLang={setLang} />

                                <main className="flex-1">
                                        <section className="max-w-5xl mx-auto p-4 pt-32">
                                            <div className="flex items-center gap-4 mb-6">
                                                <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))} className="border rounded px-2 py-1">
                                                    {monthNames.map((name, idx) => (
                                                        <option key={name} value={idx}>{name}</option>
                                                    ))}
                                                </select>
                                                <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="border rounded px-2 py-1">
                                                    {years.map(y => (
                                                        <option key={y} value={y}>{y}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <h1 className="text-3xl font-bold mb-6">{monthNames[selectedMonth]} {selectedYear}</h1>
                                                                <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
                                                                                        <table className="w-full text-center table-fixed">
                                                                                            <colgroup>
                                                                                                <col style={{ width: '7rem' }} />
                                                                                                <col style={{ width: '7rem' }} />
                                                                                                <col style={{ width: '7rem' }} />
                                                                                                <col style={{ width: '7rem' }} />
                                                                                                <col style={{ width: '7rem' }} />
                                                                                                <col style={{ width: '7rem' }} />
                                                                                                <col style={{ width: '7rem' }} />
                                                                                            </colgroup>
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th className="py-2">Mo</th>
                                                                                                    <th className="py-2">Di</th>
                                                                                                    <th className="py-2">Mi</th>
                                                                                                    <th className="py-2">Do</th>
                                                                                                    <th className="py-2">Fr</th>
                                                                                                    <th className="py-2">Sa</th>
                                                                                                    <th className="py-2">So</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {weeks.map((week, wi) => (
                                                                                                    <tr key={wi}>
                                                                                                        {week.map((d, di) => (
                                                                                                            <td key={di} className={`h-24 align-top border ${d ? 'bg-gray-50' : 'bg-white'}`} style={{ minHeight: '6rem', wordBreak: 'break-word', whiteSpace: 'normal' }}>
                                                                                                                {d && (
                                                                                                                    <div>
                                                                                                                        <div className="font-bold">{d}</div>
                                                                                                                        {eventMap[d] && (
                                                                                                                            <div className="mt-1 text-xs bg-green-200 rounded px-1 py-0.5 font-semibold break-words whitespace-normal">
                                                                                                                                <div>{eventMap[d].title}</div>
                                                                                                                                <div className="font-normal text-gray-700">{eventMap[d].location}, {eventMap[d].time}</div>
                                                                                                                            </div>
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                )}
                                                                                                            </td>
                                                                                                        ))}
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </table>
                                                                </div>
                                                                <div className="mt-8">
                                                                    <h2 className="text-xl font-bold mb-2">Events im {monthNames[selectedMonth]}</h2>
                                                                    <ul className="list-disc pl-6">
                                                                        {events.filter(ev => {
                                                                            const [y, m] = ev.date.split('-');
                                                                            return parseInt(y) === selectedYear && parseInt(m) === selectedMonth + 1;
                                                                        }).map(ev => (
                                                                            <li key={ev.date}>
                                                                                <span className="font-semibold">{ev.date}:</span> {ev.title} – {ev.description} <span className="text-gray-700">({ev.location}, {ev.time})</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                        </section>
                                </main>

                                <div className="w-full">
                                        <Footer lang={lang} />
                                </div>
                        </div>
                );
}
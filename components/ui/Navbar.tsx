'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveHoverButton } from '@/components/ui/Interactive-Hover-Button';
import { useLenis } from '@studio-freight/react-lenis';
import { useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/config';

export default function Navbar() {
    const { t } = useTranslation();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const lenis = useLenis();

    /* -------- секции для скролла -------- */
    const SECTIONS = [
        { id: 'hero', label: t('sections.hero') },
        { id: 'about', label: t('sections.about') },
        { id: 'field', label: t('sections.field') },
        { id: 'music', label: t('sections.music') },
        { id: 'contacts', label: t('sections.contacts') }
    ];

    const [activeSection, setActiveSection] = useState(SECTIONS[0].label);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    /* пересчитать активную секцию при смене языка */
    useEffect(() => {
        setActiveSection(SECTIONS[0].label);
    }, [i18n.language]);

    /* -------- логика скрытия навбара и подсветки секций -------- */
    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            setIsVisible(current < lastScrollY || current < 100);
            setLastScrollY(current);

            const center = current + window.innerHeight / 2;

            for (const s of SECTIONS) {
                const el = document.getElementById(s.id);
                if (!el) continue;
                const { top, height } = el.getBoundingClientRect();
                const start = top + window.scrollY;
                if (center >= start && center <= start + height) {
                    setActiveSection(s.label);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, SECTIONS]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el && lenis) {
            lenis.scrollTo(el, { lerp: 0.05, duration: 1.2 });
        }
        setIsDropdownOpen(false);
    };

    /* -------- переключатель языка -------- */
    const nextLocale = i18n.language === 'ru' ? 'en' : 'ru';
    const changeLang = () => {
        i18n.changeLanguage(nextLocale);                           // мгновенный перевод
        document.cookie = `lang=${nextLocale}; path=/; max-age=31536000`; // сохраняем
        router.refresh();                                          // перерендер серверных компонентов
    };

    /* -------- рендер -------- */
    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-full h-20 bg-black z-50"
            >
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
                    {/* левый дроп‑даун со списком секций */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="text-white font-bold font-unbounded uppercase"
                        >
                            <motion.span
                                key={activeSection}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeSection}
                            </motion.span>
                        </motion.button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute left-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-48 bg-black bg-opacity-70 rounded-md overflow-hidden"
                                >
                                    {SECTIONS.map((s) => (
                                        <motion.button
                                            key={s.id}
                                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)', scale: 1.05 }}
                                            onClick={() => scrollToSection(s.id)}
                                            className="w-full px-4 py-2 text-left text-white-50 font-light font-unbounded uppercase"
                                        >
                                            {s.label}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* переключатель языка */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={changeLang}
                        className="flex items-center gap-1 px-3 py-2 rounded-md text-white"
                    >
                        <Languages className="w-5 h-5" strokeWidth={1} />
                        <span className="font-unbounded text-xs uppercase">
                            {i18n.language.toUpperCase()}
                        </span>
                    </motion.button>

                    {/* кнопка Контакты */}
                    <InteractiveHoverButton>{t('contacts_button')}</InteractiveHoverButton>
                </div>
            </motion.nav>

            {/* затемняющий клик‑аут для дроп‑дауна */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </>
    );
}
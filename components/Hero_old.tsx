"use client";

import React, { useRef } from "react";
import "@/app/[locale]/globals.css";
import { TextEffect } from "@/components/ui/Text-Effect";
import { Particles } from "@/components/ui/Particles";
import { motion, useScroll, useTransform } from "framer-motion";

import i18n from '@/i18n/config';
import { useTranslation } from 'react-i18next';
import {TextLoop} from "@/components/ui/Text-Loop";

const Hero = () => {
    const ref = useRef(null);
    const { t } = useTranslation();
    const roles = t('about.roles', { returnObjects: true }) as string[];{roles.map((role:string) => (<span key={role}>{role}</span>))}
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });


    // Parallax effect for ImageHeroAnim
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <div
            id="hero"
            className="flex justify-center items-center overflow-hidden bg-black-bg w-screen h-screen relative"
            ref={ref}
        >
             {/*Particles*/}
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    color="#fffaf0"
                />
            <div className='relative h-fit w-fit'>
                <div
                    className="relative mb-40 md:mb-0 flex flex-col items-center justify-center h-fit w-fit"
                >
                    {/* Текст MAGEROV с анимацией */}
                        <TextEffect
                            per="line"
                            className="relative text-[14vw] font-unbounded font-bold text-center text-white z-20"
                            preset="slide"
                            delay={0.5}
                            variants={{
                                container: {
                                    hidden: {
                                        opacity: 0,
                                    },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.05,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        rotateX: 90,
                                        y: 10,
                                    },
                                    visible: {
                                        opacity: 1,
                                        rotateX: 0,
                                        y: 0,
                                        transition: {
                                            duration: 0.2,
                                        },
                                    },
                                },
                            }}
                        >
                            MAGEROV
                        </TextEffect>

                    <TextLoop className="overflow-y-clip" /* анимация */>
                        {roles.map((role) => (
                            <span key={role}>{role}</span>
                        ))}
                    </TextLoop>

                    {/* Контейнер для изображений */}
                    <div
                        className='absolute translate-y-[15%] -translate-x-[20%] md:-translate-x-[40%] md:translate-y-[4%] w-fit h-fit z-30'>
                        <motion.img
                            style={{y: imageY}}
                            src="/hero/fg_hero.png"
                            alt="Background"
                            initial={{x: 150, opacity: 0, scale: 0.7}} // Начальное состояние
                            animate={{x: 0, opacity: 1, scale: 1}}   // Конечное состояние
                            transition={{
                                x: {delay: 1, duration: 1.5, type: 'spring'},
                                scale: {delay: 1, duration: 1.5, type: 'spring'},
                                opacity: {delay: 1.2, duration: 0.4}
                            }}// Параметры перехода
                            className='w-[60vw] h-[70vw] md:w-[40vw] md:h-[40vw] object-cover rounded-[20vw] md:rounded-[10vw]'
                        />
                    </div>

                    {/* Подзаголовок */}
                        <TextEffect
                            key={`hero-t1-${i18n.language}`}
                            per="char"
                            delay={1.5}
                            className="relative text-[6vw] translate-y-[20vw] md:translate-y-0 md:text-[4vw] font-caveat font-light italic text-center text-white-50 z-40"
                            preset="slide"
                        >
                            {t('hero.t1')}
                        </TextEffect>
                </div>
            </div>
        </div>
    );
};

export default Hero;
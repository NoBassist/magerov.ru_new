'use client'

import React from 'react';
import { useEffect, useRef } from 'react';
import {useInView, useScroll, useTransform} from 'framer-motion';
import { TextLoop } from "@/components/ui/Text-Loop";
import {  VerticalCutReveal, VerticalCutRevealRef } from "@/components/ui/vertical-cut-reveal"
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion"

const About = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref);
    const textRef = useRef<VerticalCutRevealRef>(null)

    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start center", "end start"],
    });
    const scale= useTransform(scrollYProgress, [0, 1], [1, 0.4])
    const textY = useTransform(scale, [0.7, 0.4], [50, 0]);

    useEffect(() => {
        if (isInView) {
            textRef.current?.startAnimation()
        } else {
            textRef.current?.reset()
        }
    }, [isInView]);

    const roles = t('about.roles', { returnObjects: true }) as string[];

    return (

        <div id='about' className='flex flex-col items-center justify-start w-screen mt-5'>

            <div ref={ref} className='sticky top-0 items-center justify-center h-fit'>
                <VerticalCutReveal
                    splitBy="lines"
                    staggerDuration={0.02}
                    staggerFrom="first"
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 35,
                        delay: 0.2,
                    }}
                    containerClassName="flex flex-col items-center text-center text-white font-unbounded font-bold text-[7vw]"
                    ref={textRef}
                    autoStart={false}
                    //style={{ scale: scale as unknown as number }}
                >
                    {`${t('about.title')}\n${t('about.title2')}`}
                </VerticalCutReveal>
            </div>
            <motion.div className="relative w-[400px] md:w-[450px] mb-16"
                        style={{ y: textY }}>
                <div className="text-2xl font-inter text-left">
                    <div className="font-bold text-white leading-tight">
                        {t('about.t1')}
                        <TextLoop className="overflow-y-clip" /* анимация */>
                            {roles.map((role) => (
                                <span key={role}>{role}</span>
                            ))}
                        </TextLoop>
                        <br />
                        {t('about.t3')}
                    </div>

                    <p className="font-medium text-white-50 leading-none whitespace-pre-line">
                        &nbsp;
                        <br />
                        {t('about.t4')}
                        <br />
                        &nbsp;
                        <br />
                        {t('about.t5')}
                        <br />
                        &nbsp;
                        <br />
                    </p>

                    <p className="font-bold text-white leading-none">
                        {t('about.t6')}
                        <br />
                    </p>
                    <p className="font-medium text-white-50 leading-none">
                        {t('about.t7')}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
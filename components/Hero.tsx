"use client";

import React, { useRef } from "react";
import "@/app/[locale]/globals.css";
import { Particles } from "@/components/ui/Particles";
import { motion, useScroll, useTransform } from "framer-motion";

import { useTranslation } from 'react-i18next';

import { InteractiveHoverButton } from "@/components/ui/Interactive-Hover-Button";
import Image from "next/image";
import {TextLoop} from "@/components/ui/Text-Loop";
import {TextFloat} from "@/components/ui/Text-Float";

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const { t } = useTranslation();

    // Parallax effect for ImageHeroAnim
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <div
            id="hero"
            className="flex justify-center items-center overflow-hidden bg-black-bg w-screen h-screen relative"
            ref={ref}
        >
            {/*Particles*/}
            {/*<Particles*/}
            {/*    className="absolute inset-0"*/}
            {/*    quantity={100}*/}
            {/*    ease={80}*/}
            {/*    color="#fffaf0"*/}
            {/*/>*/}

            {/* Logo */}
            <TextFloat
                animationDuration={0.4}
                stagger={0.07}
                containerClassName="absolute top-[18%] left-1/2 -translate-x-[48vw] w-screen flex justify-center"
                idleDelay={3}
            >
                <svg
                    width="390"
                    height="49"
                    viewBox="0 0 390 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[90vw] h-auto mx-auto overflow-visible"
                >
                    <path
                        d="M61.7909 1.35402V47.3898H51.4441V11.6199L36.4418 47.3898H25.3491L10.3468 11.7253V47.3898H0V1.35402H16.7271L30.8638 36.2425L45.0638 1.35402"
                        fill="#F7F4F2"/>
                    <path
                        d="M100.131 1.35402L120.019 47.3898H108.465L104.625 38.1206H86.1888L90.0458 28.7915H100.757L93.0635 10.2325L77.7142 47.3898H66.1609L86.0492 1.35402"
                        fill="#F7F4F2"/>
                    <path
                        d="M160.076 42.0799C158.276 44.0242 156.052 45.5593 153.408 46.6837C150.764 47.8081 147.679 48.3719 144.154 48.3719C140.782 48.3719 137.631 47.8389 134.699 46.7752C131.767 45.7124 129.191 44.1472 126.968 42.0799C124.745 40.0126 123.02 37.4961 121.794 34.5305C120.569 31.5641 119.955 28.177 119.955 24.3715C119.955 20.566 120.577 17.1789 121.824 14.2133C123.07 11.2469 124.812 8.73041 127.054 6.66309C129.296 4.59653 131.921 3.03142 134.929 1.96776C137.936 0.90487 141.223 0.371887 144.787 0.371887C149.424 0.371887 153.456 1.15021 156.885 2.70455C160.316 4.25889 163.075 6.38698 165.163 9.08804C167.251 11.7891 168.583 14.8993 169.158 18.4179H158.179C157.795 16.699 156.99 15.2154 155.765 13.968C154.54 12.7205 152.996 11.7691 151.138 11.1138C149.28 10.4578 147.161 10.1317 144.787 10.1317C141.913 10.1317 139.441 10.6731 137.371 11.7583C135.302 12.8435 133.693 14.4394 132.543 16.546C131.394 18.6525 130.819 21.2613 130.819 24.3715C130.819 27.4825 131.422 30.122 132.63 32.2901C133.837 34.4582 135.561 36.0956 137.803 37.2C140.044 38.3052 142.679 38.8574 145.706 38.8574C148.656 38.8574 151.253 38.386 153.494 37.4461C155.736 36.5055 157.518 35.155 158.84 33.3945C159.148 32.9846 159.427 32.5554 159.673 32.1055H146.971V23.8808H169.56V47.3898H161.8L161.256 40.6879"
                        fill="#F7F4F2"/>
                    <path
                        d="M213.269 20.0753V28.6684H188.766L187.366 37.9368H215.108V47.3898H175.678L179.012 24.3715L175.678 1.35402H214.821V10.807H187.366L188.766 20.0753"
                        fill="#F7F4F2"/>
                    <path
                        d="M245.903 21.6097C247.933 21.6097 249.542 21.1075 250.731 20.1061C251.92 19.104 252.513 17.7011 252.513 15.9015C252.513 14.1018 251.92 12.6982 250.731 11.6968C249.542 10.6947 247.933 10.1925 245.903 10.1925H233.085V47.3898H222.221V1.35402H247.339C250.558 1.35402 253.375 1.96776 255.789 3.19523C258.203 4.42271 260.081 6.12164 261.422 8.28972C262.763 10.4578 263.434 12.9966 263.434 15.9015C263.434 18.7663 262.763 21.2828 261.422 23.4509C260.081 25.619 258.203 27.3071 255.789 28.5146C254.594 29.1137 253.301 29.5629 251.909 29.8628L264.813 47.3898H252.225L239.933 30.3258H239.931V21.6097"
                        fill="#F7F4F2"/>
                    <path
                        d="M293.485 37.9983C296.474 37.9983 299.043 37.4569 301.188 36.3717C303.332 35.2865 304.992 33.7214 306.16 31.6764C307.327 29.6306 307.913 27.1956 307.913 24.3715C307.913 21.5482 307.327 19.1124 306.16 17.0674C304.992 15.0224 303.332 13.4573 301.188 12.3721C299.043 11.2869 296.474 10.7454 293.485 10.7454C290.536 10.7454 287.986 11.2869 285.841 12.3721C283.696 13.4573 282.029 15.0224 280.84 17.0674C279.651 19.1124 279.058 21.5482 279.058 24.3715C279.058 27.1956 279.651 29.6306 280.84 31.6764C282.029 33.7214 283.696 35.2865 285.841 36.3717C287.986 37.4569 290.536 37.9983 293.485 37.9983ZM293.485 48.3719C288.427 48.3719 283.991 47.3698 280.179 45.364C276.366 43.3582 273.407 40.5563 271.298 36.9547C269.19 33.353 268.137 29.1591 268.137 24.3715C268.137 19.5839 269.19 15.3908 271.298 11.7891C273.407 8.18666 276.366 5.38562 280.179 3.37982C283.991 1.37402 288.427 0.371887 293.485 0.371887C298.543 0.371887 302.98 1.37402 306.792 3.37982C310.604 5.38562 313.574 8.18666 315.701 11.7891C317.828 15.3908 318.891 19.5839 318.891 24.3715C318.891 29.1591 317.828 33.353 315.701 36.9547C313.574 40.5563 310.604 43.3582 306.792 45.364C302.98 47.3698 298.543 48.3719 293.485 48.3719Z"
                        fill="#F7F4F2"/>
                    <path d="M359.986 1.35402H371.425L351.193 47.3898H338.95L318.716 1.35402H330.328L345.206 36.6278"
                          fill="#F7F4F2"/>
                    <path
                      d="M381.925 8.85402 m -7.5 0 a 7.5 7.5 0 1 0 15 0 a 7.5 7.5 0 1 0 -15 0"
                      fill="#C60303"/>
                </svg>
            </TextFloat>

            <div className="absolute left-1/2 top-1/2 w-[430px] h-[932px] -translate-x-1/2 -translate-y-1/2">
                {/* Taglines + description container */}
                <div
                    className="absolute left-[27px] top-[326px] h-[247px] w-[250px] flex flex-col gap-[70px] pt-[13px] pb-[13px]">
                    {/* Tagline */}
                    <div className="h-fit">
                        <p className="relative font-robotron text-white leading-none text-[19px]"
                           children={t.hero.section1.text1}/>
                        <TextLoop className="font-robotron text-white text-[19px] overflow-y-clip">
                            <span> звукорежиссер </span>
                            <span> композтор </span>
                        </TextLoop>
                        <p className="font-robotron text-white leading-normal text-[19px]">
                            //&nbsp;стаж&nbsp;5&nbsp;лет&nbsp;//
                        </p>
                    </div>

                    {/* Description */}
                    <div className="relative h-fit text-[15px] leading-[1.1] font-nunito text-white">
                        <p className="text-white font-bold">
                            Работал с такими звездами, как
                        </p>
                        <p className="italic text-white-50">
                            Полина Гагарина, Шура, Лариса<br/>
                            Долина, Ани Лорак, Юлианна<br/>
                            Караулова, Катя Лель, Илья<br/>
                            Любимов и другими.
                        </p>
                    </div>
                </div>

                {/* Small curved line */}
                <svg
                    width="64"
                    height="57"
                    viewBox="0 0 64 57"
                    fill="none"
                    className="absolute left-[51px] top-[419px]"
                >
                    <path
                        d="M1.76 1.60999C8.77695 1.60998 14.7051 1.60997 21.1335 4.48571C24.4418 5.96568 27.4671 7.92406 29.4749 11.3624C33.1023 17.5743 30.3624 25.1416 28.346 32.6129C27.0034 37.5879 29.1905 42.3937 31.4827 45.832C36.653 51.5971 41.38 54.4794 47.3861 55.3411C51.1174 55.6341 57.2511 55.4786 62.5248 55.4786"
                        stroke="currentColor"
                        className="text-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Long curved line leading to button */}
                <svg
                    width="152"
                    height="111"
                    viewBox="0 0 154 114"
                    fill="none"
                    className="absolute left-[94px] top-[577px]"
                >
                    <path
                        d="M1.43521 1.34068C10.3095 1.34067 27.0404 0.536449 44.9168 4.24053C54.0262 6.12806 61.3201 11.6673 66.5201 19.0941C75.9147 32.5116 68.8188 48.857 63.5965 64.9949C60.1192 75.7406 65.7836 86.1212 71.7201 93.5479C85.1106 106 99.9741 109.723 115.529 111.584C125.193 112.217 138.45 112.217 152.108 112.217"
                        stroke="currentColor"
                        className="text-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                </svg>

                {/* Contacts button */}
                <div className="absolute left-[242px] top-[660px]  items-center justify-center">
                    <InteractiveHoverButton className="w-full h-full">
                        Контакты
                    </InteractiveHoverButton>
                </div>

                {/* HERO IMAGE WITH PARALLAX */}
                <motion.img
                    style={{y: imageY}}
                    src="/hero/fg_hero.png"
                    alt="Hero"
                    initial={{x: 150, opacity: 0, scale: 0.7}}
                    animate={{x: 0, opacity: 1, scale: 1}}
                    transition={{
                        x: {delay: 1, duration: 1.5, type: 'spring'},
                        scale: {delay: 1, duration: 1.5, type: 'spring'},
                        opacity: {delay: 1.2, duration: 0.4},
                    }}
                    className="absolute left-[215px] top-[308px] w-[296px] h-[312px] object-cover rounded-[96px]"
                />
            </div>
        </div>
    );
};

export default Hero;
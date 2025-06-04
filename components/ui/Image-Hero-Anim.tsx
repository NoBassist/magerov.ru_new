"use client"

import React from 'react'
import {motion} from "motion/react";

const ImageHeroAnim = () => {
    return (
    <div className='absolute translate-y-[15%] -translate-x-[20%] md:-translate-x-[53%] md:translate-y-[4%] w-fit h-fit z-30'>
        <motion.img
            src="/hero/fg_hero.png"
            alt="Background"
            initial={{x: 150, opacity: 0, scale: 0.7}} // Начальное состояние
            animate={{x: 0, opacity: 1, scale: 1}}   // Конечное состояние
            transition={{        x: { delay: 1, duration: 1.5, type: 'spring' },
                scale: { delay: 1, duration: 1.5, type: 'spring' },
                opacity: { delay: 1.2, duration: 0.4 }}}// Параметры перехода
            className='w-[60vw] h-[70vw] md:w-[30vw] md:h-[40vw] object-cover rounded-[20vw] md:rounded-[10vw]'
        />
    </div>
    )
}
export default ImageHeroAnim

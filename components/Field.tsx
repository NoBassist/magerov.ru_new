import React from 'react'
import { CardSwiper } from "@/components/ui/Card-Swiper";
import { getCards } from "@/lib/getCards";
import {VelocityScroll} from "@/components/ui/Velocity-Scroll";

const Field = () => {
    // Fetch cards data
    const cards = getCards();

    return (
        <div id='field' className='flex flex-col items-center justify-start h-screen w-screen'>
            <VelocityScroll
                className="font-unbounded text-center font-semibold tracking-normal text-black dark:text-white text-5xl md:text-7xl leading-none max-w-screen-lg"
                default_velocity={-4}
                text={"ПЛОЩАДКА  //  "}
            />
            <CardSwiper cards={cards} />
        </div>
    )
}
export default Field
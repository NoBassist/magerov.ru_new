import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

export const InteractiveHoverButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
    // Получаем экземпляр Lenis через хук
    const lenis = useLenis((lenis) =>{})

    // Функция плавного скролла к секции на новой Lenis (>= 1.3)
    const scrollToSection = (sectionId: string) => {
        // В новой версии достаточно передать селектор‑строку;
        // DOM‑элемент искать не требуется.
        lenis?.scrollTo(`#${sectionId}`, {
            offset: 0,
            duration: 1.2, // если нужен «lerp», уберите duration
        });
    };
    return (
        <button
            ref={ref}
            className={cn(
                "relative overflow-hidden rounded-full group px-6 py-4 border-[2px] border-white min-w-[120px] cursor-pointer transition-all duration-300",
                className,
            )}
            onClick={() => scrollToSection("contacts")}
            {...props}
        >
            {/* Первоначальный контент кнопки */}
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:scale-[100.8]"></div>
                <span
                    className="inline-block text-white font-unbounded font-normal transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
                >
          {children}
        </span>
            </div>

            {/* Контент, который появляется при наведении */}
            <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                <span className="font-unbounded font-normal">{children}</span>
                <ArrowRight />
            </div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
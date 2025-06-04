'use client'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useMusicTracks } from '@/lib/useMusicTracks'
import {VelocityScroll} from "@/components/ui/Velocity-Scroll";
import Lenis from '@studio-freight/lenis'

const Music = () => {
    const tracks = useMusicTracks()
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const [timeLeft, setTimeLeft] = useState('0:00')
    const scrollTitle = useMemo(() => (
        <VelocityScroll
            className="font-unbounded text-center font-semibold tracking-normal text-black dark:text-white text-5xl md:text-7xl leading-none max-w-screen-lg"
            default_velocity={4}
            text={"МУЗЫКА  //  "}
        />
    ), [])

    const current = tracks[currentTrackIndex]

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateProgress = () => {
            if (!audio.duration) return
            const progress = (audio.currentTime / audio.duration) * 100
            if (progressRef.current) progressRef.current.style.width = `${progress}%`
            const remaining = audio.duration - audio.currentTime
            setTimeLeft(formatTime(remaining))
        }

        const handleEnded = () => {
            const next = (currentTrackIndex + 1) % tracks.length
            setCurrentTrackIndex(next)
            setTimeout(() => audioRef.current?.play(), 100)
        }

        const updateInitialTime = () => {
            if (audio.duration && isFinite(audio.duration)) {
                setTimeLeft(formatTime(audio.duration))
            }
        }

        audio.addEventListener('loadedmetadata', updateInitialTime)
        audio.addEventListener('timeupdate', updateProgress)
        audio.addEventListener('ended', handleEnded)

        const progressContainer = document.getElementById('progress-container')
        if (progressContainer) {
            progressContainer.onclick = (e) => {
                const rect = progressContainer.getBoundingClientRect()
                const x = e.clientX - rect.left
                const percent = x / rect.width
                audio.currentTime = percent * audio.duration
            }
        }

        return () => {
            audio.removeEventListener('loadedmetadata', updateInitialTime)
            audio.removeEventListener('timeupdate', updateProgress)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [currentTrackIndex, tracks])

    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const scrollContainer = document.querySelector('.playlist-scroll') as HTMLElement
        if (!scrollContainer) return

        const lenis = new Lenis({
            wrapper: scrollContainer,
            content: scrollContainer.firstElementChild as HTMLElement,
            smoothWheel: true,
            gestureOrientation: 'vertical',
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5
        })

        lenisRef.current = lenis

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    const formatTime = (seconds: number) =>
        `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play().then(() => setIsPlaying(true)).catch(() => {})
        } else {
            audio.pause()
            setIsPlaying(false)
        }
    }

    const playTrack = (index: number) => {
        setCurrentTrackIndex(index)
        setTimeout(() => {
            audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {})
        }, 100)
    }

    return (
        <div id="music" className="flex flex-col items-center justify-center mt-16 min-h-screen w-full font-unbounded">
            {scrollTitle}
            {current && (
                <div
                  className="w-full mt-16 max-w-[540px] h-auto sm:h-[620px] flex flex-col justify-between bg-transparent rounded-xl p-5 gap-4">
                  <div
                    className="bg-[#e0e0e0] rounded-[20px] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] p-5 flex flex-row items-center gap-4">
                    <div className="flex-shrink-0 w-[22%] text-center">
                      <div
                        className="aspect-square rounded-full flex items-center justify-center w-full max-w-[90px] mx-auto">
                        <motion.button
                          onClick={togglePlay}
                          whileTap={{scale: 0.9}}
                          className={`aspect-square w-[90%] rounded-full flex items-center justify-center bg-[#e0e0e0] transition-all duration-300 ${
                            isPlaying
                              ? 'shadow-inner'
                              : 'shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]'
                          }`}
                        >
                          <svg viewBox="0 0 24 24"
                               className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 ${isPlaying ? 'fill-red' : 'fill-[#bbb]'}`}>
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                    <div className="flex-grow text-left w-[78%]">
                      <div
                        className="text-sm sm:text-base text-[#bb0000] font-unbounded font-bold">{current.title}</div>
                      <div
                        className="text-xs sm:text-sm text-[#555] font-unbounded font-normal">{current.artist}</div>
                      <div className="text-right text-xs text-[#555] font-unbounded mt-1">
                        {timeLeft}
                      </div>
                      <div
                        className="w-full bg-[#e0e0e0] rounded-md mt-3 h-[10px] shadow-inner cursor-pointer relative"
                        id="progress-container">
                        <div ref={progressRef}
                             className="absolute top-0 left-0 h-full bg-[#BB0000] rounded-md"/>
                      </div>
                    </div>
                  </div>

                  <div
                    data-lenis-prevent="true"
                    className="bg-[#e0e0e0] rounded-[20px] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]
               p-5 h-[460px] max-h-[460px] overflow-y-auto overscroll-y-contain w-full playlist-scroll
               scrollbar-none"
                  >
                    <ul className="space-y-5">
                      {tracks.map((track, i) => (
                        <li key={i} onClick={() => playTrack(i)}
                            className="flex justify-between p-4 rounded-xl shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:bg-gray-100 cursor-pointer">
                          <div className="flex flex-col">
                            <span className="text-sm text-black-50 font-unbounded font-bold">{track.title}</span>
                            <span className="text-xs text-[#555] font-unbounded font-normal">{track.artist}</span>
                          </div>
                          <span className="text-xs text-[#555]">{track.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <audio
                    ref={audioRef}
                    src={current.src}
                    preload="metadata"
                    controls={false}
                    className="hidden"
                    playsInline
                  />
                </div>
            )}
        </div>
    )
}

export default Music
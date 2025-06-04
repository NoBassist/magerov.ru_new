import { useEffect, useState } from 'react'

export type Track = {
    title: string
    artist: string
    src: string
    duration: string
}

export const useMusicTracks = () => {
    const [tracks, setTracks] = useState<Track[]>([])

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const res = await fetch('/api/tracks')
                const data = await res.json()
                setTracks(data)
            } catch (err) {
                console.error('Ошибка загрузки треков:', err)
            }
        }
        fetchTracks()
    }, [])

    return tracks
}
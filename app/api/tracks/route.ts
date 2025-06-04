export const dynamic = 'force-dynamic'
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { parseFile } from 'music-metadata'

export async function GET() {
    const musicDir = path.join(process.cwd(), 'public', 'music')
    const files = fs.readdirSync(musicDir)

    const tracks = await Promise.all(files
        .filter(file => file.endsWith('.mp3') || file.endsWith('.wav'))
        .map(async (file) => {
            const fullPath = path.join(musicDir, file)
            const metadata = await parseFile(fullPath)
            const durationSec = metadata.format.duration || 0
            const duration = formatTime(durationSec)

            const name = decodeURIComponent(file)
                .replace(/^[0-9]+\./, '')
                .replace(/\.mp3$/i, '')
                .replace(/\.wav$/i, '')
                .trim()

            const artistMatch = name.match(/\(([^)]+)\)/)

            return {
                title: name.replace(/\s*\(.*?\)\s*/g, ''),
                artist: artistMatch ? artistMatch[1] : '',
                src: `/music/${file}`,
                duration
            }
        }))

    return NextResponse.json(tracks)
}

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}
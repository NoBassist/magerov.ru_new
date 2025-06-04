'use client'

import { ReactLenis } from 'lenis/react'
import React, { ReactNode } from 'react'

/**
 * Global Lenis provider.
 *  - `smoothWheel` включает плавность для колёсика мыши.
 *  - Плей‑листы и другие вложенные скроллеры работают,
 *    если на них есть `data‑lenis‑scroll`.
 */
function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: true
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
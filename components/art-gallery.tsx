"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const ART_IMAGES = [
    "/arts/Frame 2087326954.png",
    "/arts/7IhsjX-qIfEi11ONcjkYx_TFM7nPaT.png",
    "/arts/ANGb2UyyL8CNpKx-jS9JY_pZir6pAo.png",
    "/arts/tmpo01owe2f.png",
    "/arts/atyrfwbkhxrmt0cwf4raw1jqh4.webp",
    "/arts/3hTC5wXk5kBPCrkztwwE9_rKCLaHlG.webp",
    "/arts/accTtNO0sVHX0-VEECzup_aA1kBlC6.webp",
    "/arts/5twxv9xwq9rmt0cwd4wryqfkfg.png",
    "/arts/2wnyq7wj0hrmw0cwdsnaqtr4d0.jpg",
    "/arts/3t3dxej9jxrmy0cwd4y9t8hkgr.jpg",
    "/arts/5k5kfcgft9rmr0cwsw79qj5xn4.jpg",
    "/arts/vg0fggzpndrmr0cwtm49kdtgx0.jpg",
    "/arts/tmpjin1u6ku.jpg",
    "/arts/tIDaRfU8zdBzWN6IqgihP_NdlRqSIp.jpg",
    "/arts/3zp88d3x3nrmy0cwj8ftwd9k3m.jpeg",
    "/arts/tmpcr_hrg4a.jpeg",
    "/arts/tmpa2ymwbpi (1).jpeg",
    "/arts/tmpn3ip8vku.png",
]

export default function ArtGallery() {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const handleSelect = useCallback((src: string) => {
        setSelectedId((prev) => (prev === src ? null : src))
    }, [])

    const handleClose = useCallback(() => setSelectedId(null), [])

    useEffect(() => {
        if (!selectedId) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedId(null)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [selectedId])

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [selectedId])

    return (
        <div className="relative">
            <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 *:mb-3">
                {ART_IMAGES.map((src) => (
                    <motion.div
                        key={src}
                        layoutId={src}
                        onClick={() => handleSelect(src)}
                        className="group relative cursor-pointer overflow-hidden break-inside-avoid rounded-md"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        <Image
                            src={src}
                            alt="art piece"
                            width={600}
                            height={800}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="block h-auto w-full object-cover transition-[filter] duration-300 group-hover:brightness-110"
                            style={{ width: "100%", height: "auto" }}
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-primary/40" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        />
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
                            onClick={handleClose}
                        >
                            <motion.div
                                layoutId={selectedId}
                                className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            >
                                <Image
                                    src={selectedId}
                                    alt="art piece enlarged"
                                    width={1400}
                                    height={1400}
                                    sizes="90vw"
                                    className="block h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
                                    priority
                                />
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 transition hover:bg-black/80 hover:text-white"
                                    aria-label="Close"
                                >
                                    &times;
                                </button>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

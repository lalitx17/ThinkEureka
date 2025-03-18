"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import RatingModal from "@/components/rating-modal"
import { cn } from "@/lib/utils"

interface AnimationPlayerProps {
  animationId: string
  animationTitle: string
}

export default function AnimationPlayer({ animationId, animationTitle }: AnimationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(100)
  const [liked, setLiked] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [hasRated, setHasRated] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)

  // Simulate animation playback
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    let startTime: number | null = null
    const animationDuration = 10000 // 10 seconds

    const renderFrame = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      if (!isPlaying) return

      const elapsed = timestamp - startTime
      const normalizedProgress = Math.min(elapsed / animationDuration, 1)
      setProgress(normalizedProgress * 100)

      // Check if animation has completed
      if (normalizedProgress >= 1 && !hasRated) {
        setIsPlaying(false)
        setShowRatingModal(true)
        return
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#111"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Example animation for quantum superposition
      // This is a simplified visualization
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4

      // Draw orbits
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw nucleus
      ctx.fillStyle = "#6366f1"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2)
      ctx.fill()

      // Draw electron in superposition (multiple positions simultaneously)
      const positions = 8
      const opacity = 0.7

      for (let i = 0; i < positions; i++) {
        const angle = (i / positions) * Math.PI * 2 + normalizedProgress * Math.PI * 4
        const x = centerX + Math.cos(angle) * maxRadius
        const y = centerY + Math.sin(angle) * maxRadius

        ctx.fillStyle = `rgba(99, 102, 241, ${opacity / positions})`
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()

        // Draw probability wave
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity / (positions * 2)})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()
      }

      // Draw probability cloud
      ctx.fillStyle = `rgba(99, 102, 241, 0.1)`
      ctx.beginPath()
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2)
      ctx.fill()

      if (normalizedProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(renderFrame)
      } else if (!hasRated) {
        setIsPlaying(false)
        setShowRatingModal(true)
        startTime = null
      }
    }

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(renderFrame)
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isPlaying, animationId, hasRated])

  useEffect(() => {
    setDuration(100) // In a real app, this would be the actual duration

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [animationId])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
    // In a real implementation, you would seek to this position
  }

  const toggleLike = () => {
    setLiked(!liked)
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  const handleRatingSubmit = (rating: number) => {
    console.log(`Submitted rating: ${rating}/10 for animation ${animationId}`)
    setHasRated(true)
    // In a real app, you would send this rating to your backend
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentTime = (progress / 100) * duration

  return (
    <>
      <div className="relative bg-black">
        <canvas ref={canvasRef} className="aspect-video w-full" />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-2">
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="h-1"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleMute}>
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <span className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleLike}>
              <Heart className={cn("h-4 w-4", liked && "fill-red-500 text-red-500")} />
            </Button>
          </div>
        </div>
      </div>

      <RatingModal
        animationId={animationId}
        animationTitle={animationTitle}
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRatingSubmit}
      />
    </>
  )
}


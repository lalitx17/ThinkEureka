import React, { useState, useEffect, useRef } from "react";
import * as Babel from "@babel/standalone";
import { motion, useMotionValue, useDragControls } from "framer-motion";
import { Heart, Pause, Play, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingModal from "@/components/rating-modal";
import { cn } from "@/lib/utils";
import * as THREE from "three";

interface AnimationPlayerProps {
  animationId: string;
  animationTitle: string;
  animationCode: string;
}

// This function transpiles the animation code dynamically
const transpileAndGetComponent = (
  animationCode: string,
): React.FC<{ isPlaying: boolean }> | null => {
  try {
    // Modify the transpiled code to explicitly import Framer Motion

    const transpiledCode = Babel.transform(animationCode, {
      presets: ["react", "env"],
    }).code;

    console.log("transpiled code: ", transpiledCode);

    let exports: { [key: string]: any } = {};
    // Using a dynamic function to evaluate the transpiled code
    const result = new Function(
      "exports",
      "React",
      "useState",
      "useEffect",
      "useRef",
      "motion",
      transpiledCode!,
    )(exports, React, useState, useEffect, useRef, motion);

    // Try to find the component in different ways
    if (exports.default) {
      return exports.default;
    }

    // If no default export, try to find a named export that looks like a component
    const possibleComponents = Object.values(exports).filter(
      (exp) =>
        typeof exp === "function" && exp.prototype instanceof React.Component,
    );

    if (possibleComponents.length > 0) {
      return possibleComponents[0];
    }

    // If still no component found, look for any function that returns JSX
    const componentFunctions = Object.values(exports).filter(
      (exp) => typeof exp === "function" && exp.toString().includes("return ("),
    );

    if (componentFunctions.length > 0) {
      return componentFunctions[0];
    }

    return null;
  } catch (error) {
    console.error("Error transpiling component:", error);
    return null;
  }
};

export default function AnimationPlayer({
  animationId,
  animationTitle,
  animationCode,
}: AnimationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [DynamicComponent, setDynamicComponent] = useState<React.ComponentType<{
    isPlaying: boolean;
  }> | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("animation code: ", animationCode);

  useEffect(() => {
    const component = transpileAndGetComponent(animationCode);
    if (!component) {
      setError("Failed to load animation");
    }
    setDynamicComponent(() => component);
  }, [animationCode]);

  console.log("dynamic component :", DynamicComponent);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleRatingSubmit = (rating: number) => {
    console.log(`Submitted rating: ${rating}/10 for animation ${animationId}`);
    setHasRated(true);
    setShowRatingModal(false);
  };

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden bg-orange-50 transition-all duration-300 ease-in-out",
          isFullScreen
            ? "fixed inset-0 z-50 w-screen h-screen"
            : "aspect-video w-full",
        )}
      >
        {error ? (
          <div className="flex h-full w-full items-center justify-center bg-red-100 p-4 text-red-600">
            <div className="max-w-md text-center">
              <h3 className="mb-2 text-lg font-semibold">Animation Error</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <div className={cn("h-full w-full", !isPlaying && "opacity-50")}>
            {DynamicComponent && <DynamicComponent isPlaying={isPlaying} />}
          </div>
        )}

        {!isPlaying && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              <Play className="mr-2 h-5 w-5" />
              Resume Animation
            </Button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={togglePlay}
                disabled={!!error}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              <span className="text-xs text-white">
                {error
                  ? "Animation error"
                  : animationComplete
                    ? "Animation complete"
                    : "Interactive animation"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleFullScreen}
                disabled={!!error}
              >
                {isFullScreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleLike}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    liked && "fill-red-500 text-red-500",
                  )}
                />
              </Button>
            </div>
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
  );
}

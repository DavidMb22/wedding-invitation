import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

import weddingSong from "../assets/music/wedding-song.mp3";

export default function MusicPlayer() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play music:", error);
      }
    }
  }

  function handleProgress(event) {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setProgress(newTime);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="
        fixed
        bottom-5
        right-5
        z-[100]
        w-[260px]
        border
        border-black/10
        bg-[#f5f2eb]/95
        p-4
        backdrop-blur-md
        sm:bottom-7
        sm:right-7
      "
    >
      <audio ref={audioRef} src={weddingSong} preload="metadata" />

      <div className="flex items-center gap-4">

        {/* Play button */}
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#0b0b0b]
            text-[#f5f2eb]
            transition
            hover:bg-black/80
          "
        >
          {isPlaying ? (
            <Pause size={13} strokeWidth={1.5} />
          ) : (
            <Play
              size={13}
              strokeWidth={1.5}
              className="ml-[1px]"
            />
          )}
        </button>

        {/* Song information */}
        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">
            <Volume2
              size={11}
              strokeWidth={1}
              className="shrink-0 text-black/40"
            />

            <p className="truncate text-[8px] font-medium uppercase tracking-[0.22em] text-black/60">
              Our Wedding Song
            </p>
          </div>

          <p className="mt-1 truncate font-serif text-[12px] text-black/50">
            Lionel & Aline
          </p>

          {/* Progress */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={progress}
            onChange={handleProgress}
            className="mt-3 h-[2px] w-full cursor-pointer accent-black"
          />
        </div>
      </div>
    </motion.div>
  );
}
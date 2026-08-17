import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const particles = Array.from({ length: 70 }, (_, index) => ({
    id: index,
    left: `${(index * 47.3) % 100}%`,
    top: `${(index * 71.7) % 100}%`,
    size: index % 5 === 0 ? 3 : 1.5,
    duration: 3 + ((index * 13) % 40) / 10,
    delay: ((index * 17) % 30) / 10,
}));

const confetti = Array.from({ length: 45 }, (_, index) => ({
    id: index,
    x: ((index * 83) % 100) - 50,
    y: -120 - ((index * 37) % 160),
    rotate: ((index * 67) % 720) - 360,
    delay: ((index * 11) % 10) / 100,
    size: 3 + (index % 4),
}));

export default function InvitationOpening({ onOpen }) {
    const [hovered, setHovered] = useState(false);
    const [opening, setOpening] = useState(false);

    useEffect(() => {
        document.body.style.overflow = opening ? "hidden" : "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [opening]);

    function handleOpen() {
        if (opening) return;

        setOpening(true);

        setTimeout(() => {
            onOpen();
        }, 1500);
    }

    return (
        <AnimatePresence>
            {!opening && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.03,
                        transition: {
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    }}
                    className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d10]"
                >
                    {/* BACKGROUND */}

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.055),_transparent_42%)]" />

                    {/* Subtle moving stars */}
                    <div className="pointer-events-none absolute inset-0">
                        {particles.map((particle) => (
                            <motion.span
                                key={particle.id}
                                className="absolute rounded-full bg-white"
                                style={{
                                    left: particle.left,
                                    top: particle.top,
                                    width: particle.size,
                                    height: particle.size,
                                }}
                                animate={{
                                    opacity: [0.08, 0.55, 0.08],
                                    scale: [0.8, 1.3, 0.8],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    delay: particle.delay,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Very subtle vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.48)_100%)]" />

                    {/* MAIN CONTENT */}
                    <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6">

                        {/* You are invited */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                            }}
                            className="mb-12 text-center text-[9px] font-medium uppercase tracking-[0.58em] text-white/65 sm:mb-14 sm:text-[10px]"
                        >
                            You Are Invited
                        </motion.p>

                        {/* ENVELOPE AREA */}
                        <div
                            className="relative h-[245px] w-full max-w-[540px] cursor-pointer sm:h-[305px]"
                            style={{ perspective: "1200px" }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onClick={handleOpen}
                        >
                            {/* Invitation card behind envelope */}

                            <motion.div
                                className="absolute left-1/2 top-0 z-[5] h-[92%] w-[70%] -translate-x-1/2 bg-[#f7f5ef] shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
                                animate={{
                                    y: hovered ? -32 : 8,
                                    scale: hovered ? 1.01 : 0.98,
                                }}
                                transition={{
                                    duration: 0.55,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <div className="flex h-full items-center justify-center border border-black/10">
                                    <div className="text-center">
                                        <p className="font-serif text-[26px] font-light text-black/85 sm:text-[32px]">
                                            Lionel
                                        </p>

                                        <p className="my-1 font-serif text-[18px] italic text-[#b5ab9c] sm:text-[21px]">
                                            &
                                        </p>

                                        <p className="font-serif text-[26px] font-light text-black/85 sm:text-[32px]">
                                            Aline
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* ENVELOPE */}
                            <motion.div
                                className="absolute bottom-0 left-1/2 z-20 h-[82%] w-full -translate-x-1/2"
                                animate={{
                                    y: hovered ? 4 : 0,
                                    scale: hovered ? 1.01 : 1,
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {/* Envelope body */}
                                <div className="absolute inset-0 overflow-hidden border border-white/[0.20] bg-[#151519] shadow-[0_25px_80px_rgba(0,0,0,0.5)]">

                                    {/* Left fold */}
                                    <div
                                        className="absolute inset-0 z-[3] border-r border-white/[0.12]"
                                        style={{
                                            clipPath: "polygon(0 0, 50% 50%, 0 100%)",
                                            background: "#131317",
                                        }}
                                    />

                                    {/* Right fold */}
                                    <div
                                        className="absolute inset-0 z-[3] border-l border-white/[0.12]"
                                        style={{
                                            clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
                                            background: "#131317",
                                        }}
                                    />

                                    {/* Bottom fold */}
                                    <div
                                        className="absolute inset-0 z-[4] border-t border-white/[0.12]"
                                        style={{
                                            clipPath: "polygon(0 100%, 50% 48%, 100% 100%)",
                                            background: "#1a1a1e",
                                        }}
                                    />

                                    {/* Top flap */}
                                    <motion.div
                                        className="absolute left-0 top-0 z-[25] h-[57%] w-full origin-top border-b border-white/[0.16] bg-[#17171b]"
                                        style={{
                                            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                                            transformStyle: "preserve-3d",
                                        }}
                                        animate={{
                                            rotateX: opening ? -178 : 0,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    />

                                    {/* Envelope inner darkness */}
                                    <div className="absolute left-1/2 top-1/2 z-[1] h-[40%] w-[45%] -translate-x-1/2 -translate-y-1/2 bg-black/20 blur-xl" />

                                    {/* Wax seal */}
                                    <motion.div
                                        className="absolute left-1/2 top-1/2 z-[40] flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#d5d5d5] bg-[#eeeeee] text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)] sm:h-[72px] sm:w-[72px]"
                                        animate={{
                                            scale: hovered ? 1.045 : 1,
                                            opacity: opening ? 0 : 1,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                        }}
                                    >
                                        <span className="font-serif text-[17px] tracking-[-0.12em] sm:text-[19px]">
                                            L<span className="italic">&</span>A
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Hover glow */}
                            <motion.div
                                className="pointer-events-none absolute inset-[-8px] z-50 rounded-sm border border-white/10"
                                animate={{
                                    opacity: hovered ? 1 : 0,
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>

                        {/* Click instruction */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.35,
                            }}
                            className="mt-14 text-center sm:mt-16"
                        >
                            <motion.p
                                className="text-[9px] font-medium uppercase tracking-[0.48em] text-white/70 sm:text-[10px]"
                            >
                                — Click to open your invitation —
                            </motion.p>

                            <motion.div
                                animate={{
                                    width: hovered ? 72 : 42,
                                    opacity: hovered ? 0.6 : 0.3,
                                }}
                                transition={{ duration: 0.4 }}
                                className="mx-auto mt-5 h-px bg-white"
                            />
                        </motion.div>

                        {/* Couple */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.7,
                            }}
                            className="mt-8 font-serif text-[12px] italic tracking-wide text-white/25"
                        >
                            Lionel & Aline
                        </motion.p>
                    </div>

                    {/* CONFETTI ON OPEN */}
                    {opening && (
                        <div className="pointer-events-none absolute inset-0 z-[300] flex items-center justify-center">
                            {confetti.map((piece) => (
                                <motion.span
                                    key={piece.id}
                                    className="absolute rounded-[1px]"
                                    style={{
                                        width: piece.size,
                                        height: piece.size * 2.2,
                                        background:
                                            piece.id % 4 === 0
                                                ? "#f5f2eb"
                                                : piece.id % 4 === 1
                                                    ? "#b7ad9d"
                                                    : piece.id % 4 === 2
                                                        ? "#77736b"
                                                        : "#d7d2c8",
                                    }}
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        opacity: 1,
                                        rotate: 0,
                                    }}
                                    animate={{
                                        x: piece.x * 3.5,
                                        y: piece.y * 3.5,
                                        rotate: piece.rotate,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 1.3,
                                        delay: piece.delay,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
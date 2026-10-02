import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa6';

const SWIPE_THRESHOLD_PX = 40;

interface Aviso {
    id: string;
    titulo: string;
}

// Sem endpoint de avisos ainda — dados mockados.
const AVISOS_MOCK: Aviso[] = [
    { id: '1', titulo: 'Aviso da Assistência Estudantil' },
    { id: '2', titulo: 'Aviso da Assistência Estudantil' },
    { id: '3', titulo: 'Aviso da Assistência Estudantil' },
];

const AUTO_SLIDE_MS = 8000;

export function AvisosCarrossel() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (paused) return;

        timerRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % AVISOS_MOCK.length);
        }, AUTO_SLIDE_MS);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [paused]);

    const goTo = (newIndex: number) => {
        setIndex((newIndex + AVISOS_MOCK.length) % AVISOS_MOCK.length);
    };

    const touchStartX = useRef<number | null>(null);

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
        setPaused(true);
    };

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;

        if (deltaX > SWIPE_THRESHOLD_PX) {
            goTo(index - 1);
        } else if (deltaX < -SWIPE_THRESHOLD_PX) {
            goTo(index + 1);
        }

        touchStartX.current = null;
        setPaused(false);
    };

    return (
        <div
            className="w-full touch-pan-y"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="relative w-full h-[350px] rounded-[8px] overflow-hidden">
                <div className="bg-[#ddd4d4] w-full h-full flex flex-col items-center justify-center gap-2 text-black/70">
                    <FaImage size={48} />
                    <p className="text-sm">{AVISOS_MOCK[index].titulo}</p>
                </div>

                <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    aria-label="Aviso anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2"
                >
                    <FaChevronLeft />
                </button>
                <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    aria-label="Próximo aviso"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2"
                >
                    <FaChevronRight />
                </button>
            </div>

            <div className="flex items-center justify-center gap-[7px] h-[30px]">
                {AVISOS_MOCK.map((aviso, i) => (
                    <button
                        key={aviso.id}
                        type="button"
                        aria-label={`Ir para aviso ${i + 1}`}
                        onClick={() => goTo(i)}
                        className={`rounded-full ${i === index ? 'w-[15px] h-[15px] bg-[#1058cc]' : 'w-[13px] h-[13px] bg-[#d9d9d9]'}`}
                    />
                ))}
            </div>
        </div>
    );
}

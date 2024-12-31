import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 20;
        const tiltY = (relativeX - 0.5) * -20;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
        <div className="relative size-full">
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-center"
            />
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>

                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                    >
                        {/* Radial gradient hover effect */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features = () => (
    <section className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32">
                <p className="font-circular-web text-lg text-blue-50">
                    Into the New WEB ERA
                </p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                    Immerse yourself in a rich and ever-expanding universe where a vibrant
                    array of tech converge into an interconnected overlay experience
                    on your business.
                </p>
            </div>

            <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                <BentoCard
                    src="./videos/JK-1.mp4"
                    title={
                        <>
                            <b>CROSS PLATFORM DEVELOPERS</b>
                        </>
                    }
                    description=" turning your web experience across the internet's best you can have."
                    isComingSoon
                />
            </BentoTilt>

            <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                    <BentoCard
                        src="./videos/JK-3.mp4"
                        title={
                            <>
                                <b>ARCHIT</b>
                            </>
                        }
                        description="Building seamless digital experiences, one line of code at a time – Archit, your web development architect."
                        isComingSoon
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                    <BentoCard
                        src="./videos/JK-4.mp4"
                        title={
                            <>
                                <b>CHAITANYA</b>
                            </>
                        }
                        description="Hi, I'm Chaitanya – crafting seamless, user-friendly web experiences that blend creativity with functionality. Let’s bring your vision to life!"
                        isComingSoon
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                    <BentoCard
                        src="./videos/JK-5.mp4"
                        title={
                            <>
                                <b>HIRE US</b>
                            </>
                        }
                        description=" To Showcasing a blend of passion, skill, and dedication in every project. Let’s build something extraordinary together."
                        isComingSoon
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <img src="./img/DS.jpg" alt="" />
                    {/* <div className="flex size-full flex-col justify-between bg-violet-300 p-5 object-cover">
                        {/* <h1 className="bento-title special-font max-w-64 text-black">
                            M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                        </h1> */}
                    {/* </div> */}
                    <p className="md:text-3xl absolute z-10 right-[2rem] bottom-[2rem] font-bold text-white">MORE <br />COMING <br />SOON</p>
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <video
                        src="./videos/JK-6.mp4"
                        loop
                        muted
                        autoPlay
                        className="size-full object-cover object-center"
                    />
                </BentoTilt>
            </div>
        </div>
    </section >
);

export default Features;

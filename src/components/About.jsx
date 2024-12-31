import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        });

        clipAnimation.to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
        });
    });

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <p className="font-general text-sm uppercase md:text-[10px]">
                    Welcome to HACK & HUE
                </p>

                <AnimatedTitle
                    title="Disc<b>o</b>ver the world's <br /> latest <b>W</b>ebtech"
                    containerClass="mt-5 !text-black text-center"
                />

                <div className="about-subtext">
                    <p>The Game of Games begins—your web, now an epic site</p>
                    <p className="text-gray-500">
                        "Crafting seamless, user-friendly web experiences that combine creativity and functionality. Explore a journey of innovative designs that transform ideas into impactful digital solutions."
                    </p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image w-[96%]">
                    <img
                        src="img/kakashi.jpg"
                        alt="Background"
                        className="absolute left-0 top-0 size-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;

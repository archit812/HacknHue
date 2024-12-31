import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);

function Hero() {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, sethasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setloadedVideos] = useState(0);

    const nextVideoRef = useRef(null);

    const totalVideos = 4;
    const upcomingVideoIndex = (currentIndex % 7) + 1;

    const handleMiniVDClick = () => {
        sethasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    }

    const getVideoSrc = (path) => {
        return `./videos/JK-${path}.mp4`;
    }

    const handleVideoLoadFunc = () => {
        setloadedVideos((prev) => prev + 1);
    }

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos])

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' })
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut",
                onStart: () => nextVideoRef.current.play()
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                duration: 1.5,
                scale: 0,
                ease: 'power1.inOut'
            })
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true })

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: 'polygon(14% 0%, 72% 0%,90% 90%,0% 100%)',
            borderRadius: '0 0 40% 10%'
        });

        gsap.from("#video-frame", {
            clipPath: 'polygon(0% 0%, 100% 0%,100% 100%,0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: "#video-frame",
                start: 'center center',
                end: "bottom center",
                scrub: true,
            }

        })
    })
    return (

        <div className="relative h-dvh w-screen overflow-x-hidden ">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-400">
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
            )}
            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden bg-blue-75">
                <div>
                    <div className="absolute-center absolute z-50 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVDClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                autoPlay
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoadFunc} //a speacial function that allows us to call a function once data loads in that function.
                            />
                        </div>
                    </div>
                    <video
                        autoPlay
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        // muted 
                        id="next-video"
                        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                         z-20 object-center invisible object-cover size-64"
                        onLoadedData={handleVideoLoadFunc}
                    />
                    <video
                        autoPlay
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        loop
                        className="absolute top-0 left-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoadFunc}
                        muted
                    />
                </div>
                <h1 className="font-zentry hero-heading absolute bottom-4 right-10 z-40 text-blue-75">
                    W<b>E</b><b>B </b>Builders
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        {/* <h1 className="special-font hero-heading text-blue-100">HACK <b>& </b>HUE</h1> */}
                        <img src="./img/heroSection.png" alt="" className="md:w-[50rem] md:relative md:left-[4rem] border-none md:h-[16rem] object-cover" />
                        <p className="tracking-tight md:w-[32rem] ml-4 text-[1.8rem] h-[5rem] vampiro_one text-start md:ml-[8rem] md:text-start mt-4 font-robert-medium text-blue-100 uppercase md:text-3xl">Redefine your business with us</p>
                    </div>
                </div>
            </div>
            <h1 className="font-zentry hero-heading absolute bottom-4 right-10 text-black text-3xl">
                W<b>E</b><b>B</b> Builders
            </h1>
        </div >
    );
};

export default Hero;

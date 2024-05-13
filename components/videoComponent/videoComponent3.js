import React from "react";
import dynamic from 'next/dynamic'

export function VideoComponent3() {
    const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
    let videosrc = "/images/Video Guide_ How to Install SSP Wallet and SSP Key.mp4";

    return (
        <div>
            <ReactPlayer
                width="100%"
                height="auto"
                url={videosrc}
                controls={true}
                autoplay={true}
                light={false}
                playing={true}
                muted={true}
                loop={true}
                volume={0}
                pip={true}
                style={{ marginTop: "30px" }}
            />


            {/* <iframe width="100%" height="400" src="https://www.youtube.com/embed/DBICLhldFEE?si=5_XLqZa_M1flz_uX" style={{marginTop: "30px"}} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}

        </div>

    )
}
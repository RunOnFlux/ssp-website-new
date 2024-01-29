import React from "react";
import dynamic from 'next/dynamic'

// import YouTube from "react-youtube";

export function VideoComponent(){
    const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
    let videosrc = "/images/ssppromo.mp4";

    // const options = {
    //     height: '390',
    //     width: '640',
    //     playerVars: {
    //       autoPlay: 1,
    //       controls: 1,
    //     },
    //   };

    return(
        <div>
             <ReactPlayer
                width="100%"
                height="auto"
                url={videosrc}
                controls={true}
                autoPlay={true}
                light={false}
                pip={true}
                playing={true}
                muted={true}
                loop={true}
                volume={0}
                style={{marginTop: "30px"}}
            />
          
          {/* <YouTube videoId="DBICLhldFEE" options={options} id="video"/> */}
            {/* <iframe width="100%" height="400" src="../../public/images/ssppromo.mp4" style={{marginTop: "30px"}} title="YouTube video player" frameborder="0" allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
              
        </div>
       
    )
}
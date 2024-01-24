import React from "react";
// import dynamic from 'next/dynamic'

// import YouTube from "react-youtube";

export function VideoComponent(){
    // const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
    let videosrc = "/images/animation.mp4";

    // const options = {
    //     height: '390',
    //     width: '640',
    //     playerVars: {
    //       autoplay: 1,
    //       controls: 1,
    //     },
    //   };

    return(
        <div>
             {/* <ReactPlayer
                width="100%"
                height="auto"
                url={videosrc}
                controls={true}
                autoplay={true}
             
                light={false}
             
                pip={true}
                style={{marginTop: "30px"}}
            /> */}
          
          {/* <YouTube videoId="DBICLhldFEE" options={options} id="video"/> */}
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/DBICLhldFEE?si=5_XLqZa_M1flz_uX" style={{marginTop: "30px"}} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              
        </div>
       
    )
}
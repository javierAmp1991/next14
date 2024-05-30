import Image from "next/image";
export const MapboxTest = ()=>{
    return (
      <div style={{width: "100%", height: "100%", position: "relative"}}>
        <Image layout="fill" alt="" src={"/venue-images/mapboxTest.webp"} />
      </div>
    );
}
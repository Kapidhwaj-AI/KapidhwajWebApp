import { cn } from "@/lib/utils";
import { Camera, CameraLocation } from "@/models/camera";
import { IconBorderCornerSquare } from "@tabler/icons-react";

export const CameraStreamCard = ({
  camera, location
}:{camera: Camera, location?: CameraLocation}) => {
  const Breadcrumb = ({ data }: { data?: CameraLocation }) => {
  
    const segments = [data?.organization];

    if (data?.parantFolder && data.parantFolder !== "NA") segments.push(data.parantFolder);
    if (data?.folder && data.folder !== "NA") segments.push(data.folder);

    return <p className="text-sm text-gray-700">{segments.join(" > ")}</p>;
  };
  
  return (
    <div
      className={cn(
        "w-full aspect-video bg-white dark:bg-gray-800 rounded-4xl shadow-lg",
        " flex items-center justify-center relative"
      )}
   
    >
      <video
        src={camera.webrtc_url}
        controls
        autoPlay
        muted
        playsInline
        className="w-[100%] h-[100%] rounded-4xl"
      >
        Your browser does not support the video tag.
      </video>

      <div className={cn("w-full px-4 pb-4 absolute bottom-0")}>
        <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-3 px-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-white ml-2">
              <span className="font-bold text-md">{camera.name}</span>
              <span className="text-sm text-white/80">
               {Breadcrumb({data:location})}
              </span>
            </div>
            <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center">
              <IconBorderCornerSquare
                className="rotate-90"
                color="white"
                stroke={4}
                size={15}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

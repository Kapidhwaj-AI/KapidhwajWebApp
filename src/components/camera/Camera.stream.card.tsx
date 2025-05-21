import { cn } from "@/lib/utils";
import { IconBorderCornerSquare } from "@tabler/icons-react";

export const CameraStreamCard = ({
  streamUrl,
  organizationName,
  folderName,
  cameraName,
}) => {
  return (
    <div
      className={cn(
        "w-full aspect-video bg-white dark:bg-gray-800 rounded-4xl shadow-lg",
        "overflow-hidden flex items-center justify-center relative"
      )}
      //   style={{
      //     backgroundImage: hasStream ? "none" : "url('/assets/images/image.png')",
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //   }}
    >
      <video
        src={streamUrl}
        controls
        autoPlay
        muted
        playsInline
        style={{ width: "100%", maxWidth: "800px" }}
      >
        Your browser does not support the video tag.
      </video>

      <div className={cn("w-full px-4 pb-4 absolute bottom-0")}>
        <div className="backdrop-blur-md bg-black/30 dark:bg-gray-500/30 rounded-full py-3 px-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-white ml-2">
              <span className="font-bold text-md">{cameraName}</span>
              <span className="text-sm text-gray-300">
                {organizationName} &gt; {folderName}
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

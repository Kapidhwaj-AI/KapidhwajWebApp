import Image from "next/image";

export const HomeProfileCard = ({
  imagePath,
  name,
  devices,
}: {
  imagePath: string;
  name: string;
  devices: number;
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Circular Profile Image */}
      <div className="h-18 w-18 rounded-full bg-[var(--surface-100)] text-[#888888] overflow-hidden">
        {/* Replace with your actual image component */}
        <Image
          src={imagePath}
          alt="User Profile"
          width={200} // Set your desired width
          height={200} // Set your desired height
          className="rounded-full object-cover" // Optional styling
          priority={true} // Optional: if it's above the fold
        />
      </div>

      {/* Capsule-style card */}
      <div className="flex items-center bg-[#2B4C88] rounded-full py-2 px-4 h-18 w-80">
        <div className="flex flex-col gap-1 ml-3">
          <h1
            className="text-md font-bold text-white leading-[100%]"
            style={{ fontWeight: 700 }}
          >
            Hi, {name}
          </h1>
          <p className="text-xs text-white mt-0.5">
            {devices.toString()} devices active
          </p>
        </div>
      </div>
    </div>
  );
};

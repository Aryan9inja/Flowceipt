import cloud from "../../../assets/cloud.svg";
import file from "../../../assets/file.svg";

const UploadLoader = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-bg text-text space-y-6">
      <div className="relative flex justify-center items-center">
        {/* Cloud Icon with pulse */}
        <img src={cloud} alt="Cloud" className="w-56 animate-cloud-pulse" />

        {/* File Icon (animated into cloud) */}
        <img
          src={file}
          alt="File"
          className="w-14 h-14 absolute bottom-0 animate-file-upload"
        />
      </div>

      {/* Uploading Text with dots */}
      <span className="text-xl font-semibold flex items-center animate-fadeIn">
        Uploading Image To Cloud
        <span className="ml-1 flex text-primary">
          <span className="animate-blink [animation-delay:0ms]">.</span>
          <span className="animate-blink [animation-delay:200ms]">.</span>
          <span className="animate-blink [animation-delay:400ms]">.</span>
        </span>
      </span>
    </div>
  );
};

export default UploadLoader;

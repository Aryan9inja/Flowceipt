const OcrLoader = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-bg text-text space-y-6">
      <div className="relative text-xl font-semibold overflow-hidden">
        Processing text from image
        {/* Scanning bar overlay */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/40 to-transparent animate-scan" />
      </div>
    </div>
  );
};

export default OcrLoader;

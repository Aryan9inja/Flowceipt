import ReceiptAnimation from "../../../assets/Receipt.gif"

const AiLoader = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-bg text-text space-y-6">
        <img src={ReceiptAnimation} alt="loader" className="w-28"/>
      <span className="text-xl font-semibold">Getting receipt info using AI</span>
    </div>
  );
};

export default AiLoader;

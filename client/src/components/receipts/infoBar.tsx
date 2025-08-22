const InfoBar = () => {
  return (
    <div className="flex justify-between p-2 text-white dark:text-gray-600 bg-primary">
      <div>
        <h1 className="text-2xl font-bold">Vendor</h1>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Amount</h2>
      </div>
    </div>
  );
};

export default InfoBar
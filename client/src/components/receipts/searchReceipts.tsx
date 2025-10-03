interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchReceipts = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="w-full flex justify-end py-4 px-6">
      <input
        type="text"
        placeholder="Search by vendor name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-xs p-3 rounded-lg bg-card shadow focus:outline-none focus:ring-2 focus:ring-primary text-text placeholder:text-muted transition"
      />
    </div>
  );
};

export default SearchReceipts;

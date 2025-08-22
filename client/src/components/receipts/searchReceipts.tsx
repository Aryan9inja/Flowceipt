interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchReceipts = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="flex justify-end py-2 px-5">
      <input
        type="text"
        placeholder="Search by vendor name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="focus:text-text placeholder:text-muted p-2 rounded bg-card focus:ring-primary"
      />
    </div>
  );
};

export default SearchReceipts;

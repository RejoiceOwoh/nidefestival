import { Input } from "@/components/ui/input"; // Adjust based on your project
import { Search } from "lucide-react"; // Assuming you use Lucide icons

type SearchInputProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

export default function SearchInput({ placeholder = "Search...", onSearch }: SearchInputProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        onChange={handleSearch}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}


// USAGE
// import SearchInput from './components/SearchInput'; // Adjust the path

// export default function ProductForm() {
//   const handleSearch = (query: string) => {
//     console.log('Searching for:', query);
//     // Add search logic here
//   };

//   return (
//     <div >
//       {/* Other components */}

//         <SearchInput placeholder="Search Products..." onSearch={handleSearch} />

//       {/* Rest of your content */}
//     </div>
//   );
// }

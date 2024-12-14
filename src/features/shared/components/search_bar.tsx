import "./css/search_bar.css";
import { SearchIcon } from "./search_icon";

export const SearchBar = ({
  placeholder,
}: {
  placeholder: string;
}): JSX.Element => {
  return (
    <div className="search-field-container" role="search">
      <input className="search-field" placeholder={placeholder} />
      <SearchIcon />
    </div>
  );
};

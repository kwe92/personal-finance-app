import "./css/search_bar.css";
import { SearchIcon } from "./search_icon";

export const SearchBar = ({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler;
}): JSX.Element => {
  return (
    <div className="search-field-container" role="search">
      <input
        value={value}
        className="search-field"
        placeholder={placeholder}
        onChange={onChange}
      />
      <SearchIcon />
    </div>
  );
};

import "./css/search_bar.css";
import { SearchIcon } from "./search_icon";

export const SearchBar = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element => {
  return (
    <div className="search-field-container" role="search">
      <input
        className="search-field"
        placeholder={placeholder}
        onChange={onChange}
      />
      <SearchIcon />
    </div>
  );
};

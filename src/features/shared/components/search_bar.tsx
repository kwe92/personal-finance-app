import "./css/search_bar.css";
import { SearchIcon } from "./search_icon";

// TODO: the search bar input element seems to not fil lthe remaining space as it should

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

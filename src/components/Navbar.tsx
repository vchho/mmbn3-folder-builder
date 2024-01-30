import { ChangeEvent } from "react";
import { SortOrder, SortOrderDirection, sorts } from "../types/chip";

const Toggle = ({
  sortDirection,
  setSortDirection,
}: {
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<SortOrderDirection>>;
}) => {
  return (
    <label className="relative mr-2 cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        onClick={() =>
          setSortDirection((previousOrder) =>
            previousOrder === "ascending" ? "descending" : "ascending",
          )
        }
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {sortDirection}
      </span>
    </label>
  );
};

function NavItem({
  text,
  count,
  maxCount,
}: {
  text: string;
  count: number;
  maxCount: number;
}) {
  return (
    <li
      className="mr-2 block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700 dark:bg-blue-600 md:dark:bg-transparent md:dark:text-blue-500"
      aria-current="page"
    >
      {text} {count} / {maxCount}
    </li>
  );
}

function SearchBox({
  handleChipSearch,
  searchTerm,
}: {
  handleChipSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}) {
  return (
    <input
      type="text"
      id="chip-search-input"
      className="mr-2 h-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      placeholder="Search for chips here"
      onChange={handleChipSearch}
      value={searchTerm}
    />
  );
}

export const Navbar = ({
  totalCount,
  totalStandardChips,
  totalMegaChips,
  totalGigaChips,
  saveFolder,
  handleChipSearch,
  searchTerm,
  setFilters,
  sortDirection,
  setSortDirection,
  folderName,
  setFolderName,
  folderImage,
  setFolderImage,
}: {
  totalCount: number;
  totalStandardChips: number;
  totalMegaChips: number;
  totalGigaChips: number;
  saveFolder: () => void;
  handleChipSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  setFilters: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<SortOrderDirection>>;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
  folderImage: string;
  setFolderImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortName = e.target.value;
    setFilters(sortName as SortOrder);
  };

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className=" w-full" id="navbar-default flex-row flex">
        <div className="flex w-2/4">
          <div className="flex items-center">
            <NavItem text="Total: " count={totalCount} maxCount={30} />
            <NavItem
              text="Standard: "
              count={totalStandardChips}
              maxCount={30}
            />
            <NavItem text="Mega: " count={totalMegaChips} maxCount={7} />
            <NavItem text="Giga: " count={totalGigaChips} maxCount={2} />
          </div>
        </div>

        <div className="flex w-2/4">
          <SearchBox
            handleChipSearch={handleChipSearch}
            searchTerm={searchTerm}
          />
          <Toggle
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />

          <select
            id="sortLabels"
            data-testid="select"
            className="block h-10 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(e) => handleSortChange(e)}
          >
            {sorts.map((sort) => {
              return (
                <option value={sort.label} key={sort.label}>
                  {sort.label}
                </option>
              );
            })}
          </select>

          <input
            type="text"
            id="chip-search-input"
            className="mr-2 h-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Name your folder"
            onChange={(e) => setFolderName(e.target.value)}
            value={folderName}
          />

          <input
            type="text"
            id="chip-search-input"
            className="mr-2 h-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add a image here!"
            onChange={(e) => setFolderImage(e.target.value)}
            value={folderImage}
          />

          <button
            type="button"
            onClick={() => saveFolder()}
            className={
              totalCount !== 30
                ? "mb-2 mr-2 cursor-not-allowed rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-green-300 "
                : "mb-2 mr-2 cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            }
            disabled={totalCount !== 30}
          >
            Save
          </button>
        </div>

        <div className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900"></div>
      </div>
    </nav>
  );
};

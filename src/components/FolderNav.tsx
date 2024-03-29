import { memo } from "react";

const NavItem = memo(function NavItem({
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
      className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      aria-current="page"
    >
      {text} {count} / {maxCount}
    </li>
  );
});

export const FolderNav = memo(function FolderNav({
  totalCount,
  totalStandardChips,
  totalMegaChips,
  totalGigaChips,
  saveFolder,
}: {
  totalCount: number;
  totalStandardChips: number;
  totalMegaChips: number;
  totalGigaChips: number;
  saveFolder: () => void;
}) {
  return (
    <nav className="h-16 border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <NavItem text="Total: " count={totalCount} maxCount={30} />
            <NavItem
              text="Standard: "
              count={totalStandardChips}
              maxCount={30}
            />
            <NavItem text="Mega: " count={totalMegaChips} maxCount={7} />
            <NavItem text="Giga: " count={totalGigaChips} maxCount={2} />
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
          </ul>
        </div>
      </div>
    </nav>
  );
});

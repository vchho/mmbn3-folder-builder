import { Chip } from "../utils/chips";
import { useState, ChangeEvent, memo, Fragment } from "react";
import { Menu, Tab, Transition } from "@headlessui/react";
import useBattleChips from "../hooks/useBattleChips";
import { FolderNav } from "../components/FolderNav";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import Toggle from "./components/Toggle";

// const megaChip = 5;
// const gigaChip = 1;

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type FolderTrack = {
  count: number;
  chipType: string;
  name: string;
};

interface Folder extends Chip {
  count: number;
}

const ChipItem = memo(function ChipItem({
  chip,
  addChipToFolder,
  chipIndex,
}: {
  chip: {
    number: number;
    image: string;
    name: string;
    type: string;
    damage: string;
    lettercode: string;
    memory: string | number;
    description: string;
    key: string;
    chipType: string;
  };
  addChipToFolder: (chip: Chip | Folder) => void;
  chipIndex: string;
}) {
  return (
    <div
      className={classNames(
        "rounded-xl bg-white p-1",
        "mb-3 ml-3 mr-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
      )}
      key={chipIndex}
    >
      <div className="relative rounded-sm p-2">
        <div className="flex justify-between">
          <div className="flex-row">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <label htmlFor="comments" className="font-medium text-gray-900">
                {chip.name} {chip.lettercode}
              </label>
              <p>Description: {chip.description}</p>
              <p>Damage: {chip.damage}</p>
              <p>Memory: {chip.memory}</p>
            </div>
          </div>
          <div className="flex self-center">
            <img
              src={chip.image}
              className="mr-1 flex h-24 w-24 self-center"
              alt={`${chip.name} image`}
            />
            <button
              onClick={() => addChipToFolder(chip)}
              className="h-11 self-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

function ChipItemLeftSide({
  chip,
  index,
  removeChipFromFolder,
}: {
  chip: any;
  index: number;
  removeChipFromFolder: (chip: Chip, index: number) => void;
}) {
  return (
    <div
      className={classNames(
        "rounded-xl bg-white p-1",
        "mb-3 ml-3 mr-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
      )}
      key={index}
    >
      <div className="relative rounded-sm p-2">
        <div className="flex justify-between">
          <div className="flex-row">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <label htmlFor="comments" className="font-medium text-gray-900">
                {chip.name} {chip.lettercode}
              </label>
              <p>Description: {chip.description}</p>
              <p>Damage: {chip.damage}</p>
              <p>Memory: {chip.memory}</p>
              <p>Total: {chip.count}</p>
            </div>
          </div>
          <div className="flex self-center">
            <img
              src={chip.image}
              className="mr-1 flex h-24 w-24 self-center"
              alt={`${chip.name} image`}
            />
            <button
              onClick={() => removeChipFromFolder(chip, index)}
              className="h-11 self-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SearchBox = memo(function SearchBox({
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
      className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      placeholder="Search for chips here"
      onChange={handleChipSearch}
      value={searchTerm}
    />
  );
});

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Id", href: "#", current: true },
  { name: "ABCDE", href: "#", current: false },
  { name: "Code", href: "#", current: false },
  { name: "Damage", href: "#", current: false },
  { name: "Element", href: "#", current: false },
  { name: "MB", href: "#", current: false },
];

function Create() {
  const [folder, setFolder] = useState<any[]>([]);
  const [folderTrack, setFolder2] = useState<FolderTrack[]>([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const {
    chipLibrary,
    originalChipLibrary,
    setSearchTerm,
    searchTerm,
    // setFilters,
  } = useBattleChips(currentTabIndex);
  const [sortOptions2] = useState(sortOptions);

  const totalCount = folderTrack.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0);

  const totalStandardChips = folderTrack.reduce((accumulator, currentValue) => {
    return currentValue.chipType === "standard"
      ? accumulator + currentValue.count
      : accumulator;
  }, 0);

  const totalMegaChips = folderTrack.reduce((accumulator, currentValue) => {
    return currentValue.chipType === "mega"
      ? accumulator + currentValue.count
      : accumulator;
  }, 0);

  const totalGigaChips = folderTrack.reduce((accumulator, currentValue) => {
    return currentValue.chipType === "giga"
      ? accumulator + currentValue.count
      : accumulator;
  }, 0);

  // const ChipType = Object.keys(originalChipLibrary)[currentTabIndex];

  // console.log(ChipType);

  const addChipToFolder = (chip: Chip) => {
    if (totalCount === 30) {
      alert("30 is the maximum amount of chips you can have in your folder");
      return;
    }

    if (chip.chipType === "mega" && totalMegaChips === 5) {
      alert("Can only have 5 mega chips");
      return;
    }

    if (chip.chipType === "giga" && totalGigaChips === 1) {
      alert("Can only have 1 giga chip");
      return;
    }

    const chipIndex = folderTrack.findIndex(
      (c: any) => c.name.toLowerCase() === chip.name.toLowerCase()
    );

    if (chipIndex > -1) {
      const currentChip = folderTrack.find((c) => c.name === chip.name);

      if (currentChip?.count === 1 && currentChip?.chipType === "mega") {
        alert("Can only have 1 of each mega chip");
        return;
      }

      if (currentChip?.count === 4) {
        alert("Can only have 4 of each chip");
      } else {
        const chipIndexForFolder = folder.findIndex(
          (c: any) => c.name === chip.name && c.lettercode === chip.lettercode
        );

        if (chipIndexForFolder > -1) {
          const chipDataForFolder = folder[chipIndexForFolder];
          const updatedChipForFolder = {
            ...chipDataForFolder,
            count: chipDataForFolder.count + 1,
          };
          const clonedFolder = [...folder];
          clonedFolder[chipIndexForFolder] = updatedChipForFolder;
          setFolder(clonedFolder);
        } else {
          setFolder([...folder, { ...chip, count: 1 }]);
        }

        const chipData = folderTrack[chipIndex];
        const updatedChip = { ...chipData, count: chipData.count + 1 };
        const clonedFolderTrack = [...folderTrack];
        clonedFolderTrack[chipIndex] = updatedChip;
        setFolder2(clonedFolderTrack);
      }
    } else {
      setFolder2([
        ...folderTrack,
        { count: 1, name: chip.name, chipType: chip.chipType },
      ]);
      setFolder([...folder, { ...chip, count: 1 }]);
    }
  };

  const removeChipFromFolder = (chip: Chip, index: number) => {
    const chipIndex = folderTrack.findIndex(
      (c: any) => c.name.toLowerCase() === chip.name.toLowerCase()
    );

    const chipIndexForFolder = folder.findIndex(
      (c: any) => c.name === chip.name && c.lettercode === chip.lettercode
    );

    // https://stackoverflow.com/a/69458984
    // setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);

    if (chipIndex > -1) {
      // const currentChip = folderTrack.find((c) => c.name === chip.name);
      const chipData = folderTrack[chipIndex];
      const updatedChip = { ...chipData, count: chipData.count - 1 };
      if (updatedChip.count === 0) {
        setFolder2([
          ...folderTrack.slice(0, chipIndex),
          ...folderTrack.slice(chipIndex + 1),
        ]);

        setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);
      } else {
        if (chipIndexForFolder > -1) {
          const chipDataForFolder = folder[chipIndexForFolder];

          if (chipDataForFolder.count === 1) {
            setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);
          } else {
            const updatedChipForFolder = {
              ...chipDataForFolder,
              count: chipDataForFolder.count - 1,
            };

            const clonedFolder = [...folder];
            clonedFolder[chipIndexForFolder] = updatedChipForFolder;
            setFolder(clonedFolder);
          }
        } else {
          setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);
        }

        const clonedFolderTrack = [...folderTrack];
        clonedFolderTrack[chipIndex] = updatedChip;

        setFolder2(clonedFolderTrack);
        // https://stackoverflow.com/a/69458984
        // setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);
      }
    } else {
      setFolder2([
        ...folderTrack,
        { count: 1, name: chip.name, chipType: chip.chipType },
      ]);
      setFolder([...folder, chip]);
    }
  };

  const handleChipSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchTerm(text);
  };

  return (
    <>
      <div className="grid h-screen grid-cols-12 bg-blue-500">
        <div className="col-span-6 flex-1 overflow-y-scroll">
          <header className="sticky top-0 z-50">
            <FolderNav
              totalCount={totalCount}
              totalStandardChips={totalStandardChips}
              totalMegaChips={totalMegaChips}
              totalGigaChips={totalGigaChips}
            />
          </header>

          <div className="container">
            {folder.map((chip, index) => {
              return (
                <ChipItemLeftSide
                  chip={chip}
                  index={index}
                  removeChipFromFolder={removeChipFromFolder}
                />
              );
            })}
          </div>
        </div>

        <div className="col-span-6 flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-scroll">
            <div className="bg-lime-400">
              <header className="sticky top-0 z-50">
                <div className="mb-6">
                  <nav className="h-16 border-gray-200 bg-white dark:bg-gray-900">
                    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                      <SearchBox
                        handleChipSearch={handleChipSearch}
                        searchTerm={searchTerm}
                      />
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="group inline-flex justify-center text-sm font-medium  text-white hover:text-gray-900 dark:hover:text-red-500">
                            Sort
                            <ChevronDownIcon
                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 dark:hover:text-red-500"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {sortOptions2.map((option) => (
                                <Menu.Item key={option.name}>
                                  {({ active }) => (
                                    <a
                                      href={option.href}
                                      className={classNames(
                                        option.current
                                          ? "font-medium text-gray-900"
                                          : "text-gray-500",
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      {option.name}
                                      {/* <Toggle currentValue={option.current} /> */}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </nav>
                </div>
              </header>

              <div className="w-full px-2 sm:px-0">
                <Tab.Group
                  onChange={(index) => {
                    setCurrentTabIndex(index);
                    setSearchTerm("");
                  }}
                >
                  <Tab.List className="ml-3 mr-3 flex space-x-1 rounded-xl bg-blue-900/20 p-1 ">
                    {Object.keys(originalChipLibrary).map((title) => (
                      <Tab
                        key={title}
                        className={({ selected }) =>
                          classNames(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                          )
                        }
                      >
                        {title}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {chipLibrary.map((chip, index) => {
                      return (
                        <ChipItem
                          chip={chip}
                          addChipToFolder={addChipToFolder}
                          chipIndex={chip.name + index}
                          key={chip.name + index}
                        />
                      );
                    })}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;

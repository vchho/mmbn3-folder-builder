import { useState, ChangeEvent, memo, Fragment, useEffect } from "react";
import { Menu, Tab, Transition, Listbox } from "@headlessui/react";
import useBattleChips from "../hooks/useBattleChips";
import { FolderNav } from "../components/FolderNav";
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import useLocalStorage from "../hooks/useLocalStorage";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import { Chip, ChipWithCount } from "../types/chip";

type FolderParams = {
  id: string;
};

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

function MyListbox() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div className="w-96">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export type FolderTrack = {
  count: number;
  chipType: string;
  name: string;
};

export interface setFolder {
  folder: {
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
    count?: number;
  }[];
  folderTrack: FolderTrack[];
  id: string;
}

interface Folder extends Chip {
  count: number;
}

const ChipItem = memo(function ChipItem({
  chip,
  addChipToFolder,
  chipIndex,
}: {
  chip: Chip;
  addChipToFolder: (chip: Chip | Folder) => void;
  chipIndex: string;
}) {
  return (
    <div
      className={classNames(
        "rounded-xl bg-zinc-100 p-1",
        "mb-3 ml-3 mr-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
      )}
      key={chipIndex}
    >
      <div className="relative rounded-sm p-2">
        <div className="flex justify-between">
          <div className="flex-row sm:flex-col">
            <div className="flex flex-col text-sm font-medium leading-6 text-gray-900">
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
              className="h-11 self-center rounded-md border border-green-700 bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-green-800 hover:bg-green-700"
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
  chip: ChipWithCount;
  index: number;
  removeChipFromFolder: (chip: ChipWithCount, index: number) => void;
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
              <p>
                Total:
                <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 ">
                  {chip.count}
                </span>
              </p>
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
  // Get folder id from URL
  const { id } = useParams<FolderParams>();
  const [folder, setFolder] = useState<any[]>([]);
  const [folderTrack, setFolder2] = useState<FolderTrack[]>([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const {
    chipLibrary,
    originalChipLibrary,
    setSearchTerm,
    searchTerm,
  } = useBattleChips(currentTabIndex);
  const [sortOptions2] = useState(sortOptions);
  const navigate = useNavigate();

  const [storedValue, setValue] = useLocalStorage<setFolder[]>(
    "mmbn3-folder-builder",
    []
  );

  console.log("stored Value", storedValue);

  useEffect(() => {
    if (id) {
      const foundFolder = storedValue!.find((folder) => folder.id === id);
      if (foundFolder) {
        setFolder(foundFolder?.folder);
        setFolder2(foundFolder?.folderTrack);
      }
    }
    // When I get that value to come back, this useEffect will update
  }, [storedValue]);

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

  const removeChipFromFolder = (chip: ChipWithCount, index: number) => {
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

  const saveFolder = () => {
    const updatedFolder = [
      ...storedValue,
      { folder, folderTrack, id: nanoid() },
    ];
    setValue(updatedFolder);
    navigate("/");
  };

  return (
    <>
      <div className="grid h-screen grid-cols-12 bg-blue-300">
        <div className="col-span-6 flex-1 overflow-y-scroll">
          <header className="sticky top-0 z-50">
            <FolderNav
              totalCount={totalCount}
              totalStandardChips={totalStandardChips}
              totalMegaChips={totalMegaChips}
              totalGigaChips={totalGigaChips}
              saveFolder={saveFolder}
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
            <div className="bg-blue-300">
              <header className="sticky top-0 z-50">
                <div className="mb-6">
                  <nav className="h-16 border-gray-200 bg-white dark:bg-gray-900">
                    <div className="mx-auto flex flex-wrap items-center justify-between p-4">
                      <SearchBox
                        handleChipSearch={handleChipSearch}
                        searchTerm={searchTerm}
                      />

                      <MyListbox />

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div className="dark:hover:text-red-500">
                          <Menu.Button className="group inline-flex justify-center text-sm font-medium  text-white">
                            Sort
                            <ChevronDownIcon
                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 "
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

import { StandardChip } from "./utils/chips";
import { useState, ChangeEvent } from "react";
import { Tab } from "@headlessui/react";
import { BottomTabBar } from "./components/BottomTabBar";
import useBattleChips from "./hooks/useBattleChips";

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

function App() {
  const [folder, setFolder] = useState<any[]>([]);
  const [folderTrack, setFolder2] = useState<FolderTrack[]>([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const { chipLibrary, originalChipLibrary, setSearchTerm, searchTerm } =
    useBattleChips(currentTabIndex);

  const totalCount = folderTrack.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0);

  const totalMegaChips = folderTrack.reduce((accumulator, currentValue) => {
    return currentValue.chipType === "mega"
      ? accumulator + currentValue.count
      : accumulator;
  }, 0);

  const addChipToFolder = (chip: StandardChip) => {
    const chipIndex = folderTrack.findIndex(
      (c: any) => c.name.toLowerCase() === chip.name.toLowerCase()
    );

    if (chipIndex > -1) {
      const currentChip = folderTrack.find((c) => c.name === chip.name);

      if (totalMegaChips === 5) {
        alert("Can only have 5 mega chips");
        return;
      }

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

  const removeChipFromFolder = (chip: StandardChip, index: number) => {
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
          <p>Total Chips: {totalCount} / 30</p>
          {folder.map((chip, index) => {
            return (
              <div
                className="max-w mb-2 block h-24 rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100"
                key={index}
              >
                <span className="flex">
                  {chip.name} {chip.lettercode}
                </span>
                <p>{chip.count}</p>
                <button
                  onClick={() => removeChipFromFolder(chip, index)}
                  className="relative inline-flex items-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
                >
                  -
                </button>
              </div>
            );
          })}
        </div>

        <div className="col-span-6 flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-scroll">
            <div className="bg-lime-400">
              <div className="mb-6">
                <input
                  type="text"
                  id="chip-search-input"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search for chips here..."
                  onChange={handleChipSearch}
                  value={searchTerm}
                />
              </div>

              <div className="max-w w-full px-2 sm:px-0">
                <Tab.Group
                  onChange={(index) => {
                    setCurrentTabIndex(index);
                    setSearchTerm("");
                  }}
                >
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
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
                        <div
                          className={classNames(
                            "rounded-xl bg-white p-3",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                          )}
                          key={index}
                        >
                          <div
                            key={chip.key}
                            className="relative rounded-md p-3 hover:bg-gray-100"
                          >
                            <h3 className="text-sm font-medium leading-5">
                              {chip.name} {chip.lettercode}
                            </h3>

                            <div
                              className="max-w mb-2 block h-24 rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100"
                              key={chip.key}
                            >
                              <div className="flex">
                                {chip.name} {chip.lettercode}
                              </div>
                              <span className="flex">{chip.memory}</span>
                              <button
                                onClick={() => handleFolderAdd2(chip)}
                                className="relative inline-flex items-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomTabBar totalCount={totalCount} />
    </>
  );
}

export default App;

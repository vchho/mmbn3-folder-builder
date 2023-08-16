import { useState, ChangeEvent, memo, useEffect } from "react";
import { Tab } from "@headlessui/react";
import useBattleChips from "../hooks/useBattleChips";
import useLocalStorage from "../hooks/useLocalStorage";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import {
  Chip,
  ChipType,
  FolderObject,
  FolderRouteParams,
  FolderTrack,
} from "../types/chip";
import classNames from "classnames";
import { Navbar } from "../components/Navbar";

function classNames2(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const ChipItem = memo(function ChipItem({
  chip,
  index,
  chipIndex,
  total,
  addChipToFolder,
  removeChipFromFolder,
}: {
  chip: Chip;
  index: number;
  chipIndex: string;
  total?: boolean;
  addChipToFolder: (chip: Chip) => void;
  removeChipFromFolder: (chip: Chip, index: number) => void;
}) {
  const chipTypeColor = classNames({
    "bg-gray-100": chip.chipType === "standard",
    "bg-sky-300": chip.chipType === "mega",
    "bg-rose-300": chip.chipType === "giga",
  });

  return (
    <div
      className={classNames2(
        "rounded-xl p-1",
        "mb-3 ml-3 mr-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
        chipTypeColor,
      )}
      key={chipIndex}
    >
      <div className="relative rounded-sm p-2">
        <div className="flex justify-between">
          <div className="flex-row sm:flex-col">
            <div className="flex flex-col text-sm font-medium leading-6 text-gray-900">
              <p className="font-medium text-gray-900">
                {chip.name} {chip.lettercode}
              </p>
              <p>Description: {chip.description}</p>
              <p>Damage: {chip.damage}</p>
              <p>Memory: {chip.memory}</p>
              {total && (
                <p>
                  Total:
                  <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 ">
                    {chip.count}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="flex self-center">
            <img
              src={chip.image}
              className="mr-1 flex h-24 w-24 self-center"
              alt={`${chip.name} image`}
            />
            {total ? (
              <button
                onClick={() => removeChipFromFolder(chip, index)}
                className="h-11 self-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
              >
                -
              </button>
            ) : (
              <button
                onClick={() => addChipToFolder(chip)}
                className="h-11 self-center rounded-md border border-green-700 bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-green-800 hover:bg-green-700"
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

function ChipItemLeftSide({
  chip,
  chipIndex,
  index,
  removeChipFromFolder,
  addChipToFolder,
}: {
  chip: Chip;
  chipIndex: string;
  index: number;
  removeChipFromFolder: (chip: Chip, index: number) => void;
  addChipToFolder: (chip: Chip) => void;
}) {
  return (
    <ChipItem
      chip={chip}
      index={index}
      chipIndex={chipIndex}
      addChipToFolder={addChipToFolder}
      removeChipFromFolder={removeChipFromFolder}
      total={true}
    />
  );
}

function Create() {
  // Get folder id from URL
  const { id } = useParams<FolderRouteParams>();

  // Keeps track of selected chips and renders items on the left pane
  const [folder, setFolder] = useState<Chip[]>([]);

  // Keeps track of selected chips and their totals
  const [folderTrack, setFolderTrack] = useState<FolderTrack[]>([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [folderName, setFolderName] = useState("");
  const [folderImage, setFolderImage] = useState("");
  const {
    chipLibrary,
    originalChipLibrary,
    setSearchTerm,
    searchTerm,
    setFilters,
    setSortDirection,
    sortDirection,
  } = useBattleChips(currentTabIndex);
  const navigate = useNavigate();

  const [storedValue, setValue] = useLocalStorage<FolderObject[]>(
    "mmbn3-folder-builder",
    [],
  );

  useEffect(() => {
    if (id) {
      const foundFolder = storedValue!.find((folder) => folder.id === id);
      if (foundFolder) {
        setFolder(foundFolder?.folder);
        setFolderTrack(foundFolder?.folderTrack);
        setFolderName(foundFolder.folderName);
        if (foundFolder.folderImage) {
          setFolderImage(foundFolder.folderImage);
        }
      }
    }
    // When I get that value to come back from useLocalStorage on the second render, this useEffect will update
  }, [storedValue]);

  const totalCount = folderTrack.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0);

  const getChipCount = (chipType: ChipType) => {
    const chipCount = folderTrack.reduce((accumulator, currentValue) => {
      return currentValue.chipType === chipType
        ? accumulator + currentValue.count
        : accumulator;
    }, 0);
    return chipCount;
  };

  const addChipToFolder = (chip: Chip) => {
    if (totalCount === 30) {
      alert("30 is the maximum amount of chips you can have in your folder");
      return;
    }

    if (chip.chipType === "mega" && getChipCount("mega") === 7) {
      alert("Can only have 7 mega chips");
      return;
    }

    if (chip.chipType === "giga" && getChipCount("giga") === 2) {
      alert("Can only have 2 giga chip");
      return;
    }

    const chipIndex = folderTrack.findIndex(
      (c) => c.name.toLowerCase() === chip.name.toLowerCase(),
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
          (c) => c.name === chip.name && c.lettercode === chip.lettercode,
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
        setFolderTrack(clonedFolderTrack);
      }
    } else {
      setFolderTrack([
        ...folderTrack,
        { count: 1, name: chip.name, chipType: chip.chipType },
      ]);
      setFolder([...folder, { ...chip, count: 1 }]);
    }
  };

  const removeChipFromFolder = (chip: Chip, index: number) => {
    const chipIndex = folderTrack.findIndex(
      (c) => c.name.toLowerCase() === chip.name.toLowerCase(),
    );

    const chipIndexForFolder = folder.findIndex(
      (c) => c.name === chip.name && c.lettercode === chip.lettercode,
    );

    // https://stackoverflow.com/a/69458984
    // setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);

    if (chipIndex > -1) {
      const chipData = folderTrack[chipIndex];
      const updatedChip = { ...chipData, count: chipData.count - 1 };
      if (updatedChip.count === 0) {
        setFolderTrack([
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

        setFolderTrack(clonedFolderTrack);
      }
    } else {
      setFolderTrack([
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
    const createdFolder = [
      ...storedValue,
      {
        folder,
        folderTrack,
        id: nanoid(),
        folderName: folderName ? folderName : "Created Folder",
        folderImage: folderImage ? folderImage : null,
      },
    ];

    console.log("createdFolder", createdFolder);

    if (id) {
      const folderIndex = storedValue!.findIndex((folder) => folder.id === id);

      const selectedFolder = storedValue[folderIndex];

      const updatedFolders = [...storedValue];

      updatedFolders[folderIndex] = {
        folder,
        folderTrack,
        id: selectedFolder.id,
        folderName: folderName,
        folderImage: folderImage,
      };

      setValue(updatedFolders);
    } else {
      setValue(createdFolder);
    }

    navigate("/");
  };

  return (
    <>
      <Navbar
        totalCount={totalCount}
        totalStandardChips={getChipCount("standard")}
        totalMegaChips={getChipCount("mega")}
        totalGigaChips={getChipCount("giga")}
        saveFolder={saveFolder}
        searchTerm={searchTerm}
        handleChipSearch={handleChipSearch}
        setFilters={setFilters}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        folderName={folderName}
        setFolderName={setFolderName}
        folderImage={folderImage}
        setFolderImage={setFolderImage}
      />

      <div className="grid h-screen grid-cols-12 bg-blue-300">
        <div className="col-span-6 flex-1 overflow-y-scroll">
          <div className="container">
            {folder.map((chip, index) => {
              return (
                <ChipItemLeftSide
                  key={chip.key}
                  chip={chip}
                  index={index}
                  chipIndex={chip.name + index}
                  addChipToFolder={addChipToFolder}
                  removeChipFromFolder={removeChipFromFolder}
                />
              );
            })}
          </div>
        </div>

        <div className="col-span-6 flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-scroll">
            <div className="bg-blue-300">
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
                          classNames2(
                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                            "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
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
                          index={index}
                          chipIndex={chip.name + index}
                          key={chip.key}
                          addChipToFolder={addChipToFolder}
                          removeChipFromFolder={removeChipFromFolder}
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

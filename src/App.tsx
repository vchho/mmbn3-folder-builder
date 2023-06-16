import { StandardChip, updatedStandardChips } from "./utils/chips";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { megaChips } from "./utils/megaChips";
import { BottomTabBar } from "./components/BottomTabBar";

// const megaChip = 5;
// const gigaChip = 1;

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [folder, setFolder] = useState<any[]>([]);
  const [folderTrack, setFolder2] = useState<any[]>([]);
  // const [searchValue, setChipSearchValue] = useState("");

  let [categories] = useState({
    Standard: updatedStandardChips,
    Mega: megaChips,
  });

  const totalCount = folderTrack.reduce(
    (
      accumulator: number,
      currentValue: { count: number; chipType: string; name: string }
    ) => {
      return accumulator + currentValue.count;
    },
    0
  );

  const handleFolderAdd2 = (chip: StandardChip) => {
    const chipIndex = folderTrack.findIndex(
      (c: any) => c.name.toLowerCase() === chip.name.toLowerCase()
    );

    if (chipIndex > -1) {
      const currentChip = folderTrack.find((c) => c.name === chip.name);

      const totalMegaChips = folderTrack.reduce(
        (
          accumulator: number,
          currentValue: { count: number; chipType: string; name: string }
        ) => {
          if (currentValue.chipType === "mega") {
            return (accumulator = accumulator + 1);
          }
        },
        0
      );

      if (totalMegaChips === 5) {
        alert("Can only have 5 mega chips");
        return;
      }

      if (currentChip.count === 1 && currentChip.chipType === "mega") {
        alert("Can only have 1 of each mega chip");
        return;
      }

      if (currentChip.count === 4) {
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

  const removeChip = (chip: StandardChip, index: number) => {
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
      console.log(updatedChip);
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
        // console.log("hit in else updatedChip.count === 0");
        // const clonedFolderTrack = [...folderTrack];
        // clonedFolderTrack[chipIndex] = updatedChip;

        // setFolder2(clonedFolderTrack);

        const clonedFolderTrack = [...folderTrack];
        clonedFolderTrack[chipIndex] = updatedChip;

        setFolder2(clonedFolderTrack);
        // https://stackoverflow.com/a/69458984
        // setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);
      }
    } else {
      setFolder2([...folderTrack, { count: 1, name: chip.name }]);
      setFolder([...folder, chip]);
    }
  };

  // const handleChipSearch = (event: ChangeEvent<HTMLInputElement>) => {
  //   const text = event.target.value;
  //   setChipSearchValue(text);
  // };

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
                  onClick={() => removeChip(chip, index)}
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
              <p>Standard</p>
              <div className="mb-6">
                <input
                  type="text"
                  id="chip-search-input"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search for chips here..."
                  // onChange={handleChipSearch}
                />
              </div>
              {/* {updatedStandardChips
                .filter((data) => {
                  const lower = data.name.toLowerCase();
                  const inputLower = searchValue.toLowerCase();

                  return lower.includes(inputLower);
                })
                .map((chip) => {
                  return (
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
                  );
                })} */}

              <div className="max-w w-full px-2 sm:px-0">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(categories).map((category) => (
                      <Tab
                        key={category}
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
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {Object.values(categories).map((posts, idx) => (
                      <Tab.Panel
                        key={idx}
                        className={classNames(
                          "rounded-xl bg-white p-3",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                        )}
                      >
                        <ul>
                          {posts.map((post) => (
                            <li
                              key={post.key}
                              className="relative rounded-md p-3 hover:bg-gray-100"
                            >
                              <h3 className="text-sm font-medium leading-5">
                                {post.name} {post.lettercode}
                              </h3>

                              <div
                                className="max-w mb-2 block h-24 rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100"
                                key={post.key}
                              >
                                <div className="flex">
                                  {post.name} {post.lettercode}
                                </div>
                                <span className="flex">{post.memory}</span>
                                <button
                                  onClick={() => handleFolderAdd2(post)}
                                  className="relative inline-flex items-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
                                >
                                  +
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {/* {updatedStandardChips
                          .filter((data) => {
                            const lower = data.name.toLowerCase();
                            const inputLower = searchValue.toLowerCase();

                            return lower.includes(inputLower);
                          })
                          .map((chip) => {
                            return (
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
                            );
                          })} */}
                      </Tab.Panel>
                    ))}
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

import { StandardChip, updatedStandardChips } from "./utils/chips";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { megaChips } from "./utils/megaChips";

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
    // Mega: [
    //   {
    //     id: 1,
    //     title: "Is tech making coffee better or worse?",
    //     date: "Jan 7",
    //     commentCount: 29,
    //     shareCount: 16,
    //   },
    //   {
    //     id: 2,
    //     title: "The most innovative things happening in coffee",
    //     date: "Mar 19",
    //     commentCount: 24,
    //     shareCount: 12,
    //   },
    // ],
    // Giga: [
    //   {
    //     id: 1,
    //     title: "Ask Me Anything: 10 answers to your questions about coffee",
    //     date: "2d ago",
    //     commentCount: 9,
    //     shareCount: 5,
    //   },
    //   {
    //     id: 2,
    //     title: "The worst advice we've ever heard about coffee",
    //     date: "4d ago",
    //     commentCount: 1,
    //     shareCount: 2,
    //   },
    // ],
  });

  const totalCount = folderTrack.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0);

  const handleFolderAdd2 = (chip: StandardChip) => {
    const chipIndex = folderTrack.findIndex(
      (c: any) => c.name.toLowerCase() === chip.name.toLowerCase()
    );

    if (chipIndex > -1) {
      const currentChip = folderTrack.find((c) => c.name === chip.name);
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

      <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg
              className="mb-1 h-6 w-6 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              All: {totalCount} / 30
            </span>
          </button>
          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg
              className="mb-1 h-6 w-6 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              ></path>
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              Wallet
            </span>
          </button>
          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg
              className="mb-1 h-6 w-6 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              Settings
            </span>
          </button>
          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg
              className="mb-1 h-6 w-6 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              ></path>
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              Profile
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

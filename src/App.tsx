import { StandardChip, updatedStandardChips } from "./utils/chips";
import { useEffect, useState } from "react";

const megaChip = 5;
const gigaChip = 1;

function App() {
  const [folder, setFolder] = useState<StandardChip[]>([]);
  const [folderTrack, setFolder2] = useState<any[]>([]);

  const handleFolderAdd2 = (chip: StandardChip) => {
    const chipIndex = folderTrack.findIndex(
      (c: any) => c.name.toLowerCase() === chip.name.toLowerCase()
    );
    if (chipIndex > -1) {
      const currentChip = folderTrack.find((c) => c.name === chip.name);
      if (currentChip.count === 4) {
        alert("Can only have 4 of each chip");
      } else {
        const chipData = folderTrack[chipIndex];
        const updatedChip = { ...chipData, count: chipData.count + 1 };
        const clonedFolderTrack = [...folderTrack];
        clonedFolderTrack[chipIndex] = updatedChip;
        setFolder2(clonedFolderTrack);
        setFolder([...folder, chip]);
      }
    } else {
      setFolder2([...folderTrack, { count: 1, name: chip.name }]);
      setFolder([...folder, chip]);
    }
  };

  const removeChip = (chip: StandardChip, index: number) => {
    const chipIndex = folderTrack.findIndex(
      (c: any) => c.name.toLowerCase() === chip.name.toLowerCase()
    );

    if (chipIndex > -1) {
      // const currentChip = folderTrack.find((c) => c.name === chip.name);
      const chipData = folderTrack[chipIndex];
      const updatedChip = { ...chipData, count: chipData.count - 1 };
      console.log(updatedChip);
      if (updatedChip.count === 0) {
        console.log("hit");
        setFolder2([
          ...folderTrack.slice(0, chipIndex),
          ...folderTrack.slice(chipIndex + 1),
        ]);

        setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);
      } else {
        const clonedFolderTrack = [...folderTrack];
        clonedFolderTrack[chipIndex] = updatedChip;

        setFolder2(clonedFolderTrack);
        // https://stackoverflow.com/a/69458984
        setFolder([...folder.slice(0, index), ...folder.slice(index + 1)]);
      }
    } else {
      setFolder2([...folderTrack, { count: 1, name: chip.name }]);
      setFolder([...folder, chip]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* <div className="mx-4 max-w-7xl sm:mx-32"> */}
      <div className="grid grid-cols-1 gap-8 py-6 lg:grid-cols-2">
        <div className="pb-10 lg:w-5/6">
          <p>Total Chips: {folder.length} / 30</p>

          {folder.map((chip, index) => {
            return (
              <div className="flex" key={chip.key}>
                <span className="flex">
                  {chip.name} {chip.lettercode}
                </span>
                <p>{chip.memory}</p>
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

        <div className="pb-10 lg:w-5/6">
          <p>Standard</p>
          {updatedStandardChips.map((chip) => {
            return (
              <div className="flex" key={chip.key}>
                <span className="flex">
                  {chip.name} {chip.lettercode}
                </span>
                <p>{chip.memory}</p>
                <button
                  // onClick={() => setFolderItem([...folder, chip])}
                  onClick={() => handleFolderAdd2(chip)}
                  className="relative inline-flex items-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;

import { useAtom } from "jotai";
import { folderAtom, folderAtom2 } from "./store/folderAtom";
import { StandardChip, updatedStandardChips } from "./utils/chips";
import { useState } from "react";

function App() {
  const [folder, setFolderItem] = useAtom(folderAtom);
  const [folder2, setFolderItem2] = useAtom(folderAtom2);
  const [count, setCount] = useState<any>({});

  // const handleFolderAdd = (chip: any) => {
  //   const found = folder2.get(chip.key);
  //   if (found) {
  //     setFolderItem2(
  //       (prev: any) =>
  //         new Map([
  //           ...prev,
  //           [
  //             chip.key,
  //             { count: found.count + 1, name: chip.name, key: chip.key },
  //           ],
  //         ])
  //     );
  //   } else {
  //     // setFolderItem([...folder, { ...chip, count: 1 }]);
  //     setFolderItem2(
  //       (prev: any) =>
  //         new Map([
  //           ...prev,
  //           [chip.key, { count: 1, name: chip.name, key: chip.key }],
  //         ])
  //     );
  //   }
  // };

  const getTotalCount = () => {
    const values = Object.values<any>(count);
    const totalCount = values.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return totalCount;
  };

  const handleFolderAdd = (chip: StandardChip) => {
    const megaChip = 5;
    const gigaChip = 1;

    console.log(chip);

    if (count[chip.key] >= 4) {
      console.log("can't add anymore");
      return;
    } else {
      if (count[chip.key]) {
        setCount((prevCount: any) => ({
          ...count,
          [chip.key.toString()]: prevCount[chip.key.toString()] + 1,
        }));
      } else {
        setCount((prevCount: any) => ({
          ...prevCount,
          [chip.key.toString()]: 1,
        }));
      }
    }

    console.log(count);
  };

  return (
    <div className="flex flex-col items-center">
      {/* <div className="mx-4 max-w-7xl sm:mx-32"> */}
      <div className="grid grid-cols-1 gap-8 py-6 lg:grid-cols-2">
        <div className="pb-10 lg:w-5/6">
          <p>Total Chips: {getTotalCount()} / 30</p>
          {/* {Object.keys(count).map((a) => {
            return <p>{a}</p>;
          })} */}
          {Object.entries<any>(count).map(([key, value]) => (
            <p key={key}>
              Key: {key}, Value: {value}
            </p>
          ))}
          {/* {folder.map((chip) => {
            return (
              <div className="flex" key={chip.key}>
                <div className="flex">
                  <p>{chip.name} </p> <p>{chip.lettercode}</p>
                </div>
                <button
                  onClick={() =>
                    setFolderItem(folder.filter((c) => c.key !== chip.key))
                  }
                  className="relative inline-flex items-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
                >
                  -
                </button>
              </div>
            );
          })} */}
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
                  onClick={() => handleFolderAdd(chip)}
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

import { useAtom } from "jotai";
import { folderAtom, folderAtom2 } from "./store/folderAtom";
import { StandardChip, updatedStandardChips } from "./utils/chips";
import { useState } from "react";

function App() {
  const [folder, setFolderItem] = useAtom(folderAtom);
  const [folder2, setFolderItem2] = useAtom(folderAtom2);
  const [count, setCount] = useState<any>({});
  const [myMap, setMap] = useState(new Map());

  const getTotalCount = () => {
    let totalCount = 0;
    Array.from(myMap.entries()).map((e) => {
      const [key, value] = e;
      value.forEach((v: any) => {
        totalCount += v.count;
      });
    });
    return totalCount;
  };

  const handleFolderAdd = (chip: StandardChip) => {
    const megaChip = 5;
    const gigaChip = 1;

    if (myMap.has(chip.name)) {
      const foundChips = myMap.get(chip.name);

      const chipIndex = foundChips.findIndex(
        (fC: any) => fC.lettercode === chip.lettercode
      );

      if (chipIndex > -1) {
        const foundChip = foundChips[chipIndex];
        const updatedChip = { ...chip, count: foundChip.count + 1 };
        const clonedChips = [...foundChips];
        clonedChips[chipIndex] = updatedChip;

        setMap(new Map(myMap.set(chip.name, clonedChips)));
      } else {
        setMap(
          new Map(
            myMap.set(chip.name, [
              ...foundChips,
              {
                count: 1,
                name: chip.name,
                lettercode: chip.lettercode,
              },
            ])
          )
        );
      }
    } else {
      setMap(
        new Map(
          myMap.set(chip.name, [
            { count: 1, name: chip.name, lettercode: chip.lettercode },
          ])
        )
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* <div className="mx-4 max-w-7xl sm:mx-32"> */}
      <div className="grid grid-cols-1 gap-8 py-6 lg:grid-cols-2">
        <div className="pb-10 lg:w-5/6">
          <p>Total Chips: {getTotalCount()} / 30</p>

          {[...myMap.values()].map((e) => {
            return e.map((p: any) => {
              return (
                <div className="" key={p.name + p.lettercode}>
                  <div className="flex">
                    <p>{p.name} </p> <p>{p.lettercode}</p>
                  </div>
                  <div className="flex">
                    <p>Total: {p.count} / 4</p>
                  </div>
                  <button
                    // onClick={() =>
                    //   setFolderItem(folder.filter((c) => c.key !== chip.key))
                    // }
                    className="relative inline-flex items-center rounded-md border border-pink-700 bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border-pink-800 hover:bg-pink-700"
                  >
                    -
                  </button>
                </div>
              );
            });
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

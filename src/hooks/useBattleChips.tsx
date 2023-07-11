import { useMemo, useState } from "react";
import { standardChips } from "../utils/chips";
import { megaChips } from "../utils/megaChips";
import { gigaChips } from "../utils/gigaChips";
import { Chip, SortOrder } from "../types/chip";

export default function useBattleChips(currentTabIndex: number) {
  const [chipLibrary] = useState<{
    Standard: Chip[];
    Mega: Chip[];
    Giga: Chip[];
  }>({
    Standard: standardChips as Chip[],
    Mega: megaChips as Chip[],
    Giga: gigaChips as Chip[],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentStateFilters, setFilters] = useState<SortOrder>("default");
  // const [sortDirection, setSortDirection] = useState<SortOrder>('default');

  // const sortOptions = [
  //   { name: "Most Popular", href: "#", current: true },
  //   { name: "Id", href: "#", current: true },
  //   { name: "ABCDE", href: "#", current: false },
  //   { name: "Code", href: "#", current: false },
  //   { name: "Damage", href: "#", current: false },
  //   { name: "Element", href: "#", current: false },
  //   { name: "MB", href: "#", current: false },
  // ];

  // const [setCurrentStateFilters2, setFilters2] = useState([
  //   { name: "Most Popular", href: "#", current: true },
  //   { name: "Id", href: "#", current: true },
  //   { name: "ABCDE", href: "#", current: false },
  //   { name: "Code", href: "#", current: false },
  //   { name: "Damage", href: "#", current: false },
  //   { name: "Element", href: "#", current: false },
  //   { name: "MB", href: "#", current: false },
  // ]);

  const sortByMemory = (a: Chip, b: Chip) => {
    if (currentStateFilters === "MB") {
      return a.memory - b.memory;
    } else if (currentStateFilters === "default") {
      return 0;
    }
  };

  const filteredBattleChips = useMemo(
    () =>
      Object.values(chipLibrary)
        [currentTabIndex].filter((cl) =>
          cl.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
        // @ts-ignore
        .sort(sortByMemory),
    [chipLibrary, currentTabIndex, searchTerm, currentStateFilters]
  );

  return {
    originalChipLibrary: chipLibrary,
    chipLibrary: filteredBattleChips,
    setSearchTerm: setSearchTerm,
    searchTerm: searchTerm,
    setFilters: setFilters,
  };
}

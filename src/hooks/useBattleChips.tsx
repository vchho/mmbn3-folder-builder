import { useMemo, useState } from "react";
import { Chip, standardChips } from "../utils/chips";
import { megaChips } from "../utils/megaChips";
import { gigaChips } from "../utils/gigaChips";

export default function useBattleChips(currentTabIndex: number) {
  const [chipLibrary] = useState<{
    Standard: Chip[];
    Mega: Chip[];
    Giga: Chip[];
  }>({
    Standard: standardChips,
    Mega: megaChips,
    Giga: gigaChips,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentStateFilters, setFilters] = useState({
    id: "off",
    abcde: "off",
    memory: "off",
  });

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
    if (currentStateFilters.memory === "asc") {
      // @ts-ignore
      return a.memory - b.memory;
    } else if (currentStateFilters.memory === "desc") {
      // @ts-ignore
      return b.memory - a.memory;
    } else {
      return 0;
    }
  };

  const filteredBattleChips = useMemo(
    () =>
      Object.values(chipLibrary)
        [currentTabIndex].filter((cl) =>
          cl.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
        .sort(sortByMemory),
    [chipLibrary, currentTabIndex, searchTerm]
  );

  return {
    originalChipLibrary: chipLibrary,
    chipLibrary: filteredBattleChips,
    setSearchTerm: setSearchTerm,
    searchTerm: searchTerm,
    setFilters: setFilters,
  };
}

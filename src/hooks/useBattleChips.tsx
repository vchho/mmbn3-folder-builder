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
  // const [sortDirection, setSortDirection] =
  //   useState<SortOrderDirection>("ascending");

  const sortByMemory = (a: Chip, b: Chip) => {
    if (currentStateFilters === "MB") {
      return a.memory - b.memory;
    } else if (currentStateFilters === "Alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (currentStateFilters === "Code") {
      return a.lettercode.localeCompare(b.lettercode);
    } else if (currentStateFilters === "Damage") {
      // Edge case where some chips may have '-' as a damage value
      return a.damage.localeCompare(b.damage);
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

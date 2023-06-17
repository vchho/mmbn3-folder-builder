import { useMemo, useState } from "react";
import { updatedStandardChips } from "../utils/chips";
import { megaChips } from "../utils/megaChips";
import { gigaChips } from "../utils/gigaChips";

export default function useBattleChips(currentTabIndex: number) {
  const [chipLibrary] = useState({
    Standard: updatedStandardChips,
    Mega: megaChips,
    Giga: gigaChips,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBattleChips = useMemo(
    () =>
      Object.values(chipLibrary)[currentTabIndex].filter((cl) =>
        cl.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      ),
    [chipLibrary, currentTabIndex, searchTerm]
  );

  return {
    originalChipLibrary: chipLibrary,
    chipLibrary: filteredBattleChips,
    setSearchTerm: setSearchTerm,
    searchTerm: searchTerm,
  };
}

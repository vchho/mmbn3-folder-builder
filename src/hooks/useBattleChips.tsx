import { useMemo, useState } from "react";
import { updatedStandardChips } from "../utils/chips";
import { megaChips } from "../utils/megaChips";

export default function useBattleChips(currentTabIndex: number) {
  const [chipLibrary] = useState({
    Standard: updatedStandardChips,
    Mega: megaChips,
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
  };
}

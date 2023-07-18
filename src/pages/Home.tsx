import { Link } from "react-router-dom";
import { FolderCard } from "../components/FolderCard";
import useLocalStorage from "../hooks/useLocalStorage";
import { FolderObject } from "../types/chip";

export const Home = () => {
  const [storedValue, setValueWrap] = useLocalStorage<FolderObject[]>(
    "mmbn3-folder-builder",
    [],
  );

  const deleteFolder = (index: number) => {
    const modifiedArray = storedValue.filter((_, i) => i !== index);

    setValueWrap(modifiedArray);
  };

  return (
    <div className="relative min-h-screen w-screen items-stretch bg-blue-300 p-6">
      <div className="relative mx-auto block max-w-screen-xl flex-col">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-bold text-white">
            MMBN3 Folder Builder
          </h1>
          <Link
            to={"/create"}
            className="rounded bg-orange-600 p-4 text-gray-800 shadow hover:shadow-md"
          >
            Create A Folder!
          </Link>
        </header>

        <div className="relative mx-auto grid w-full grid-flow-row-dense grid-cols-2 gap-x-8 gap-y-6 px-6 pt-20 text-center sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:gap-x-10 xl:px-0">
          {storedValue.map((folder, index) => {
            return (
              <FolderCard
                id={folder.id}
                key={folder.id}
                deleteFolder={deleteFolder}
                index={index}
                folderName={folder.folderName}
                folderImage={folder.folderImage!}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

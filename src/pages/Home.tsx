import { Link } from "react-router-dom";
import { FolderCard } from "../components/FolderCard";
import useLocalStorage from "../hooks/useLocalStorage";
import { setFolder } from "./Create";

export const Home = () => {
  const [storedValue] = useLocalStorage<setFolder[]>(
    "mmbn3-folder-builder",
    []
  );

  return (
    <>
      <div className="relative min-h-screen w-screen items-stretch bg-blue-300 p-6">
        {/* <div className="bg-gray-100 font-sans text-gray-900  dark:bg-gray-800 dark:text-gray-400"> */}
        {/* <div className="relative mx-auto block h-screen max-w-screen-xl flex-col"> */}
        <div className="relative mx-auto block max-w-screen-xl flex-col">
          <header className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-bold">MMBN3 Folder Builder</h1>
            <Link
              to={"/create"}
              className="rounded bg-orange-600 p-4 text-gray-800 shadow hover:shadow-md"
            >
              Create A Folder!
            </Link>
          </header>

          <div className="relative mx-auto grid w-full grid-flow-row-dense grid-cols-2 gap-x-8 gap-y-6 px-6 pt-20 text-center sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:gap-x-10 xl:px-0">
            {/* {Array(10)
              .fill(5)
              .map(() => {
                return <FolderCard />;
              })} */}
            {storedValue.map((folder) => {
              return <FolderCard id={folder.id} key={folder.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
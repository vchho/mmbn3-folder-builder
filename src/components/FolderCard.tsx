import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/20/solid";

export const FolderCard = ({
  id,
  deleteFolder,
  index,
  folderName,
  folderImage,
}: {
  id: string;
  deleteFolder: (index: number) => void;
  index: number;
  folderName: string;
  folderImage: string;
}) => {
  return (
    <div className="relative col-span-1 sm:col-span-2">
      <div className="relative overflow-hidden rounded-md shadow-lg">
        <div className="relative">
          {folderImage ? (
            <img alt={`${folderName}'s image`} src={folderImage} />
          ) : (
            <img
              alt="Placeholder Image"
              src="https://vignette.wikia.nocookie.net/fantendo/images/b/b9/MbnCW.png/revision/latest?cb=20170825221109"
            />
          )}
        </div>
      </div>
      <div className="mt-3 flex content-center justify-between truncate pb-1 text-left">
        <Link
          to={`/create/${id}`}
          className="font-semibold transition hover:text-red-800 dark:text-white dark:hover:text-gray-200"
        >
          {folderName}
        </Link>
        <TrashIcon
          className="h-5 cursor-pointer text-sm transition hover:text-red-500"
          onClick={() => deleteFolder(index)}
        />
      </div>
    </div>
  );
};

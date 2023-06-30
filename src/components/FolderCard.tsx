export const FolderCard = () => {
  return (
    <div className="relative col-span-1 sm:col-span-2">
      <div className="relative overflow-hidden rounded-md shadow-lg">
        <div className="relative">
          <img
            alt="Placeholder Image"
            src="https://vignette.wikia.nocookie.net/fantendo/images/b/b9/MbnCW.png/revision/latest?cb=20170825221109"
          />
        </div>
      </div>
      <div className="mt-3 block truncate pb-1 text-left">
        <a className="font-semibold transition hover:text-red-800 dark:text-white dark:hover:text-gray-200">
          Hello World
        </a>
      </div>
    </div>
  );
};

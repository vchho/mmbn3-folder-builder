# MMBN3 Folder Builder (cool name coming soon\*)

Built with:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/)

## Getting Started

Clone the app locally and in the root directory of the project, run:

```bash
npm install
```

Afterwards run:

```bash
npm run dev
```

The app should run on port 5173

## Testing

This app has _some_ testing via React Testing Library and Vitest.

```bash
npm run test
```

For coverage

```bash
npm run coverage
```

## Features

- Users can create / read / edit / delete their own folders that are saved in the browser's local storage
- Users can search through the list of chips

## TODOS:

- Update UI? It's not the greatest but it's something 😶
- Implement chip sorting by:
  - Id - sort by chip id
  - ABCDE - sort by chip name
  - Code - sort by chip code
  - Damage - sort by chip damage
  - Element - sort by element - fire, water, elec, grass, null
  - MB - sort by megabyte size

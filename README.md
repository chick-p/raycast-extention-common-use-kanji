# Common-Use Kanji (常用漢字) for Raycast

A [Raycast](https://www.raycast.com/) extension to look up whether a kanji character is a [Jōyō kanji](https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D_kanji) (常用漢字 — the 2,136 kanji designated for general use in Japan).

## Features

- Search kanji characters to check if they are common-use (Jōyō) kanji
- View readings (yomi) and example words for each matched kanji

## Requirements

- [Raycast](https://www.raycast.com/) v1.50.0 or later

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) v24 or later
- [pnpm](https://pnpm.io/) v11 or later

### Setup

```bash
git clone https://github.com/chick-p/raycast-extention-common-use-kanji.git
cd raycast-extention-common-use-kanji
pnpm install
```

### Available Commands

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm run dev`   | Start development mode (hot reload) |
| `pnpm run build` | Build the extension                 |
| `pnpm run lint`  | Run Prettier and ESLint checks      |
| `pnpm run fix`   | Auto-fix formatting and lint issues |

### Development Mode

Run `pnpm run dev` to start the extension in development mode, then open Raycast and search for the extension name.

## License

MIT

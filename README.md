# Shos.MahjongFlushPractice

English | [日本語](README.ja.md)

Mahjong Flush Practice (麻雀 清一色の練習) is a single-page browser app for practicing one-suit flush (*chiniisou*, 清一色) hands. It shows a random 13-tile ready-to-win hand (*tenpai*, 聴牌) made of a single suit, and you pick every tile that would complete it (the winning tiles, *machi*, 待ち).

## Sample Page

* [Mahjong Flush Practice | Sho's Software](https://www.shos.info/doc/chiniisou.html "Mahjong Flush Practice | Sho's Software")

![Screenshot](screenshot.png "Screenshot")

## Features

* **Winning-hand check including seven pairs**: a hand counts as complete if it is four sets plus a pair, or seven pairs (*chiitoitsu*, 七対子). The answer lists every tile that completes the hand.
* **Suit selection**: characters (*manzu*, 萬子), dots (*pinzu*, 筒子), or bamboos (*souzu*, 索子).
* **Font or image tiles**: tiles are drawn either with Unicode mahjong characters or with GIF images. If the font does not display correctly, choose "Images".
* **Tile size**: small, medium, or large.
* **Sorting (*riipai*, 理牌)**: show the hand sorted, or in a shuffled order.
* **Japanese / English UI**: the default follows your browser's language, and can be switched on the page.
* **Saved settings**: the display settings above are saved in the browser's `localStorage` and restored on the next visit.
* **Score**: the page shows the number of correct answers out of the number of questions answered.

## How to Use

1. Open the page. A ready-to-win hand is shown below the buttons.
2. Under "Winning tiles?", check every rank (1–9) you think completes the hand. "Clear" unchecks them all.
3. Press "Show winning tiles". The correct winning tiles appear under the hand, and the answer counts as correct only if your checks match them exactly. The score is updated.
4. Press "Next" for a new question.

Display settings can be changed at any time, and are applied immediately to the current hand.

## Development

### Requirements

* [Node.js](https://nodejs.org/) (with npm)

### Build

```sh
npm install
npm run build
```

`npm run build` runs two steps, which can also be run separately:

* `npm run build:ts`: compiles `chiniisou.ts` with TypeScript into `chiniisou.js` (and `chiniisou.js.map`).
* `npm run build:min`: minifies `chiniisou.js` into `chiniisou.min.js` with terser, and `chiniisou.css` into `chiniisou.min.css` with clean-css.

> **Note:** `chiniisou.html` loads `chiniisou.min.js` and `chiniisou.min.css`, not the unminified files. Always run `npm run build` after changing `chiniisou.ts` or `chiniisou.css`, or your changes will not show up on the page.

### Run Locally

Serve the repository root over HTTP and open `chiniisou.html`, for example:

```sh
npx http-server -p 8080
```

Then open <http://localhost:8080/chiniisou.html>. (`.vscode/launch.json` contains a Chrome debug configuration for `http://localhost:8080`.)

jQuery and Bootstrap are loaded from CDNs, so an internet connection is required. The header and separator images (`../css/image/line.jpg`) and navigation links refer to the hosting website and are not part of this repository.

## Files

| File | Description |
| --- | --- |
| `chiniisou.html` | The page |
| `chiniisou.ts` | All application logic (TypeScript source) |
| `chiniisou.css` | Stylesheet |
| `chiniisou.js`, `chiniisou.js.map` | Compiled JavaScript and its source map (generated) |
| `chiniisou.min.js`, `chiniisou.min.css` | Minified files loaded by the page (generated) |
| `images/` | Tile images used in image mode |
| `package.json`, `tsconfig.json` | Build scripts and TypeScript settings |

## Author Info

Fujio Kojima: a software developer in Japan
* Microsoft MVP for Development Tools - Visual C# (Jul. 2005 - Dec. 2014)
* Microsoft MVP for .NET (Jan. 2015 - Oct. 2015)
* Microsoft MVP for Visual Studio and Development Technologies (Nov. 2015 - Jun. 2018)
* Microsoft MVP for Developer Technologies (Nov. 2018 - Jun. 2027)
* [MVP Profile](https://mvp.microsoft.com/en-US/mvp/profile/4185d172-3c9a-e411-93f2-9cb65495d3c4 "MVP Profile")
* [Blog (Japanese)](https://wp.shos.info "Blog (Japanese)")
* [Web Site (Japanese)](https://www.shos.info "Web Site (Japanese)")

## License

This library is under the MIT License.

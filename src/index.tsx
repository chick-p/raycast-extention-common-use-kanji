import { useEffect, useState } from "react";
import fs from "fs";
import path from "path";
import { List, showToast, Toast } from "@raycast/api";

type KanjiCollection = {
  characters: string[];
  yomi: string;
  example: string;
};

type Kanji = {
  character: string;
} & Partial<Pick<KanjiCollection, "yomi">>;

export default function JoyoResultsList() {
  const [query, setQuery] = useState<null | string>(null);
  const [state, setState] = useState<Kanji[]>([]);

  useEffect(() => {
    async function search() {
      if (!query) {
        setState([]);
        return;
      }
      const results = await searchJoyoKanjiByQuery(query);
      setState(results);
    }
    search();
  }, [query]);

  return (
    <List searchBarPlaceholder="Type kanji..." onSearchTextChange={(text) => setQuery(text)} throttle>
      {state.map((result, idx) => (
        <List.Item
          id={idx.toString()}
          key={idx}
          title={result.character}
          icon="icon.png"
          subtitle={result.yomi || "常用漢字ではありません。"}
        />
      ))}
    </List>
  );
}

async function readFile(): Promise<string> {
  const filePath = path.resolve(__dirname, "assets/dataset.json");
  const stream = fs.createReadStream(filePath);
  const content = await readStream(stream);
  return content;
}

async function readStream(stream: fs.ReadStream): Promise<string> {
  let content = "";
  for await (const chunk of stream) {
    content += chunk;
  }
  return content;
}

async function searchJoyoKanjiByQuery(query: string): Promise<Kanji[]> {
  try {
    const content = await readFile();
    const { kanji: data } = JSON.parse(content) as { [key: string]: KanjiCollection[] };
    return query.split("").reduce<Kanji[]>((kanjiItems, q) => {
      const kanji = data.find((v) => v.characters.find((c) => c === q));
      return [
        ...kanjiItems,
        {
          character: q,
          yomi: kanji?.yomi,
        },
      ];
    }, []);
  } catch (error) {
    console.error(error);
    showToast(Toast.Style.Failure, `Could not load a common-use kanji collection file. ${error}`);
    return Promise.resolve([]);
  }
}

import Head from "next/head";
import { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import { AnalyticsWrapper } from "../components/analytics";
import BrailleLetter from "../components/BrailleLetter";

export default function Home() {
  const [text, setText] = useState("merhaba");
  const [loading, setLoading] = useState(false);
  const [brailleDots, setBrailleDots] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/translate?text=${text}`);
    const brailleDots = await res.json();
    setBrailleDots(brailleDots);
    setLoading(false);
  }

  useEffect(() => {
    handleSubmit({ preventDefault: () => {} });
  }, []);

  const download = () => {
    const node = document.getElementById("canvas");
    domtoimage.toPng(node).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href =
        "data:image/png;base64," +
        dataUrl.replace("data:image/png;base64,", "");
      link.click();
    });
  };

  return (
    <>
      <Head>
        <title>Braille translator</title>{" "}
        <meta name="description" content="Transtlate text to braile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <AnalyticsWrapper />
        <h1 className="text-4xl font-bold text-gray-800 pb-4">
          Braille translator
        </h1>
        <p className="text-gray-600">
          You can use api to translate text to braille dots. for projects
          <br />
          <code
            className="bg-gray-200 rounded p-2"
            style={{ display: "inline-block" }}
          >
            {`https://brailletranslate.vercel.app/api/translate?text=${text}`}
          </code>
        </p>
        <p className="text-gray-600 mt-4">
          Enter some text below and we'll convert it to Braille dots.
        </p>
        <form onSubmit={handleSubmit}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="text"
          >
            Text to translate
          </label>
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between border-b border-b-2 border-teal-500 py-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              id="text"
              name="text"
              className="block border border-gray-300 rounded p-2 w-full appearance-none leading-normal focus:outline-none focus:border-gray-500"
            />
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
              type="submit"
            >
              Translate
            </button>
          </div>
        </form>
        {/*  
          string map to array  
          split to array of letters
        */}
        <div id="canvas" className="flex flex-wrap gap-2 p-4">
          {brailleDots.split(" ").map((word, index) => {
            return <BrailleLetter key={index} dots={word} />;
          })}
        </div>
        <button
          onClick={download}
          className="mt-4 border p-2 rounded-lg text-gray-600"
        >
          Download
        </button>
        <a
          href="https://twitter.com/umutkesk1n"
          aria-label="Umut keskin twitter account"
          className="fixed bottom-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
        >
          @umutkesk1n
        </a>
        <a
          href="https://github.com/ukeskin/text-to-braille"
          aria-label="Umut keskin twitter account"
          className="fixed bottom-0 left-0 m-4 bg-gray-800 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
        >
          Source Code
        </a>
      </main>
    </>
  );
}

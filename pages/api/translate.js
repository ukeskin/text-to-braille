// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { text } = req.query;

  if (!text) res.status(400).json("No text provided");

  // Convert the text to Braille dots
  const brailleDots = convertTextToBrailleDots(text);

  // Send the Braille dots back in the response
  res.json(brailleDots);
}

function convertTextToBrailleDots(text) {
  const brailleDotsLookup = {
    a: "100000",
    b: "110000",
    c: "100100",
    d: "100110",
    e: "100010",
    f: "110100",
    g: "110110",
    h: "110010",
    i: "010100",
    ı: "010100",
    j: "010110",
    k: "101000",
    l: "111000",
    m: "101100",
    n: "101110",
    o: "101010",
    ö: "010100",
    p: "111100",
    q: "111110",
    r: "111010",
    s: "011100",
    t: "011110",
    u: "101001",
    ü: "101001",
    v: "111001",
    w: "010111",
    x: "101101",
    y: "101111",
    z: "101011",
    1: "100000",
    2: "110000",
    3: "100100",
    4: "100110",
    5: "100010",
    6: "110100",
    7: "110110",
    8: "110010",
    9: "010100",
    0: "010110",
  };

  // Initialize the result to an empty string
  let brailleDots = "";

  // Loop through each character in the text
  for (const char of text) {
    // Get the Braille dots for the current character
    const charBrailleDots = brailleDotsLookup[char.toLowerCase()];

    // If the character has a corresponding Braille dots representation,
    // add it to the result. Otherwise, add new array of 6 zeros
    if (charBrailleDots) {
      brailleDots += charBrailleDots;
    } else {
      brailleDots += "000000";
    }

    // Add a space between each character
    brailleDots += " ";
  }

  // delete the last space from the result
  brailleDots = brailleDots.slice(0, -1);

  // Return the result
  return brailleDots;
}

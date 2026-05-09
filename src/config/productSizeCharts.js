const STANDARD_SIX_SIZES = Object.freeze(["XS", "S", "M", "L", "XL", "XXL"]);
const EXTENDED_EIGHT_SIZES = Object.freeze([
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
]);

const SIX_SIZE_CHEST_CM = Object.freeze([75, 80, 85, 90, 95, 100]);
const SIX_SIZE_CHEST_INCH = Object.freeze([30, 32, 34, 36, 38, 40]);
const EIGHT_SIZE_CHEST_CM = Object.freeze([75, 80, 85, 90, 95, 100, 105, 110]);
const EIGHT_SIZE_CHEST_INCH = Object.freeze([30, 32, 34, 36, 38, 40, 42, 44]);

function normalizeLookupValue(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/#/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function buildChart(sizes, chestCm, chestInch) {
  return Object.freeze({
    sizes,
    rows: Object.freeze([
      Object.freeze({
        label: "Chest (CM)",
        values: chestCm,
      }),
      Object.freeze({
        label: "Chest (INCH)",
        values: chestInch,
      }),
    ]),
  });
}

const standardSixChart = buildChart(
  STANDARD_SIX_SIZES,
  SIX_SIZE_CHEST_CM,
  SIX_SIZE_CHEST_INCH,
);

const extendedEightChart = buildChart(
  EXTENDED_EIGHT_SIZES,
  EIGHT_SIZE_CHEST_CM,
  EIGHT_SIZE_CHEST_INCH,
);

const rawChartConfig = [
  {
    id: "vest",
    aliases: ["Vest", "Classic Vest", "RN", "RNS", "RNS T-Shirt", "Vests"],
    slugs: ["classic-vest"],
    chart: standardSixChart,
  },
  {
    id: "t-shirt",
    aliases: [
      "T-Shirt",
      "TShirt",
      "Essential T-Shirt",
      "Round Neck Tee",
      "Round Neck Tees",
    ],
    slugs: ["essential-t-shirt"],
    chart: standardSixChart,
  },
  {
    id: "mojo-t-shirt",
    aliases: ["Mojo T-Shirt", "Mojo TShirt"],
    slugs: ["mojo-t-shirt"],
    chart: standardSixChart,
  },
  {
    id: "cut-brief-111",
    aliases: ["Cut Brief #111", "Cut Brief"],
    slugs: ["cut-brief"],
    chart: extendedEightChart,
  },
  {
    id: "boxer-666",
    aliases: ["Boxer #666", "Boxer", "Comfort Boxer"],
    slugs: ["comfort-boxer"],
    chart: extendedEightChart,
  },
  {
    id: "mini-trunk-333",
    aliases: ["Mini Trunk #333", "Mini Trunk"],
    slugs: ["mini-trunk"],
    chart: extendedEightChart,
  },
  {
    id: "long-trunk-555",
    aliases: ["Long Trunk #555", "Long Trunk"],
    slugs: ["long-trunk"],
    chart: extendedEightChart,
  },
  {
    id: "interlock-drawer-999",
    aliases: ["Interlock Drawer #999", "Interlock Drawer"],
    slugs: ["interlock-drawer"],
    chart: extendedEightChart,
  },
  {
    id: "interlock-pocket-drawer-777",
    aliases: [
      "Interlock Pocket Drawer #777",
      "Interlock Pocket Drawer",
    ],
    slugs: ["interlock-pocket-drawer"],
    chart: extendedEightChart,
  },
  {
    id: "buddy-mercerised-printed-bermuda",
    aliases: ["Buddy Mercerised Printed Bermuda"],
    slugs: ["buddy-mercerised-printed-bermuda"],
    chart: extendedEightChart,
  },
  {
    id: "track-pant",
    aliases: ["Track Pant", "Track Pants"],
    slugs: ["track-pant"],
    chart: extendedEightChart,
  },
  {
    id: "rosy-panty",
    aliases: ["Rosy Panty"],
    slugs: ["rosy-panty"],
    chart: standardSixChart,
  },
  {
    id: "lumi-panty",
    aliases: ["Lumi Panty"],
    slugs: ["lumi-panty"],
    chart: standardSixChart,
  },
  {
    id: "slips",
    aliases: ["Slips", "Classic Slips"],
    slugs: ["classic-slips", "slips"],
    chart: standardSixChart,
  },
];

const productSizeChartConfig = Object.freeze(
  rawChartConfig.map((entry) =>
    Object.freeze({
      ...entry,
      keys: Object.freeze(
        [...entry.aliases, ...entry.slugs, entry.id]
          .map(normalizeLookupValue)
          .filter(Boolean),
      ),
    }),
  ),
);

const exactLookup = new Map();

for (const entry of productSizeChartConfig) {
  for (const key of entry.keys) {
    exactLookup.set(key, entry.chart);
  }
}

function findByPartialMatch(candidate) {
  for (const entry of productSizeChartConfig) {
    if (entry.keys.some((key) => candidate.includes(key))) {
      return entry.chart;
    }
  }

  return null;
}

export function getProductSizeChart(product) {
  if (!product) return null;

  const candidates = [
    product.sizeChartKey,
    product.slug,
    product.name,
    product.category,
    product.type,
    product.product_type,
  ]
    .map(normalizeLookupValue)
    .filter(Boolean);

  for (const candidate of candidates) {
    const exactMatch = exactLookup.get(candidate);

    if (exactMatch) {
      return exactMatch;
    }
  }

  for (const candidate of candidates) {
    const fuzzyMatch = findByPartialMatch(candidate);

    if (fuzzyMatch) {
      return fuzzyMatch;
    }
  }

  return null;
}

export { EXTENDED_EIGHT_SIZES, STANDARD_SIX_SIZES };

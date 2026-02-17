import vestImg from "../assets/collections/vest.png";
import tshirtImg from "../assets/collections/tshirt.png";
import bermudaImg from "../assets/collections/bermuda.png";
import trackpantsImg from "../assets/collections/trackpants.png";

export const products = [
  {
    id: "vest-001",
    name: "Premium Cotton Vest",
    price: 499,
    image: vestImg,
    category: "Vests",
    description: "Breathable everyday vest crafted for comfort and movement.",
    fabric: "100% Combed Cotton",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "tee-001",
    name: "Round Neck T-Shirt",
    price: 799,
    image: tshirtImg,
    category: "T-Shirts",
    description: "Soft knit round neck tee with a modern everyday fit.",
    fabric: "Cotton Blend",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "bermuda-001",
    name: "Relaxed Bermuda Shorts",
    price: 899,
    image: bermudaImg,
    category: "Bermuda",
    description: "Lightweight summer shorts designed for flexibility.",
    fabric: "Cotton Stretch",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "track-001",
    name: "Essential Track Pants",
    price: 1199,
    image: trackpantsImg,
    category: "Track Pants",
    description: "Flexible all-day track pants for comfort and mobility.",
    fabric: "Poly-Cotton Blend",
    sizes: ["S", "M", "L", "XL"],
  },
];

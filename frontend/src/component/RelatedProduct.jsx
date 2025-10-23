import React, { useContext, useEffect, useState } from "react";
import { shopdatacontext } from "../context/ShopContext";
import Card from "./Card";

const RelatedProducts = ({ currentProduct }) => {
  const { product } = useContext(shopdatacontext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!currentProduct || !product.length) return;

    const normalize = (str) => (str || "").toLowerCase().trim();

    // 🔥 Amazon-style smart recommendation algorithm
    const scored = product
      .filter((p) => p._id !== currentProduct._id)
      .map((p) => {
        let score = 0;

        // ✅ 1. Category matching (high weight)
        if (normalize(p.category) === normalize(currentProduct.category)) score += 5;

        // ✅ 2. Subcategory match (medium weight)
        if (normalize(p.subcategory) === normalize(currentProduct.subcategory)) score += 3;

        // ✅ 3. Keyword similarity (name-based)
        const currWords = normalize(currentProduct.name).split(" ");
        const prodWords = normalize(p.name).split(" ");
        const matchCount = currWords.filter((w) => prodWords.includes(w)).length;
        score += matchCount * 2;

        // ✅ 4. Price proximity (closer = higher)
        const priceDiff = Math.abs(p.price - currentProduct.price);
        if (priceDiff < 100) score += 3;
        else if (priceDiff < 300) score += 2;
        else if (priceDiff < 700) score += 1;

        // ✅ 5. Bestseller or rating-based priority (if available)
        if (p.bestseller) score += 2;
        if (p.rating && currentProduct.rating) {
          const ratingDiff = Math.abs(p.rating - currentProduct.rating);
          score += ratingDiff < 0.5 ? 1.5 : 0;
        }

        // ✅ 6. Random slight noise to keep variation (Amazon-style dynamic feed)
        score += Math.random() * 0.5;

        return { ...p, score };
      });

    // 🔽 Sort by final score (descending)
    const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 8);

    setRelated(sorted);
  }, [currentProduct, product]);

  if (!related.length) return null;

  return (
    <div className="mt-20 px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-teal-300">
        Recommended for You
      </h2>

      <div className="flex flex-wrap justify-center gap-[30px]">
        {related.map((item, i) => (
          <Card
            key={i}
            name={item.name}
            id={item._id}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

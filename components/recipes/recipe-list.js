import React, { useEffect, useState } from "react";
import classes from "./recipe-list.module.css";
import ViewRecipeBtn from "./view-recipe-btn";
import ArrowIpIcon from "../icons/arrow-up-icon";
import Link from "next/link";

export default function RecipeList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mongodb");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData.comments || []); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className={classes.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={classes.error}>Error: {error.message}</p>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Recipes</h1>
      <div className={classes.cardContainer}>
        {data.map((item) => (
          <div className={classes.card} key={item._id}>
            <div className={classes.cardImageContainer}>
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt="Item Image"
                  className={classes.cardImage}
                />
              ) : (
                <div className={classes.noImage}>No Image</div>
              )}
            </div>
            <div className={classes.cardContent}>
              <h2 className={classes.cardTitle}>{item.title}</h2>

              <p className={classes.cardCategory}>Category: {item.category}</p>
              <Link href={`/recipe/${item._id}`}>
                    <ViewRecipeBtn />
              </Link>
              <ArrowIpIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

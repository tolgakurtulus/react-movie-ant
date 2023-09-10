import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import styles from "./styles.module.scss";

export default function Detail() {
  const [apiResult, setApiResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movideId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${movideId}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        console.log("response:", response.data);
        setApiResult(response.data);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles["c-detail"]}>
          <div className={styles["c-detail__row"]}>
            <div className={styles["c-detail__left"]}>
              <img src={`${apiResult.Poster}`} alt={`${apiResult.Title}`} />
            </div>
            <div className={styles["c-detail__right"]}>
              <div className={styles["c-detail__item"]}>
                <strong>Başlık :</strong>
                <p>{apiResult.Title}</p>
              </div>
              <div className={styles["c-detail__item"]}>
                <strong>Süre :</strong>
                <p>{apiResult.Runtime}</p>
              </div>
              <div className={styles["c-detail__item"]}>
                <strong>Tür :</strong>
                <p>{apiResult.Genre}</p>
              </div>
              <div className={styles["c-detail__item"]}>
                <strong>Yönetmen :</strong>
                <p>{apiResult.Director}</p>
              </div>
              <div className={styles["c-detail__item"]}>
                <strong>Oyuncular :</strong>
                <p>{apiResult.Actors}</p>
              </div>
              <div className={styles["c-detail__item"]}>
                <strong>IMDb Puanı :</strong>
                <p>{apiResult.imdbRating}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles["c-spinner"]}>
          <Spin size="large" />
        </div>
      )}
    </>
  );
}

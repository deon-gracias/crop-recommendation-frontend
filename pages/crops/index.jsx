import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingIcon from "../../components/LoadingIcon";
import styles from "../../styles/Crops.module.css";

const Crops = () => {
  const [crops, setCrops] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/crops`).then((response) => {
      setCrops(response.data.crops);
    });
  }, []);

  // console.log(crops);

  return (
    <div className={styles.container}>
      {crops ? (
        <>
          <h1 className={styles.title}>Crops</h1>
          <div className={styles.main}>
            {crops.map((crop) => (
              <Link
                key={crop.crop}
                href={`http://localhost:3000/crops/${crop.crop}`}
              >
                <div className={styles.card}>
                  <p className={styles.title}>
                    {crop.crop.replace(/^\w/, (c) => c.toUpperCase())}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
};

export default Crops;
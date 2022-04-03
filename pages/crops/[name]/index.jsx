import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import styles from "../../../styles/Crop.module.css";
import cropImgs from "../../../public/assets/crop_image.json";
import LoadingIcon from "../../../components/LoadingIcon";

const Crop = () => {
  const router = useRouter();
  const { name } = router.query;

  const [crop, setCrop] = useState();

  useEffect(() => {
    name &&
      axios.get(`${process.env.api}/crops?name=${name}`).then((response) => {
        setCrop(response.data.crop);
      });
  }, [name]);

  // console.log(cropImgs[name]);

  return (
    <div className={styles.container}>
      {crop ? (
        <main className={styles.main}>
          <Head>
            <title>{crop.crop.replace(/^\w/, (c) => c.toUpperCase())}</title>
          </Head>
          <div className={styles.grid}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "100%",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <Image
                src={cropImgs[name]}
                alt={name}
                width={100}
                height={100}
                objectFit="cover"
                placeholder="blue"
              />
            </div>
            <h3 className={styles.title}>
              {crop.crop.replace(/^\w/, (c) => c.toUpperCase())}
            </h3>
            <div className={styles.innerGrid}>
              <div className="grid-group">
                <div>N</div>
                <div className={styles.card}>{crop.N}</div>
              </div>
              <div className="grid-group">
                <div>P</div>
                <div className={styles.card}>{crop.P}</div>
              </div>
              <div className="grid-group">
                <div>K</div>
                <div className={styles.card}>{crop.K}</div>
              </div>
              <div className="grid-group">
                <div>pH</div>
                <div className={styles.card}>{crop.ph}</div>
              </div>
              <div className="grid-group">
                <div>Moisture</div>
                <div className={styles.card}>{crop.soil_moisture}</div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
};

export default Crop;

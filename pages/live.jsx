import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Live.module.css";
import cropImgs from "../public/assets/crop_image.json";
import { useRouter } from "next/router";
import { parse } from "path";

const features = {
  N: {
    name: "N",
    min: 0,
    max: 200,
    mid: 100,
  },
  P: {
    name: "P",
    min: 0,
    max: 200,
    mid: 100,
  },
  K: {
    name: "K",
    min: 0,
    max: 200,
    mid: 100,
  },
  temperature: {
    name: "Temperature",
    min: 0,
    max: 100,
    mid: 50,
  },
  humidity: {
    name: "Humidity",
    min: 0,
    max: 100,
    mid: 50,
  },
  ph: {
    name: "pH",
    min: 3,
    max: 10,
    mid: 7,
  },
  rainfall: {
    name: "Rainfall",
    min: 0,
    max: 300,
    mid: 150,
  },
};

const Live = () => {
  const router = useRouter();
  const { N, P, K, temperature, humidity, ph, rainfall } = router.query;

  const [values, setValues] = useState({
    N: N ? parseFloat(N) : features.N.mid,
    P: P ? parseFloat(P) : features.P.mid,
    K: K ? parseFloat(K) : features.K.mid,
    temperature: temperature
      ? parseFloat(temperature)
      : features.temperature.mid,
    humidity: humidity ? parseFloat(humidity) : features.humidity.mid,
    ph: ph ? parseFloat(ph) : features.ph.mid,
    rainfall: rainfall ? parseFloat(rainfall) : features.rainfall.mid,
  });

  const [recommended, setRecommended] = useState("");

  const getRecommended = async () => {
    await axios
      .post(`${process.env.api}/recommend`, {
        ...values,
      })
      .then((res) => {
        console.log(values);
        if (res.data.error) console.log(res.data.error);
        else setRecommended(res.data.recommended[0]);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => getRecommended(), 500);
    return () => clearTimeout(timer);
  }, [values]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Live</title>
      </Head>
      <div className={styles.rangeContainer}>
        {Object.entries(features).map(([key, feature]) => (
          <RangeSlider
            key={key}
            name={feature.name}
            min={feature.min}
            max={feature.max}
            value={values[key]}
            onChange={(e) => {
              setValues({ ...values, [key]: parseFloat(e.target.value) });
            }}
          />
        ))}
      </div>
      <div className={styles.card}>
        <p>Recommended</p>
        {recommended !== "" ? (
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image
              src={cropImgs[recommended]}
              alt={recommended}
              width={100}
              height={100}
              objectFit="cover"
              placeholder="blue"
            />
          </div>
        ) : (
          <>Loading</>
        )}
        <h2 className={styles.recommended}>
          <Link href={`/crops/${recommended}`}>
            {recommended.replace(/^\w/, (c) => c.toUpperCase())}
          </Link>
        </h2>
      </div>
    </div>
  );
};

const RangeSlider = ({ name, min, max, value, onChange }) => {
  return (
    <>
      <label className={styles.property} htmlFor={name}>
        {name}
      </label>
      <input
        name={name}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <label>{value}</label>
    </>
  );
};

export default Live;

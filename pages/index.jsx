import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import fields512 from "../public/fields-512x512.png";
import { AccessPoint, Growth, Login, LivePhoto } from "tabler-icons-react";

const Home = () => {
  const [inputValues, setInputValues] = useState({
    nitrogen: 45,
    phosphorus: 50,
    pottasium: 21,
    temperature: 40,
    humidity: 102,
    ph: 5,
    rainfall: 130,
    // nitrogen: "",
    // phosphorus: "",
    // pottasium: "",
    // temperature: "",
    // humidity: "",
    // ph: "",
    // rainfall: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(`${process.env.api}/recommend`, {
        ...inputValues,
      })
      .then((res) => {
        if (res.data.error) {
          console.log("Error : ", res.data.error);
          return;
        }
        const recommended = res.data.recommended[0];
        console.log(res.data);
        Router.push(`/crops/${recommended}`);
      });

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Crop Recommendation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src={fields512} height={100} width={100} alt="Crop Image" />
        <h1 className={styles.title}>Crop Recommendation</h1>

        <div className={styles.formContainer}>
          <form className={styles.form} method="post">
            {/* Nitrogen */}
            <label htmlFor="nitrogen-input">Nitrogen</label>
            <input
              id="nitrogen-input"
              name="nitrogen"
              className={styles.field}
              type="number"
              value={inputValues.nitrogen}
              step={0.01}
              onChange={onChangeHandler}
              disabled={loading}
              required
            />

            {/* Phosphorus */}
            <label htmlFor="phosphorus-input">Phosphorus</label>
            <input
              id="phosphorus-input"
              name="phosphorus"
              className={styles.field}
              type="number"
              value={inputValues.phosphorus}
              step={0.01}
              onChange={onChangeHandler}
              disabled={loading}
              required
            />

            {/* Pottasium */}
            <label htmlFor="pottasium-input">Pottasium</label>
            <input
              id="pottasium-input"
              name="pottasium"
              className={styles.field}
              type="number"
              value={inputValues.pottasium}
              step={0.01}
              onChange={onChangeHandler}
              disabled={loading}
              required
            />

            {/* Temperature */}
            <label htmlFor="temperature-input">Temperature</label>
            <input
              id="temperature-input"
              name="temperature"
              className={styles.field}
              type="number"
              value={inputValues.temperature}
              step={0.01}
              onChange={onChangeHandler}
              disabled={loading}
              required
            />

            {/* Humidity */}
            <label htmlFor="humidity-input">Humidity</label>
            <input
              id="humidity-input"
              name="humidity"
              className={styles.field}
              type="number"
              value={inputValues.humidity}
              step={0.01}
              onChange={onChangeHandler}
              disabled={loading}
              required
            />

            {/* pH */}
            <label htmlFor="ph-input">pH</label>
            <input
              id="ph-input"
              name="ph"
              className={styles.field}
              type="number"
              min={3}
              max={9}
              value={inputValues.ph}
              disabled={loading}
              step={0.01}
              onChange={onChangeHandler}
              required
            />

            {/* Rainfall */}
            <label htmlFor="rainfall-input">Rainfall (in mm)</label>
            <input
              id="rainfall-input"
              name="rainfall"
              className={styles.field}
              type="number"
              value={inputValues.rainfall}
              disabled={loading}
              step={0.01}
              onChange={onChangeHandler}
              required
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
      <div className={styles.tipContainer}>
        <Link href="/sensor" passHref>
          <div className={styles.tipBtn}>
            <AccessPoint /> Sensor
          </div>
        </Link>
        <Link href="/crops" passHref>
          <div className={styles.tipBtn}>
            <Growth /> Crops
          </div>
        </Link>
        <Link href="/live" passHref>
          <div className={styles.tipBtn}>
            <LivePhoto /> Live
          </div>
        </Link>
        <Link href="/login" passHref>
          <div className={styles.tipBtn}>
            <Login /> Login
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

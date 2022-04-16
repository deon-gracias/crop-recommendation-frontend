import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import cropImgs from "../public/assets/crop_image.json";
import avgRainfall from "../public/assets/avg_rainfall.json";
import styles from "../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import {
  Container,
  Grid,
  Text,
  Title,
  Card,
  NativeSelect,
  Overlay,
  Button,
  Box,
  Group,
  Modal,
  Avatar,
} from "@mantine/core";
import { Api, Logout } from "tabler-icons-react";
import axios from "axios";
import ApiKeyModal from "../components/ApiKeyModal";
import Head from "next/head";

const Dashboard = () => {
  const router = useRouter();

  const [user] = useAuthState(firebaseAuth);
  const [rainfall, setRainfall] = useState(avgRainfall[0]["rainfall"]);
  const [indianState, setIndianState] = useState(avgRainfall[0]["state"]);
  const [sensorData, setSensorData] = useState({
    // N: "N/A",
    // P: "N/A",
    // K: "N/A",
    // temperature: "N/A",
    // humidity: "N/A",
    // ph: "N/A",
    // moisture: "N/A",
    N: 45,
    P: 50,
    K: 21,
    temperature: 40,
    humidity: 102,
    ph: 5,
    moisture: 90,
  });
  const [recommended, setRecommended] = useState("");
  const [apiModalOpen, setApiModalOpen] = useState(false);

  !user && router.push("/login");
  // console.log(user);

  const currMonth = new Date().getMonth();
  const season = currMonth > 4 && currMonth < 10 ? "Kharif" : "Rabi";

  function handleChange(value) {
    setIndianState(value);

    for (let i = 0; avgRainfall.length > i; i += 1) {
      if (avgRainfall[i].state === value) {
        setRainfall(avgRainfall[i].rainfall);
        return;
      }
    }
  }

  function getSensorData() {
    axios
      .get(
        `https://api.thingspeak.com/channels/1679666/feeds.json?api_key=${process.env.thingSpeakApiKey}&results=1`
      )
      .then((res) => {
        const data = res.data;
        console.log("Sensor Data", data);

        if (data.feeds.length > 0) {
          const { N, P, K } = feeds[0].field6.split(",");
          setSensorData({
            N: parseInt(N),
            P: parseInt(P),
            K: parseInt(K),
            temperature: feeds[0].field1,
            humidity: feeds[0].field2,
            ph: Math.floor(Math.random() * 10),
            rainfall: parseInt(rainfall.replace(",", "")),
            moisture: feeds[0].field5,
          });
        }

        console.log("Data Sent to ML",{
          N: sensorData.N,
          P: sensorData.P,
          K: sensorData.K,
          temperature: sensorData.temperature,
          humidity: sensorData.humidity,
          ph: sensorData.ph,
          rainfall: parseInt(rainfall.replace(",", "")),
        });

        axios
          .post(`${process.env.api}/recommend`, {
            N: sensorData.N,
            P: sensorData.P,
            K: sensorData.K,
            temperature: sensorData.temperature,
            humidity: sensorData.humidity,
            ph: sensorData.ph,
            rainfall: parseInt(rainfall.replace(",", "")),
          })
          .then((res) => {
            const data = res.data;
            console.log("ML Server", data);

            if (data.error) console.log("Recommend Crop Error", data.error);
            else setRecommended(data.recommended[0]);
          });
      })
      .catch((e) => console.log("Sensore Data Error", e));
  }

  useEffect(() => {
    setTimeout(() => getSensorData(), 1000);
  });

  return (
    <Box
      sx={{
        backgroundColor: "#fff8dd",
        height: "100vh",
      }}
    >
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container py="3rem">
        <Group mb="xl" position="apart">
          <Title>Dashboard</Title>
          <Group position="center">
            <Button leftIcon={<Api />} onClick={() => setApiModalOpen(true)}>
              Key
            </Button>
            <Button
              styles={(theme) => ({
                root: {
                  backgroundColor: "#40a65b",
                  color: "white",
                  transition: "200ms",
                  "&:hover": {
                    backgroundColor: theme.fn.darken("#40a65b", 0.1),
                  },
                },
              })}
              leftIcon={<Logout />}
              onClick={() => {
                signOut(firebaseAuth);
                router.push("/login");
              }}
            >
              Sign Out
            </Button>
            <Avatar src={user.photoURL} radius="xl"></Avatar>
          </Group>
        </Group>
        <Text size="lg" mb="sm" color="gray" order={4}>
          Overview
        </Text>
        <Grid grow gutter="lg">
          <GridCard title="Nitrogren (N)">{sensorData.N}</GridCard>
          <GridCard title="Phosphorous (P)">{sensorData.P}</GridCard>
          <GridCard title="Pottasium (K)">{sensorData.K}</GridCard>
          <GridCard title="Humidity">{sensorData.humidity}</GridCard>
          <GridCard title="Temperature">{sensorData.temperature}</GridCard>
          <GridCard title="Soil Moisture">{sensorData.moisture}</GridCard>
          <GridCard title="State">
            <NativeSelect
              value={indianState}
              onChange={(e) => handleChange(e.currentTarget.value)}
              data={avgRainfall.map((e) => e["state"])}
            />
          </GridCard>
          <GridCard title="Rainfall">{rainfall}</GridCard>
          <GridCard title="Season">{season}</GridCard>
          {recommended !== "" && (
            <Grid.Col span={4}>
              <RecommendedCard recommended={recommended} />
            </Grid.Col>
          )}
        </Grid>
      </Container>
      <ApiKeyModal
        opened={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        title="API Key"
      />
    </Box>
  );
};

const GridCard = ({ title, children }) => (
  <Grid.Col span={4}>
    <Card sx={{ height: "100%" }} shadow="sm" p="lg">
      <Text size="xs" weight="normal" mb={10}>
        {title}
      </Text>
      <Title order={3}>{children}</Title>
    </Card>
  </Grid.Col>
);

const RecommendedCard = ({ recommended }) => (
  <Link href={`/crops/${recommended}`} passHref>
    <Card style={{ cursor: "pointer", height: 150 }} shadow="xs">
      <Overlay style={{ display: "grid", placeItems: "center" }}>
        <Title>{recommended.replace(/^\w/, (c) => c.toUpperCase())}</Title>
      </Overlay>
      <Image
        src={cropImgs[recommended]}
        alt={recommended}
        layout="fill"
        objectFit="cover"
        placeholder="blue"
      />
    </Card>
  </Link>
);

Dashboard.getInitialProps = async function (ctx) {
  const { req } = ctx;
  const user = await firebaseAuth.currentUser;
  if (!user) {
    ctx.res.writeHead(302, {
      Location: "/login",
    });
    ctx.res.end();
  }
  return { user };
};

export default Dashboard;

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import {
  Container,
  Paper,
  Button,
  Box,
  PasswordInput,
  TextInput,
  Group,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { BrandGoogle } from "tabler-icons-react";
import Head from "next/head";
import LoadingIcon from "../components/LoadingIcon";

export default function GoogleSignIn() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => value.length > 6,
    },
  });

  const handleLogin = async () => {
    await signInWithPopup(firebaseAuth, googleProvider).catch((e) => {
      console.log(e);
    });
  };

  const [user, loading] = useAuthState(firebaseAuth);

  user && router.push("/dashboard");

  return (
    <Box
      sx={{
        backgroundColor: "#fff8dd",
        height: "100vh",
      }}
    >
      <Container sx={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Head>
          <title>Login</title>
        </Head>
        {loading ? (
          <LoadingIcon />
        ) : user ? (
          <LoadingIcon />
        ) : (
          <Box>
            <Title align="center" mb={20}>
              Login
            </Title>
            <Paper sx={{ minWidth: 500 }} shadow="lg" p="xl">
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                  required
                  mt="sm"
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  required
                  mt="sm"
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
                <Group position="center" mt={35}>
                  <Button type="submit" fullWidth>
                    Login
                  </Button>

                  <Button
                    leftIcon={<BrandGoogle />}
                    color="red"
                    onClick={handleLogin}
                    fullWidth
                  >
                    Sign in with Google
                  </Button>
                </Group>
              </form>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}

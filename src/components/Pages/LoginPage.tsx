import { Box, Button, Center, Checkbox, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MERCHANT_KEY, useAuth } from "../../contexts/AuthContext";
import AlmaLogo from "../AlmaLogo";

const LoginPage = () => {
  const auth = useAuth();
  const theme = useMantineTheme();

  function handleSubmit({ name, remember }: { name: string; remember: boolean }) {
    auth.login(name, () => {});
    if (!remember) {
      // remove the stored key
      localStorage.removeItem(MERCHANT_KEY);
    }
  }

  const form = useForm({
    initialValues: {
      name: "",
      remember: true,
    },
  });

  const logo = (
    <div
      style={{
        width: "100px",
        height: "100px",
        border: `1px solid ${theme.colors.gray[2]}`,
        borderRadius: "50%",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "content-box",
        position: "absolute",
        top: "-60px",
        backgroundColor: "white",
      }}
    >
      <AlmaLogo />
    </div>
  );

  const formBlock = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {logo}
      <Box sx={{ maxWidth: 300 }}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput required label="Name" placeholder="Merchant name" {...form.getInputProps("name")} />
          <Checkbox mt="md" label="Remember me" {...form.getInputProps("remember", { type: "checkbox" })} />
          <Center>
            <Button mt="20%" type="submit">
              Sign in
            </Button>
          </Center>
        </form>
      </Box>
    </div>
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minWidth: "300px",
          maxWidth: "500px",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: `1px solid ${theme.colors.gray[4]}`,
          borderRadius: "7px",
          boxShadow: `3px 3px 15px 2px ${
            theme.colorScheme === "light" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.10)"
          }`,
        }}
      >
        {formBlock}
      </div>
    </div>
  );
};

export default LoginPage;

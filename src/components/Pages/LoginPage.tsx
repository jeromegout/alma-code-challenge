import { Box, Button, Checkbox, Group, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MERCHANT_KEY, useAuth } from "../../contexts/AuthContext";
import AlmaLogo from "../AlmaLogo";

interface stateType {
  from: { pathname: string };
}

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
        marginTop: "150px",
      }}
    >
      {logo}
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput required label="Name" placeholder="Merchant name" {...form.getInputProps("name")} />
          <Checkbox mt="md" label="Remember me" {...form.getInputProps("remember", { type: "checkbox" })} />
          <Button style={{ position: "absolute", bottom: "50px", left: "calc(50% - 50px)" }} type="submit">
            Submit
          </Button>
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
          width: "45%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
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

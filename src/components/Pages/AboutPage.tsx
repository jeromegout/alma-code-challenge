import { Center, Text, useMantineTheme } from "@mantine/core";
import GradientAvatar from "../GradientAvatar";

const AboutPage = () => {
  const theme = useMantineTheme();

  const header = (
    <div
      style={{
        position: "relative",
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        height: "60px",
        padding: "20px",
      }}
    >
      <Text size="xs" color="dimmed" style={{ position: "absolute", right: "20px" }}>
        June 2022
      </Text>
      <GradientAvatar name={"Jerome Gout"} size={80} style={{ position: "absolute", bottom: "-35px" }} />
    </div>
  );

  const content = (
    <div style={{ padding: "40px 20px 20px 20px" }}>
      <Text size="sm" color="dimmed">
        Jérôme Gout
      </Text>
      <Text weight={400} mt="30px" style={{ fontSize: "40px" }}>
        Dashboard
      </Text>

      <Text size="md" style={{ position: "absolute", right: "20px", bottom: "20px" }}>
        version 1.0.0
      </Text>
    </div>
  );

  return (
    <Center>
      <div
        style={{
          minWidth: "300px",
          width: "60%",
          height: "40vh",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            border: `1px solid ${theme.colors.gray[4]}`,
            borderRadius: "7px",
            cursor: "pointer",
            boxShadow: `3px 3px 15px 2px ${
              theme.colorScheme === "light" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.10)"
            }`,
          }}
        >
          {header}
          {content}
        </div>
      </div>
    </Center>
  );
};

export default AboutPage;

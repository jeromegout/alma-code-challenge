import { Group, Text, ThemeIcon, UnstyledButton, useMantineTheme } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppLink = ({ icon, color, label, to, setOpened }: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setOpened(false);
    navigate(to);
  };

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      onClick={handleClick}
    >
      <Group spacing="xs">
        {icon}
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default AppLink;

import {
  ActionIcon,
  Burger,
  Group,
  Header,
  MediaQuery,
  Menu,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { MoonStars, Sun, UserCircle, DoorExit } from "tabler-icons-react";
import { useAuth } from "../contexts/AuthContext";
import AlmaLogo from "./AlmaLogo";

interface IProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutHeader = ({ opened, setOpened }: IProps) => {
  const theme = useMantineTheme();
  const { logout } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { user } = useAuth();

  const handleLogout = () => {
    logout(() => {});
  };

  return (
    <Header height={100} p="lg">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color={theme.colors.gray[6]} mr="xl" />
        </MediaQuery>
        <AlmaLogo />
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Text style={{ textTransform: "uppercase", fontWeight: "800", fontSize: "40px", color: "#00425D" }}>
            Dashboard
          </Text>
        </MediaQuery>
        <Group>
          <ActionIcon variant="hover" onClick={() => toggleColorScheme()} size={30}>
            {colorScheme === "dark" ? <Sun size={16} /> : <MoonStars size={16} />}
          </ActionIcon>
          <Menu
            placement="end"
            control={
              <ActionIcon variant="hover" size={30}>
                {<UserCircle size={36} />}
              </ActionIcon>
            }
          >
            <Menu.Label style={{ color: "rgb(0, 66, 93)", fontSize: "18px", borderBottom: "1px solid #e9ecef" }}>
              {user}
            </Menu.Label>
            <Menu.Item icon={<DoorExit size={14} />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Group>
      </div>
    </Header>
  );
};

export default LayoutHeader;

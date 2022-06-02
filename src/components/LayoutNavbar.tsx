import { MediaQuery, Navbar, Text, useMantineTheme } from "@mantine/core";
import { CurrencyDollar, InfoCircle } from "tabler-icons-react";
import AppLink from "./AppLink";

interface IProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutNavbar = ({ opened, setOpened }: IProps) => {
  const theme = useMantineTheme();

  const renderLinks = (): JSX.Element => {
    return (
      <div>
        <AppLink
          icon={<CurrencyDollar size={16} color="#FF414D" />}
          color="#FF414D"
          label="Payments"
          to="/payments"
          setOpened={setOpened}
        />
        <AppLink
          icon={<InfoCircle size={16} color="#FF414D" />}
          color="#FF414D"
          label="About"
          to="/about"
          setOpened={setOpened}
        />
      </div>
    );
  };

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section>
          <Text style={{ textTransform: "uppercase", fontWeight: "800", color: "#00425D" }}>Dashboard</Text>
        </Navbar.Section>
      </MediaQuery>
      <Navbar.Section grow mt="md">
        {renderLinks()}
      </Navbar.Section>
    </Navbar>
  );
};

export default LayoutNavbar;

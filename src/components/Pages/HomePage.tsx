import { useState } from "react";
import { AppShell } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutHeader from "../LayoutHeader";
import LayoutNavbar from "../LayoutNavbar";
import AboutPage from "./AboutPage";
import PaymentPage from "./PaymentPage";
import PaymentsPage from "./PaymentsPage";
import AuthRequired from "../../auth/AuthRequired";

const HomePage = () => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={<LayoutNavbar opened={opened} setOpened={setOpened} />}
        header={<LayoutHeader opened={opened} setOpened={setOpened} />}
      >
        <Routes>
          <Route
            path="/about"
            element={
              <AuthRequired>
                <AboutPage />
              </AuthRequired>
            }
          />

          <Route
            path="/payments"
            element={
              <AuthRequired>
                <PaymentsPage />
              </AuthRequired>
            }
          />
          <Route
            path="/payments/:id"
            element={
              <AuthRequired>
                <PaymentPage />
              </AuthRequired>
            }
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};

export default HomePage;

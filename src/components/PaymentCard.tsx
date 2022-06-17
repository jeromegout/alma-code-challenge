import { Badge, Group, Popover, Text, Timeline, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { Payment, PaymentPlan } from "../types/Payment";
import { formatAmount, formatDate, getColorByStatus, getPaidIndex, getReadableStatus } from "../utils";
import GradientAvatar from "./GradientAvatar";

interface IProps {
  payment: Payment;
  details?: boolean;
  onClick?: (payment: Payment) => void;
}

const PaymentCard = ({ payment, details = false, onClick }: IProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
        {formatDate(payment.created)}
      </Text>
      <GradientAvatar name={payment.customer_name} size={80} style={{ position: "absolute", bottom: "-35px" }} />
    </div>
  );

  const overview = (
    <div style={{ padding: "40px 20px 20px 20px", position: "relative" }}>
      <Text size="xs" color="dimmed">
        {payment.merchant.name}
      </Text>
      <Text weight={400} style={{ fontSize: "40px" }}>
        {payment.customer_name}
      </Text>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        placement="center"
        withArrow
        trapFocus={false}
        closeOnEscape={false}
        transition="pop-top-left"
        width={260}
        styles={{ body: { pointerEvents: "none" } }}
        target={
          <Badge
            variant="filled"
            color={getColorByStatus(payment.status)}
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
          >
            {payment.installmentsCount}
          </Badge>
        }
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text size="sm" color="dimmed">
              Status
            </Text>
            <Text size="sm">{getReadableStatus(payment.status)}</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text size="sm" color="dimmed">
              Number of installments
            </Text>
            <Text size="sm">{payment.installmentsCount}</Text>
          </div>
        </div>
      </Popover>

      <Text size="xl" style={{ position: "absolute", right: "20px", bottom: "20px" }}>
        {formatAmount(payment.amount)}
      </Text>
    </div>
  );

  const planTitle = (p: PaymentPlan): JSX.Element => (
    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
      <Text size="xl">{formatAmount(p.amount)}</Text>
      <Badge color={getColorByStatus(p.status)} ml="xs">
        {getReadableStatus(p.status)}
      </Badge>
    </div>
  );

  const plans = (
    <div
      style={{
        padding: "30px 20px 20px 20px",
        position: "relative",
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <Timeline active={getPaidIndex(payment.paymentPlan)} bulletSize={24} lineWidth={2}>
        {payment.paymentPlan?.map((p, index) => (
          <Timeline.Item
            bullet={<Text size="sm">{index + 1}</Text>}
            title={planTitle(p)}
            // style={{ position: "relative" }}
          >
            <Group position="apart">
              <Text size="sm">{p.fee > 0 ? `Fee: ${formatAmount(p.fee)}` : ""}</Text>
              <Text color="dimmed" size="xs">
                {formatDate(p.due_date)}
              </Text>
            </Group>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.colors.gray[4]}`,
        borderRadius: "7px",
        cursor: "pointer",
        boxShadow: `3px 3px 15px 2px ${theme.colorScheme === "light" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.10)"}`,
      }}
      onClick={() => onClick && onClick(payment)}
    >
      {header}
      {overview}
      {details && plans}
    </div>
  );
};

export default PaymentCard;

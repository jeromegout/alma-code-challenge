import { Chip, Chips, Group, SimpleGrid, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Payment, PaymentStatus } from "../types/Payment";
import { getAllPaymentStatus, getReadableStatus } from "../utils";
import PaymentCard from "./PaymentCard";

interface IProps {
  payments: Payment[];
}
const statusFilterDeserializer = (value: string) => value?.split(",").filter((s) => s.length > 0) as PaymentStatus[];
const statusFilterSerializer = (values: PaymentStatus[]) => {
  if (values) {
    if (values.length === 0) return "";
    if (values.length === 1) return values[0];
    else return values.join(",");
  }
  return "";
};

const PaymentOverviewList = ({ payments }: IProps) => {
  const navigate = useNavigate();
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(payments);
  const [statusFilter, setStatusFilter] = useLocalStorage<PaymentStatus[]>({
    key: "alma-dashboard-filter-status",
    defaultValue: getAllPaymentStatus(),
    serialize: statusFilterSerializer,
    deserialize: statusFilterDeserializer,
  });

  const filterPaymentForStatus = (p: Payment): boolean => statusFilter.includes(p.status);

  useEffect(() => {
    // since filters have been changed we need to apply those filters
    const newPayments = payments.filter((p) => filterPaymentForStatus(p));
    console.log(newPayments);
    setFilteredPayments(newPayments);
  }, [statusFilter]);

  const handlePaymentClick = (payment: Payment) => {
    navigate(`/payments/${payment.id}`);
  };

  const handleStatusChanged = (values: string[]) => {
    setStatusFilter(values as PaymentStatus[]);
  };

  const controls = (
    <Group mb="xl" mt="sm">
      <Text color="dimmed" size="md">
        Status
      </Text>
      <Chips multiple size="xs" value={statusFilter} onChange={handleStatusChanged}>
        <Chip value="default">{getReadableStatus("default")}</Chip>
        <Chip value="not_started">{getReadableStatus("not_started")}</Chip>
        <Chip value="ready">{getReadableStatus("ready")}</Chip>
        <Chip value="in_progress">{getReadableStatus("in_progress")}</Chip>
        <Chip value="paid">{getReadableStatus("paid")}</Chip>
      </Chips>
    </Group>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {controls}
      <SimpleGrid cols={1} style={{ minWidth: "300px", width: "60%" }}>
        {filteredPayments.map((p) => (
          <PaymentCard key={p.id} payment={p} onClick={handlePaymentClick} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default PaymentOverviewList;

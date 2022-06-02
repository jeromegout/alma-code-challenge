import { SimpleGrid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Payment } from "../types/Payment";
import PaymentCard from "./PaymentCard";

interface IProps {
  payments: Payment[];
}

const PaymentOverviewList = ({ payments }: IProps) => {
  const navigate = useNavigate();

  const handlePaymentClick = (payment: Payment) => {
    navigate(`/payments/${payment.id}`);
  };

  return (
    <SimpleGrid cols={1} style={{ maxWidth: "60%" }}>
      {payments.map((p) => (
        <PaymentCard key={p.id} payment={p} onClick={handlePaymentClick} />
      ))}
    </SimpleGrid>
  );
};

export default PaymentOverviewList;

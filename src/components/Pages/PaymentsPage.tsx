import { Center, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getAllPayments } from "../../payment-service";
import { Payment } from "../../types/Payment";
import PaymentOverviewList from "../PaymentOverviewList";

const PaymentsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    getAllPayments(user || "all")
      .then(setPayments)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Center>
      {loading && <Loader variant="bars" />}
      {!loading && payments.length > 0 && <PaymentOverviewList payments={payments} />}
    </Center>
  );
};

export default PaymentsPage;

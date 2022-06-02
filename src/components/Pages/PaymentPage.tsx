import { Center, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPayment } from "../../payment-service";
import { Payment } from "../../types/Payment";
import PaymentCard from "../PaymentCard";

const PaymentPage = () => {
  const [payment, setPayment] = useState<Payment | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      getPayment(params.id)
        .then(setPayment)
        .finally(() => setLoading(false));
    }
  }, []);

  const handlePaymentClick = (payment: Payment) => {
    navigate(`/payments`);
  };

  return (
    <Center>
      <div style={{ minWidth: "300px", width: "60%", display: "flex", justifyContent: "center" }}>
        {loading && <Loader variant="bars" />}
        {!loading && payment && <PaymentCard payment={payment} details onClick={handlePaymentClick} />}
      </div>
    </Center>
  );
};

export default PaymentPage;

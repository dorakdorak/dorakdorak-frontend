import { OrderSuccessResponse } from "@/types/OrderSuccess";
import thumbnail from "@/assets/images/mock/meal2.jpg";

const mockOrderSuccess: OrderSuccessResponse = {
  orderCode: "20250217_00001",
  orders: [
    {
      imageUrl: thumbnail,
      name: "단백질 듬뿍 도시락",
      price: 6800,
      orderStatus: "PAYMENT_COMPLETED",
    },
    {
      imageUrl: thumbnail,
      name: "단백질 듬뿍 도시락",
      price: 6800,
      orderStatus: "PAYMENT_COMPLETED",
    },
  ],
};

export default mockOrderSuccess;

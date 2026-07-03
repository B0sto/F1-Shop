export type PurchaseStatus = "Delivered" | "Transit"

export type Purchase = {
  id: string
  orderId: string;
  key: string;
  name: string
  date: string
  price: string
  status: PurchaseStatus
  image: string
}
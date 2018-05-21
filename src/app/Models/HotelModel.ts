export interface HotelModel {
  name: string;
  description: string;
  image: string;
  rate: number;
  price: number;
  price_history?: (PriceHistoryModel)[] | null;
}
export interface PriceHistoryModel {
  month: string;
  value: number;
}
export interface FilterHotelModel {
  minPrice;
  maxPrice;
  stars;
}

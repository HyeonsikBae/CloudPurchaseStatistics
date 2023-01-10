export interface IPurchase {
  id: string;
  transaction_id: string;
  user_id: string;
  intra_id: string;
  item: string;
  amount: string;
  create_at: Date;
  is_validated: string;
  validated_at: Date;
}

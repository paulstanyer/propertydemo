export const Price: React.FC<{
  className?: string;
  price: number | undefined;
}> = ({ className, price }) => (
  <span className={className}>
    {price
      ? new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
          maximumFractionDigits: 0,
        }).format(price)
      : "-"}
  </span>
);

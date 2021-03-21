import { LinkProps, useHistory } from "react-router-dom";
import { Button } from "../atoms/button";

export const NavigationButton: React.FC<LinkProps> = ({
  to,
  className,
  children,
}) => {
  const { push } = useHistory();

  return (
    <Button
      className={className}
      onClick={() => {
        push(to.toString());
      }}
    >
      {children}
    </Button>
  );
};

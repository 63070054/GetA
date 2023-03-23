import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const AlreadySignInContainer = ({ children }: ChildrenProps) => {
  return (
    <div className="container px-4 py-4 md:px-48 md:py-16">
      {children}
    </div>
  );
};

export default AlreadySignInContainer;
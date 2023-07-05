import { Card } from "react-bootstrap";
import { FaUsers } from "react-icons/fa";

export const DashBoardCardView = ({icon ,text, number }) => {
  return (
    <>
      <Card className="shadow-sm">
        <Card.Body className="text-center">
       { icon }
       <h3 className="mt-2">{number+"+"}</h3>
          <h3 className="mt-2">{text}</h3>
        </Card.Body>
      </Card>
    </>
  );
};

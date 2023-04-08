import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleUserView = ({ user }) => {
  const setImageAccordingToGender = () => {
    if (user.gender === "male") {
      return "/Assets/male.jpg";
    }

    return "/Assets/female.jpg";
  };



  return (
    <Card className="mt-3 borderd-0 shadow-sm">
      <Card.Body>
        <Row>
          <Col md={1} className="d-flex align-items-center">
            <img
              src={setImageAccordingToGender()}
              style={{ objectFit: "cover", height: "100px", weight: "100px" }}
              // className="img-fluid"
              alt=""
            />
          </Col>

          <Col md={11} className="ps-5">
            <Link to={`/users/profile/${user.userId}`} style={{textDecoration:'none'}}><h5>{user.name}</h5></Link>
            <p className="text-muted">{user.about}</p>
            <p className="text-muted">{user?.email}</p>
            {user?.roles?.map((obj) => {
              let className = "success";
              if (obj.roleName === "ROLE_NORMAL") {
                className = "info";
              }

              return (
                <Badge pill key={obj.roleId} className={`bg-${className} mx-2`}> {obj.roleName} </Badge>
              );
            })}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SingleUserView;

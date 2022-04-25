import React from "react";
import { Row, Col } from "reactstrap";
// Col 한 줄을 12칸으로 자르고 4칸씩 사용

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };
  // m-auto는 좌우여백 알아서 해줘 p-x는 상하 패딩값 x으로 조절해주면댐
  return (
    <div id="main-footer" className="text-center m-auto p-1">
      <Row>
        <Col>
          <p>
            Copyright &copy; <span> {thisYear()} </span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;

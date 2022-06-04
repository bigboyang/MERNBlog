import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
import { Link } from "react-router-dom";
import EditorComponent from "../../component/post/EditorComponent";
import { Button, Row, Col, Container } from "reactstrap";
import { GrowingSpinner } from "../../component/spinner/Spinner";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCommentDots,
  faMouse,
} from "@fortawesome/free-solid-svg-icons";

const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { creatorId, loading } = useSelector((state) => state.post);
  const [postDetail, setPostDetail] = useState({});
  const [title, setTitle] = useState("");
  const [flag, setFlag] = useState("");

  const { userId, userName } = useSelector((state) => state.auth);
  console.log(req, "req");

  // 이거 리덕스로 넘어와서 다 널임
  console.log(creatorId, "creatorId");
  console.log(userId, "userId");

  const getDetail = async () => {
    console.log("호출됨?", req.match.params.id);
    await axios
      .get(`api/post/${req.match.params.id}`)
      .then((res) => {
        setPostDetail(res.data);
        setTitle(res.data.title);
        setFlag("true");
        console.log(res, " result");
      })
      .catch((error) => {
        console.log(error, "getDetail");
      });
  };

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
    getDetail();
  }, []);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const EditButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

  const HomeButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );

  const Body = (
    <div>
      {userId === undefined ? EditButton : HomeButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between">
        {(() => {
          if (flag === "true") {
            return (
              <Fragment>
                <div className="font-weight-bold text-big">
                  <span className="mr-3">
                    <Button color="info">
                      {postDetail.category.categoryName}
                    </Button>
                  </span>
                  &nbsp; {postDetail.title}
                </div>
                <div className="align-self-end"></div>
              </Fragment>
            );
          }
        })()}
      </Row>
      {flag === "true" ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">
            <FontAwesomeIcon icon={faPencilAlt} />
            &nbsp;
            <span> {postDetail.date}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faCommentDots} />
            &nbsp;
            <span>{postDetail.comments.length}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faMouse} />
            <span>{postDetail.views}</span>
          </div>
          <Row className="mb-3">
            <div
              dangerouslySetInnerHTML={{ __html: postDetail.contents }}
            ></div>
          </Row>
          {/* <Row>
            <Container className="mb-3 border border-blue rounded">
              {Array.isArray(postDetail.comments)
                ? postDetail.comments.map(
                    ({ contents, creator, date, _id, creatorName }) => (
                      <div key={_id}>
                        <Row className="justify-content-between p-2">
                          <div className="font-weight-bold">
                            {creatorName ? creatorName : creator}
                          </div>
                          <div className="text-small">
                            <span className="font-weight-bold">
                              {date.split(" ")[0]}
                            </span>
                            <span className="font-weight-light">
                              {" "}
                              {date.split(" ")[1]}
                            </span>
                          </div>
                        </Row>
                        <Row className="p-2">
                          <div>{contents}</div>
                        </Row>
                        <hr />
                      </div>
                    )
                  )
                : "Creator"}
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              />
            </Container>
          </Row> */}
        </Fragment>
      ) : (
        <h1>HI</h1>
      )}
    </div>
  );

  return (
    <>
      <div>
        <Helmet title={`Post | ${title}`} />

        {Body}
      </div>
    </>
  );
};

export default PostDetail;

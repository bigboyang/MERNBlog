import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
import { GrowingSpinner } from "../../component/spinner/Spinner";
import PostCardOne from "../../component/post/postCardOne";

const PostCardList = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POST_LOADING_REQUEST });
  }, []);

  return (
    <Fragment>
      <Helmet title="Home" />
      <Row>{posts ? <PostCardOne posts={posts} /> : <GrowingSpinner />}</Row>
    </Fragment>
  );
};

export default PostCardList;

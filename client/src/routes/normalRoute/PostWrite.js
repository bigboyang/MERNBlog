import React from "react";
import EditorComponent from "../../component/post/EditorComponent";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormGroup,
  Label,
  Form,
  Input,
  Button,
  Progress,
  Col,
} from "reactstrap";

const PostWrite = () => {
  // const { isAutenticated } = useSelector((state) => state.auth);
  const isAutenticated = true;
  const [form, setValues] = useState({ title: "", contents: "" });

  const [text, setText] = useState("");
  const handleText = (value) => {
    console.log(value);
    setText(value);

    if (value && value.match("<img src=")) {
      const whereImg_start = value.indexOf("<img src=");
      console.log(whereImg_start, "whereImg_start");
      let whereImg_end = "";
      let ext_name_find = "";
      let result_img_url = "";
      const ext_name = ["jpeg", "png", "jpg", "gif"];

      for (let i = 0; i < ext_name.length; i++) {
        if (value.match(ext_name[i])) {
          console.log(value.indexOf(`${ext_name[i]}`));
          ext_name_find = ext_name[i];
          whereImg_end = value.indexOf(`${ext_name[i]}`);
        }
      }

      console.log(ext_name_find, "ext_name_find");
      console.log(whereImg_end, "whereImg_end");

      if (ext_name_find == "jpeg") {
        result_img_url = value.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_img_url = value.substring(whereImg_start + 10, whereImg_end + 3);
      }
      console.log(result_img_url, "result_img_url");
      setValues({
        ...form,
        fileUrl: result_img_url,
        contents: value,
      });
    } else {
      setValues({
        ...form,
        fileUrl: "https://source.unsplash.com/random/301x201",
        contents: value,
      });
    }
  };

  console.log(form.contents, "form");

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>PostWrite</h1>
      {isAutenticated ? (
        <Form>
          {/* 타이틀 */}
          <FormGroup className="mb-3">
            <Label for="title">TITLE</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          {/* 카테고리 */}
          <FormGroup className="mb-3">
            <Label for="title">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          {/* 내용 */}
          <FormGroup className="mb-3">
            <Label for="title">Content</Label>
            <EditorComponent
              name="contents"
              id="contents"
              value={text}
              onChange={handleText}
            />
            <Button color="success" block className="">
              제출하기
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </>
  );
};

export default PostWrite;

import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form, Input, Select, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

export default function Main() {
  const [apiResult, setApiResult] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(50);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
      render: (text, record) => (
        <Link to={`/result/${record.imdbID}`}>{text}</Link>
      ),
    },
    {
      title: "Year",
      dataIndex: "Year",
      key: "Year",
    },
    {
      title: "Imdb ID",
      dataIndex: "imdbID",
      key: "imdbID",
    },
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=pokemon&page=${page}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        setApiResult(response.data.Search);
        setTotalPage(response.data.totalResults);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [page]);

  const onFinish = (values) => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${values.moviename}&${
            values.publishyear ? `y=${values.publishyear}` : ""
          }&${values.type ? `type=${values.type}` : ""}&apikey=${
            process.env.REACT_APP_API_KEY
          }`
        );
        setApiResult(response.data.Search);
        setTotalPage(response.data.totalResults);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Form
        className={styles["c-form"]}
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="moviename"
              label="Movie Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="publishyear" label="Publish Year">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="type" label="Select">
              <Select>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="series">Series</Select.Option>
                <Select.Option value="episode">Episode</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item className={styles["c-form__button"]}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div>
        <Table
          columns={columns}
          loading={loading}
          pagination={{
            position: ["bottomCenter"],
            defaultCurrent: 1,
            showSizeChanger: false,
            total: totalPage,
            onChange: onChange,
          }}
          dataSource={apiResult}
        />
      </div>
    </>
  );
}

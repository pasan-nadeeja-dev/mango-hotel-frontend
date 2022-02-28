import { useState } from "react";
import { Spin, message, Button, Form, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../Api";
import { Layout } from "../Common/Layout/index.js";
import classNames from "./Home.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [dates, setDates] = useState({});

  const handleClick = (value) => {
    navigate("/reserve-room", {
      state: {
        reservedRoomId: value._id,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        rates: value.rates,
      },
    });
  };

  const handleDateSelect = (value) => {
    setDates({
      checkIn: value["range-picker"][0].format("YYYY-MM-DD"),
      checkOut: value["range-picker"][1].format("YYYY-MM-DD"),
    });
    API.get(
      `/room/list-all?checkIn="${value["range-picker"][0].format(
        "YYYY-MM-DD"
      )}"&&checkOut="${value["range-picker"][1].format("YYYY-MM-DD")}"`
    )
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          setRooms(res.data.data.data);
        } else {
          message.error(res.data?.error?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error(error?.message);
      });
  };

  return (
    <Layout>
      <div>
        <Form layout="inline" onFinish={handleDateSelect}>
          <Form.Item
            name="range-picker"
            label="RangePicker"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select Date!",
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
        </Form>
      </div>
      <div className={classNames.bodyWrapper}>
        <Spin spinning={loading}>
          {rooms.length > 0 ? (
            rooms.map((value, index) => (
              <div className={classNames.cardWrapper}>
                <div className={classNames.card} key={index}>
                  <h2>Hotel : {value.name}</h2>
                  <h3>View : {value.view}</h3>
                  <h3>Amentities : </h3>
                  <ul>
                    {value.amentities.map((item, itemKey) => (
                      <li key={itemKey}>{item}</li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleClick(value)}
                    disabled={!value.availability}
                  >
                    {value.availability ? "Reserve" : "Booked"}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h3>No rooms available</h3>
          )}
        </Spin>
      </div>
    </Layout>
  );
};

export default Home;

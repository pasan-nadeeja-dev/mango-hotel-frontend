import { useState } from "react";
import { message, Button, Form, Input, Radio } from "antd";
import { useLocation } from "react-router-dom";
import API from "../Api";
import { Layout } from "../Common/Layout/index.js";
import classNames from "./Rooms.module.scss";

const ReserveRoom = () => {
  const location = useLocation();
  const [roomData] = useState(location.state);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roomPrice, setRoomPrice] = useState(24);

  const handleUpdate = () => {
    setRoomPrice(
      roomData.rates[`${form.getFieldValue("nuOfGuests")}`][
        `${form.getFieldValue("mealType")}`
      ] * form.getFieldValue("nights")
    );
  };

  const handleFinish = (inputs) => {
    API.post(
      "/reservation/add",
      {
        isActive: true,
        reservedRoomId: roomData.reservedRoomId,
        checkIn: roomData.checkIn,
        checkOut: roomData.checkOut,
        nights: inputs.nights,
        mealType: inputs.mealType,
        nuOfGuests: inputs.nuOfGuests,
        price: roomPrice,
        other: {
          parking: inputs.parking,
          specialNote: inputs.specialNote,
          plannedCheckin: inputs.plannedCheckin,
        },
        paymentType: inputs.paymentType,
      },
      {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("MANGO.loggedUser")),
        },
      }
    )
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          message.success("Reserved successfully");
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
      <div className={classNames.bodyWrapper}>
        <div className={classNames.formWrapper}>
          <Form
            onFinish={handleFinish}
            form={form}
            initialValues={{
              nights: 1,
              nuOfGuests: "single",
              mealType: "halfboard",
            }}
          >
            <Form.Item
              name="nights"
              label="Nights"
              rules={[
                {
                  required: true,
                  message: "Please input nu of nights",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Please input"
                onChange={handleUpdate}
              />
            </Form.Item>

            <Form.Item
              name="mealType"
              label="Meal Type"
              rules={[
                {
                  required: true,
                  message: "Please input meal type",
                },
              ]}
            >
              <Radio.Group onChange={handleUpdate}>
                <Radio.Button value="halfboard">Halfboard</Radio.Button>
                <Radio.Button value="fullboard">Fullboard</Radio.Button>
                <Radio.Button value="breakfast">Breakfast</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="nuOfGuests"
              label="Nu Of Guests"
              rules={[
                {
                  required: true,
                  message: "Please input Nu Of Guests",
                },
              ]}
            >
              <Radio.Group onChange={handleUpdate}>
                <Radio.Button value="single">Single</Radio.Button>
                <Radio.Button value="double">Double</Radio.Button>
                <Radio.Button value="triple">Triple</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="price" label="Price">
              {roomPrice}
            </Form.Item>

            <Form.Item
              name="paymentType"
              label="Payment Type"
              rules={[
                {
                  required: true,
                  message: "Please input Payment Type",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="ccOnline">Credit Card Online</Radio.Button>
                <Radio.Button value="ccLocation">
                  Credit Card Location
                </Radio.Button>
                <Radio.Button value="cashLocation">
                  Cash on Location
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="parking" label="Parking">
              <Radio.Group>
                <Radio.Button value="true">Yes</Radio.Button>
                <Radio.Button value="false">no</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="plannedCheckin" label="Planned Checkin">
              <Input placeholder="Please input" />
            </Form.Item>

            <Form.Item name="specialNote" label="Special Note">
              <Input.TextArea placeholder="Please input" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default ReserveRoom;

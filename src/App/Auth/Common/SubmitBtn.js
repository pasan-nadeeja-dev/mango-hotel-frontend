import { Form, Button } from "antd";

const SubmitBtn = ({ onClick, displayLabel, classNames, loading }) => {
  return (
    <div className={classNames.submitBtnWrapper}>
      <Form.Item>
        <Button loading={loading} type="primary" onClick={onClick}>
          {displayLabel}
        </Button>
      </Form.Item>
    </div>
  );
};

export default SubmitBtn;

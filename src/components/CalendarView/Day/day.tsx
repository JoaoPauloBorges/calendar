import { FormOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, TimePicker } from "antd";
import moment from "moment";
import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateClassNamesWithBaseClass } from "utils/utils";
import Reminder from "../reminder";
import {
  addReminder,
  Colors,
  ReminderStateItem,
  selectAllReminders,
} from "../reminder/stateManagement/reminders.slice";
import "./day.less";

const { Option } = Select;

export const getAddReminderForm = (
  form: any,
  date: Date,
  handleSubmit: (values: any) => void,
  valuesToEdit?: ReminderStateItem
) => {
  const handleTimeChange = (time: any) => {
    form.setFields([{ name: "when", value: time, touched: true }]);
    form.validateFields(["when"]);
  };

  if (!!valuesToEdit) {
    form.setFields([
      { name: "when", value: moment(valuesToEdit.when), touched: true },
      { name: "color", value: valuesToEdit.color, touched: true },
      { name: "description", value: valuesToEdit.description, touched: true },
    ]);

    form.validateFields(["when", "color", "description"]);
  }

  const colors = Object.values(Colors);
  const options = colors.map((color, idx) => (
    <Option key={idx} value={color}>
      <span
        style={{
          content: "",
          background: `${color}`,
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          display: "block",
          position: "absolute",
          top: "20%",
        }}
      ></span>
    </Option>
  ));

  Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
  return (
    <div>
      <h2>
        {new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date)}
      </h2>
      <Form
        name="reminder"
        autoComplete="on"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your reminder description!",
            },
          ]}
        >
          <Input
            allowClear
            addonBefore={<FormOutlined />}
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item
          shouldUpdate
          name="when"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input for when your reminder should be set!",
            },
          ]}
        >
          <TimePicker
            onSelect={(time) => handleTimeChange(time)}
            use12Hours
            format="h:mm A"
            style={{ width: 140 }}
          />
        </Form.Item>
        <Form.Item name="color" initialValue={colors[0]}>
          <Select size="large" style={{ width: "20%" }}>
            {options}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

interface Props {
  date: Date;
  current?: boolean;
  disable?: boolean;
}
const Day: FC<Props> = ({ date, disable = false, current = false }) => {
  const PrefixClassName = "Day";
  const classes = generateClassNamesWithBaseClass(PrefixClassName);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    const hours = values.when.format("HH:mm").split(":");
    const when = new Date(date).setHours(hours[0], hours[1], 0);
    dispatch(
      addReminder({
        ...values,
        when,
        createdAt: new Date().getTime(),
      } as ReminderStateItem)
    );

    handleModalCancel();
  };

  const handleModalCancel = () => {
    form.resetFields();
    Modal.destroyAll();
  };

  const content = useMemo(
    () => getAddReminderForm(form, date, handleSubmit),
    [date]
  );

  const showModal = () => {
    Modal.confirm({
      icon: <></>,
      content: content,
      closable: true,
      centered: true,
      direction: "ltr",
      maskClosable: true,
      onCancel: handleModalCancel,
      okButtonProps: {
        onClick: () => form.submit(),
        style: { color: "black" },
      },
      okCancel: false,
      okText: "Save",
    });
  };

  const isMyReminder = (when: number) => {
    return new Date(when).toDateString() === new Date(date).toDateString();
  };

  const myReminders = (useSelector(selectAllReminders) as ReminderStateItem[])
    .filter((reminder) => isMyReminder(reminder.when))
    .map((item, idx) => <Reminder key={idx} reminder={item} />);

  return (
    <section
      onClick={() => showModal()}
      className={classes({
        "Day--disable": disable,
        "Day--current": current,
      })}
    >
      <h5 className={classes("CurrentDayFlag")}>{date.getDate()}</h5>

      <section className={classes("RemindersContainer")}>{myReminders}</section>
    </section>
  );
};

export default Day;

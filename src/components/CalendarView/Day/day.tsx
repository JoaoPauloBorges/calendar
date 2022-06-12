import { FormOutlined } from "@ant-design/icons";
import { Form, Input, Modal, TimePicker } from "antd";
import { FC, useEffect, useMemo } from "react";
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

export const getAddReminderForm = (
  form: any,
  date: Date,
  handleSubmit: (values: any) => void
) => {
  const handleTimeChange = (time: any) => {
    form.setFields([{ name: "when", value: time, touched: true }]);
    form.validateFields(["when"]);
  };

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
    console.log(values);
    const hours = values.when.format("HH:mm").split(":");
    const when = new Date(date).setHours(hours[0], hours[1], 0);
    dispatch(
      addReminder({
        color: Colors.ORANGE,
        createdAt: new Date().getTime(),
        when,
        description: values.description,
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

  const reminders = (
    useSelector(selectAllReminders) as ReminderStateItem[]
  ).map((item, idx) => <Reminder key={idx} reminder={item} />);

  return (
    <section
      onClick={() => showModal()}
      className={classes({
        "Day--disable": disable,
        "Day--current": current,
      })}
    >
      <h5 className={classes("CurrentDayFlag")}>{date.getDate()}</h5>

      <section
        style={{ width: "100%", backgroundColor: "green" }}
        className={classes("RemindersContainer")}
      >
        {current ? reminders : <></>}
      </section>
    </section>
  );
};

export default Day;

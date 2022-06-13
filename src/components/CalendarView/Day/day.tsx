import { FormOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popover,
  Select,
  TimePicker,
} from "antd";
import useMediaQuery from "hooks/mediaQuery/mediaQuery.hook";
import { useTouchEvents } from "hooks/touchEvents/touchEvents.hook";
import moment from "moment";
import { FC, useMemo, useState } from "react";
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
      { name: "dateUpdate", value: moment(valuesToEdit.when), touched: true },
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
            {
              max: 30,
              message: "Description should be less than 31 character",
            },
          ]}
        >
          <Input
            style={{ width: "100%" }}
            allowClear
            addonBefore={<FormOutlined />}
            placeholder="Description"
          />
        </Form.Item>
        {!!valuesToEdit && (
          <Form.Item name="dateUpdate">
            <DatePicker></DatePicker>
          </Form.Item>
        )}
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
        <Form.Item name="color" initialValue={Colors.COLOR5}>
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
  const isPortrait = useMediaQuery("(max-width: 450px)");

  const maxRemindersPerDay = isPortrait ? 3 : 4;
  const PrefixClassName = "Day";
  const classes = generateClassNamesWithBaseClass(PrefixClassName);
  const { isTouchDevice } = useTouchEvents();

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
    Modal.destroyAll();
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

  const handleClickOnReminder = () => {
    setPopVisible(false);
  };

  const myReminders = (useSelector(selectAllReminders) as ReminderStateItem[])
    .filter((reminder) => isMyReminder(reminder.when))
    .sort((a, b) => a.when - b.when)
    .map((item, idx) => (
      <Reminder
        key={idx}
        handleClickOnReminder={handleClickOnReminder}
        reminder={item}
      />
    ));

  const [popVisible, setPopVisible] = useState(false);

  return (
    <section
      onClick={() => showModal()}
      className={classes({
        "Day--disable": disable,
        "Day--current": current,
      })}
    >
      <h5 className={classes("CurrentDayFlag")}>{date.getDate()}</h5>

      <section className={classes("RemindersContainer")}>
        {myReminders.slice(0, maxRemindersPerDay)}

        <Popover
          title="Reminders 1"
          arrowContent
          trigger="hover"
          mouseLeaveDelay={0.05}
          zIndex={10}
          content={
            <section className={classes("RemindersContainer")}>
              {myReminders.slice(maxRemindersPerDay)}
            </section>
          }
        >
          <Popover
            zIndex={20}
            title="Reminders 2"
            arrowContent
            destroyTooltipOnHide
            visible={popVisible && isTouchDevice()}
            trigger="click"
            onVisibleChange={(visible) => setPopVisible(visible)}
            content={
              <section className={classes("RemindersContainer")}>
                {myReminders.slice(maxRemindersPerDay)}
              </section>
            }
          >
            <Button
              onClick={(evt) => evt.stopPropagation()}
              style={{
                border: "none",
                padding: 0,
                display:
                  myReminders.length > maxRemindersPerDay ? "initial" : "none",
              }}
            >
              {`${myReminders.length - maxRemindersPerDay} more`}
            </Button>
          </Popover>
        </Popover>
      </section>
    </section>
  );
};

export default Day;

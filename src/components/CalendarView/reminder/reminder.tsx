import { FC } from "react";
import {
  deleteReminder,
  editReminder,
  ReminderStateItem,
} from "./stateManagement/reminders.slice";
import "./reminder.less";
import { Button, Form, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { generateClassNamesWithBaseClass } from "utils/utils";
import { getAddReminderForm } from "../Day/day";

interface Props {
  reminder: ReminderStateItem;
  className?: string;
}

const Reminder: FC<Props> = ({ reminder, className }) => {
  const PrefixClassName = "Reminder";
  const classes = generateClassNamesWithBaseClass(PrefixClassName);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleEditSubmit = (values: any) => {
    const hours = values.when.format("HH:mm").split(":");
    const when = new Date(reminder.when).setHours(hours[0], hours[1], 0);
    dispatch(
      editReminder({
        ...reminder,
        ...values,
        when,
      } as ReminderStateItem)
    );
    Modal.destroyAll();
  };

  const editContent = getAddReminderForm(
    form,
    new Date(reminder.when),
    handleEditSubmit,
    reminder
  );

  const showEditModal = () => {
    modal.update({
      content: editContent,
      okButtonProps: {
        onClick: () => form.submit(),
        style: { color: "black", visibility: "visible" },
      },
    });
  };

  const handleDelete = () => {
    Modal.destroyAll();
    dispatch(deleteReminder(reminder));
  };

  const RemainderDetails = (
    <div>
      <h2>{reminder.description}</h2>
      <div>{new Date(reminder.when).toString()}</div>
      <br/>
      <br/>
      <section className={classes("Details-actions")}>
        <Button shape="circle" onClick={showEditModal} icon={<EditOutlined />} />
        <Button shape="circle" onClick={handleDelete} icon={<DeleteOutlined />} />
      </section>
    </div>
  );

  let modal: { update: any; destroy?: () => void };

  const showModal = (evt: any) => {
    evt.stopPropagation();
    modal = Modal.info({
      icon: <></>,
      content: RemainderDetails,
      closable: true,
      centered: true,
      direction: "ltr",
      maskClosable: true,
      okButtonProps: { style: { visibility: "hidden" } },
    });
  };

  return (
    <>
      <Button
        style={{ backgroundColor: reminder.color }}
        className={classes(PrefixClassName, className, "Item")}
        onClick={(e) => showModal(e)}
      >
        {reminder.description}
      </Button>
    </>
  );
};

export default Reminder;

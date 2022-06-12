import { FC } from "react";
import {
  deleteReminder,
  editReminder,
  ReminderStateItem,
} from "./stateManagement/reminders.slice";
import "./reminder.less";
import { Button, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { generateClassNamesWithBaseClass } from "utils/utils";

interface Props {
  reminder: ReminderStateItem;
  className?: string;
}

const Reminder: FC<Props> = ({ reminder, className }) => {
  const PrefixClassName = "Reminder";
  const classes = generateClassNamesWithBaseClass(PrefixClassName);

  const dispatch = useDispatch();

  const handleEdit = () => {
    Modal.destroyAll();
    dispatch(editReminder(reminder));
  };

  const handleDelete = () => {
    Modal.destroyAll();
    dispatch(deleteReminder(reminder));
  };
  const RemainderDetails = (
    <div>
      <Row justify="start">
        <Button onClick={handleEdit} icon={<EditOutlined />} />
        <Button onClick={handleDelete} icon={<DeleteOutlined />} />
      </Row>
      <div>{reminder.description}</div>
      <div>{new Date(reminder.when).toString()}</div>
    </div>
  );

  const showModal = (evt: any) => {
    evt.stopPropagation();
    Modal.info({
      icon: <></>,
      content: RemainderDetails,
      closable: true,
      centered: true,
      direction: "ltr",
      maskClosable: true,
      okButtonProps: { style: { display: "none" } },
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

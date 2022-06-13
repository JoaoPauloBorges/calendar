import { FC } from "react";
import {
  deleteReminder,
  editReminder,
  ReminderStateItem,
} from "./stateManagement/reminders.slice";
import "./reminder.less";
import { Button, Form, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { generateClassNamesWithBaseClass } from "utils/utils";
import { getAddEditReminderForm } from "../Day/day";

interface Props {
  reminder: ReminderStateItem;
  handleClickOnReminder: () => void;
}

const Reminder: FC<Props> = ({ reminder, handleClickOnReminder }) => {
  const PrefixClassName = "Reminder";
  const classes = generateClassNamesWithBaseClass(PrefixClassName);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleEditSubmit = (values: any) => {
    const hours = values.when.format("HH:mm").split(":");
    const when = new Date(values.dateUpdate).setHours(hours[0], hours[1], 0);
    delete values.dateUpdate;
    dispatch(
      editReminder({
        ...reminder,
        ...values,
        when,
      } as ReminderStateItem)
    );
    Modal.destroyAll();
  };


  const editContent = getAddEditReminderForm(
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
      <br />
      <br />
      <section className={classes("Details-actions")}>
        <Button
          shape="circle"
          onClick={showEditModal}
          icon={<EditOutlined />}
        />
        <Button
          shape="circle"
          onClick={handleDelete}
          icon={<DeleteOutlined />}
        />
      </section>
    </div>
  );

  let modal: { update: any; destroy?: () => void };

  const showModal = (evt: any) => {
    evt.stopPropagation();
    handleClickOnReminder();
    Modal.destroyAll();
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
        className={classes(PrefixClassName, "Item")}
        onClick={(e) => showModal(e)}
      >
        {reminder.description}
      </Button>
    </>
  );
};

export default Reminder;

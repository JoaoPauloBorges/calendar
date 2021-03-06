import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Button, DatePicker } from "antd";
import { Header } from "antd/lib/layout/layout";
import {
  selectCurrentDate,
  decreaseMonth,
  increaseMonth,
  resetCurrentDate,
  setCurrentYear,
} from "components/CalendarView/stateManagement/current-date.slice";
import moment from "moment";
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateClassNamesWithBaseClass, getMonthName } from "utils/utils";
import "./layoutHeader.less";

const LayoutHeader: FC = () => {
  const PrefixBaseClass = "LayoutHeader";
  const classes = generateClassNamesWithBaseClass(PrefixBaseClass);
  const currentDate = useSelector(selectCurrentDate);
  const dispatch = useDispatch();

  return (
    <Header className={classes("Header")}>
      <Row className={classes("Menu")}>
        <section className={classes("Logo")}>
          <Button
            className={classes("Logo-Button")}
            type="primary"
            onClick={() => dispatch(resetCurrentDate())}
          >
            2Day
          </Button>
        </section>
      </Row>
      <Row className={classes("Actions")}>
        <DatePicker
          className={classes("Year")}
          clearIcon={<></>}
          bordered={false}
          value={moment(currentDate)}
          onChange={(date, dateString) => dispatch(setCurrentYear(dateString))}
          inputReadOnly
          picker="year"
        />
        <Button
          className={classes("ButtonLeft")}
          icon={<LeftOutlined />}
          ghost
          shape="circle"
          onClick={() => dispatch(decreaseMonth())}
        />
        <span className={classes("Month")}>
          {getMonthName(new Date(currentDate).getMonth())}
        </span>
        <Button
          className={classes("ButtonRight")}
          icon={<RightOutlined />}
          ghost
          shape="circle"
          onClick={() => dispatch(increaseMonth())}
        />
      </Row>
      <Row className={classes("ThemeActions")}>
        <Button type="link" icon={<div>????</div>} />
        <Button type="link" icon={<div>????</div>} />
      </Row>
    </Header>
  );
};

export default LayoutHeader;

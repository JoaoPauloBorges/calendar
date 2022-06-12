import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import {
  selectCurrentDate,
  decreaseMonth,
  increaseMonth,
  reset,
} from "components/CalendarView/stateManagement/current-date.slice";
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
            onClick={() => dispatch(reset())}
          >
            2Day
          </Button>
        </section>
      </Row>
      <Row className={classes("Actions")}>
        <span className={classes("Year")}>
          {new Date(currentDate).getFullYear()}
        </span>
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
        <Button type="link" icon={<div>😎</div>} />
        <Button type="link" icon={<div>🌚</div>} />
      </Row>
    </Header>
  );
};

export default LayoutHeader;

import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import CountCard from "../../components/countCard/CountCard";
import Month from "../../components/MonthBox/Month";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers } from "../../store/config/config.action";

function DashBoard() {
  const dispatch = useDispatch();
  const Config = useSelector(state => state.Config);
  const ConfigUsers = Config?.users?.data[0]
  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  return (
    <Box>
      <Month />
      <Box flexWrap="wrap" display="flex" margin="0 20px">
        <CountCard
          bgcolor={"linear-gradient(to right,#f05e26, #e7205b)"}
          count={ConfigUsers?.masterCount}
          text={"تعداد رانندگان"}
          icon={<GroupAddIcon style={{ fontSize: 120, opacity: 0.2 }} />}
        />
        <CountCard
          bgcolor={"linear-gradient(to right,#55dbd8, #667fe6)"}
          count={ConfigUsers?.userCount}
          text={"تعداد کاربران"}
          icon={<QuestionAnswerIcon style={{ fontSize: 120, opacity: 0.2 }} />}
        />
      </Box>
    </Box>
  );
}

export default DashBoard;

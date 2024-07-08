import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

const getMonthlyData = (pivotData, data) => {
  //이번달이 시작되는 시간을 먼저 구해야함
  const beginTime = new Date(
    pivotData.getFullYear(),
    pivotData.getMonth(),
    1, //1일
    0, //0시
    0, //0분
    0 //0초
  ).getTime();

  //이번달에 마지막 시간
  const endTime = new Date(
    pivotData.getFullYear(),
    pivotData.getMonth() + 1, //+1 하고 일을 0으로 하면 해당하는 날에 마지막날로 설정이됨
    0, //0일                  //ex) pivotData가 2월이면 -> 3월의 0일 = 2월의 마지막날
    23, //23시
    59, //59분
    59 //59초
  ).getTime();

  //이 달의 일기 데이터들만 필터링 하기
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  usePageTitle("감정 일기장");

  const monthlyData = getMonthlyData(pivotDate, data);

  //함수 따로 빼서
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  // const onIncreaseMonth = () => {};

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={
          <Button
            text={">"}
            onClick={() => {
              setPivotDate(
                new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
              );
            }}
          />
        }
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;

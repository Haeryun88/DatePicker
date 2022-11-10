import * as React from 'react';
import './DatePicker.css';
const nowdate = new Date();

const Days = (props) => {
  // return <div onClick={props.onGetDay}>{props.days}</div>;
  return (
    <div className="day" onClick={props.onGetDay}>
      {props.days}
    </div>
  );
};

const DatePicker = () => {
  //연도 구하기
  const [year, setYear] = React.useState(nowdate.getFullYear());
  //월 구하기
  const [month, setMonth] = React.useState(nowdate.getMonth() + 1);
  //날짜 구하기
  const [day, setDay] = React.useState(nowdate.getDay());

  //이전 연도와 지금 연도
  const prevLast = new Date(year, month, 0);
  const thisLast = new Date(year, month + 1, 0);

  //마지막 날짜와 요일
  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  //이번달 마지막날과 요일
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  //날짜들을 담아둘 배열
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  //배열 반복문을 통한 추가
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  //날짜 객체 추가
  const dates = prevDates.concat(thisDates, nextDates);

  //날짜 구하는 함수
  const onGetDay = (e) => {
    let dayValue;
    dayValue = e.target.innerHTML;
    console.log(dayValue);
    setDay(dayValue);
  };

  //이전 버튼을 클릭했을시
  const onPrevMonth = () => {
    setMonth(month - 1);
    if (month < 2) {
      setYear(year - 1);
      setMonth(12);
    }
  };
  //이후 버튼을 클릭했을시
  const onNextMonth = () => {
    setMonth(month + 1);
    if (month > 11) {
      setYear(year + 1);
      setMonth(1);
    }
  };

  return (
    <div>
      <div className="calendar">
        <div className="header">
          <div>
            {year}.{month < 10 ? '0' + month : month}.
            {day < 10 ? '0' + day : day}
          </div>
          <div className="nav">
            <p onClick={onPrevMonth} className="nav-btn go-prev">
              &lt;
            </p>
            <p className="year-month">
              {year}.{month < 10 ? '0' + month : month}
            </p>
            <p onClick={onNextMonth} className="nav-btn go-next">
              &gt;
            </p>
          </div>
        </div>
        <div className="main">
          <div className="days">
            <div className="day">일</div>
            <div className="day">월</div>
            <div className="day">화</div>
            <div className="day">수</div>
            <div className="day">목</div>
            <div className="day">금</div>
            <div className="day">토</div>
          </div>
          <div className="dates">
            {dates.map((days) => (
              <Days days={days} onGetDay={onGetDay} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

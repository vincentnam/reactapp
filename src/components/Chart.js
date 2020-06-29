
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from "axios";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const dataday = [
  createData('00:00', 0),
  createData('01:00', 0),
  createData('02:00', 0),
  createData('03:00', 0),
  createData('04:00', 0),
  createData('05:00', 0),
  createData('06:00', 1),
  createData('07:00', 7),
  createData('08:00', 23),
  createData('09:00', 7),
  createData('10:00', 12),
  createData('11:00', 7),
  createData('12:00', 31),
  createData('13:00', 23),
  createData('14:00', 28),
  createData('15:00', 2),
  createData('16:00', 9),
  createData('17:00', 12),
  createData('18:00', 18),
  createData('19:00', 20),
  createData('20:00', 7),
  createData('21:00', 3),
  createData('22:00', 1),
  createData('23:00', 0),
  createData('24:00', 0),
];

const dataWeek = [
  createData('2016-10-28', 200),
  createData('2016-10-29', 12),
  createData('2016-10-30', 4),
  createData('2016-10-31', 250),
  createData('2016-11-01', 198),
  createData('2016-11-02', 230),
  createData('2016-11-03', 172)
];

const dataMonth = [
  createData('2016-10-28', 200),
  createData('2016-10-29', 12),
  createData('2016-10-30', 4),
  createData('2016-10-31', 250),
  createData('2016-11-01', 198),
  createData('2016-11-02', 230),
  createData('2016-11-03', 172),
  createData('2016-11-04', 120),
  createData('2016-11-05', 23),
  createData('2016-11-06', 7),
  createData('2016-11-07', 222),
  createData('2016-11-08', 256),
  createData('2016-11-09', 292),
  createData('2016-11-10', 312),
  createData('2016-11-11', 310),
  createData('2016-11-12', 2),
  createData('2016-11-13', 9),
  createData('2016-11-14', 120),
  createData('2016-11-15', 180),
  createData('2016-11-16', 200),
  createData('2016-11-17', 70),
  createData('2016-11-18', 74),
  createData('2016-11-19', 1),
  createData('2016-11-20', 0),
  createData('2016-11-21', 152),
  createData('2016-11-22', 152),
  createData('2016-11-23', 280),
  createData('2016-11-24', 290),
  createData('2016-11-25', 300),
  createData('2016-11-26', 0),
  createData('2016-11-27', 2),
];

const dataYear = [
  createData('2016-01', 2500),
  createData('2016-02', 1980),
  createData('2016-03', 2500),
  createData('2016-04', 2300),
  createData('2016-05', 2000),
  createData('2016-06', 1900),
  createData('2016-07', 572),
  createData('2016-08', 230),
  createData('2016-09', 3700),
  createData('2016-10', 3400),
  createData('2016-11', 2900),
  createData('2016-12', 2564),
];
export default function Chart(props) {
  const data = (period) =>{
    if ( props.period ==="day"){
      return dataday;
    }
    if ( props.period ==="month"){
      return dataMonth;
    }
    if ( props.period ==="week"){
      return dataWeek;
    }
    if ( props.period ==="year"){
      return dataYear;
    }

  };
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data(props.period)}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={0} position="left" style={{ textAnchor: 'middle' }}>
              Cars
            </Label>
          </YAxis>
          <Line type="step" dataKey="amount" stroke="#556CD6" dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
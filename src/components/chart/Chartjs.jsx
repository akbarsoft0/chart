import React from "react";
import { format, parseISO, subDays } from "date-fns";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const data = [];
for (let num = 30; num >= 0; num--) {
    data.push({
        date: subDays(new Date(), num).toISOString().substring(0, 10),
        USD: 1 + Math.random(),
        CAD: 1 - Math.random(),
    });
}
const today = data[data.length - 1];

function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
            <div className="Tooltip">
                <h6>{format(parseISO(label), "eeee, d MMM, yyyy")}</h6>
                <h6 className="usd">${payload[0].value.toFixed(2)} USD</h6>
                <h6 className="cad">${payload[1].value.toFixed(2)} CAD</h6>
            </div >
        )
    }
    return null
}

const Chartjs = () => {


    return (
        <>
            <div className="container">
                <h1 className="display-2 cad">my <span className=" usd">chart</span></h1>
                <div className="chart-box">
                    <div className="chart">
                        <ResponsiveContainer width="100%" height={500}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="green" x1={0} y1={0} x2={0} y2={1}>
                                        <stop offset="0%" stopColor="var(--yellow)" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="var(--yellow)" stopOpacity={0.04} />
                                    </linearGradient>
                                    <linearGradient id="blue" x1={0} y1={0} x2={0} y2={1}>
                                        <stop offset="0%" stopColor="var(--gray)" stopOpacity={0.4} />
                                        <stop offset="75%" stopColor="var(--gray)" stopOpacity={0.04} />
                                    </linearGradient>
                                </defs>

                                <Area dataKey="USD" stroke="var(--yellow)" fill="url(#green)" />
                                <Area dataKey="CAD" stroke="var(--gray)" fill="url(#blue)" />

                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(str) => {
                                        const date = parseISO(str);
                                        if (date.getDate() % 7 === 0) {
                                            return format(date, "MMM, d")
                                        }
                                        return ""
                                    }}
                                />

                                <YAxis
                                    dataKey="USD"
                                    axisLine={false}
                                    tickLine={false}
                                    tickCount={8}
                                    tickFormatter={(e) => `$${e.toFixed(2)}`}
                                />

                                <CartesianGrid opacity={0.1} vertical={false} />

                                <Tooltip content={<CustomTooltip />} />

                                <Legend verticalAlign="top" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-text">
                        <div className="row">
                            <div className="col-lg-6 left">
                                <h4>today's / <span style={{ color: '#515a66' }}>{today.date}</span></h4>
                                <h6 className="usd">${today.USD.toFixed(4)} usd</h6>
                                <h6 className="cad">${today.CAD.toFixed(4)} cad</h6>
                            </div>
                            <div className="col-lg-6 right">
                                <h4>chart / <span style={{ color: '#515a66' }}>filter by</span></h4>
                                <button className="active">week <sup>4</sup></button>
                                <button>days <sup>30</sup></button>
                                <button>month <sup>12</sup></button>
                                <button>year <sup>10</sup></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default Chartjs;

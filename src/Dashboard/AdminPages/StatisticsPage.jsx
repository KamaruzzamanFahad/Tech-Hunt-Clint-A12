import React, { PureComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import useAxiousSecure from '../../hooks/useAxiousSecure';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const StatisticsPage = () => {
    const [stats, setstats] = useState([])
    const axiosSecure = useAxiousSecure()
    useEffect(() => {
        axiosSecure.get('/statistics')
            .then(res => {
                setstats(res.data)
            })
    }, [])



    return (
        <div className='flex justify-center items-center w-full h-[100vh]'>
            <Helmet>
                <title>Statistics</title>
            </Helmet>
            <PieChart width={500} height={500}>
                <Pie
                    data={stats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend></Legend>
            </PieChart>
        </div>
    );
};

export default StatisticsPage;
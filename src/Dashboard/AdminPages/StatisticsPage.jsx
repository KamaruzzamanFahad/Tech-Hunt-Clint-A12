import React, { PureComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import useAxiousSecure from '../../hooks/useAxiousSecure';
import { FaUsers } from 'react-icons/fa';
import { IoWallet } from 'react-icons/io5';
import { SiCodechef } from 'react-icons/si';
import { MdWorkspacePremium } from "react-icons/md";

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

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

    const orderstats = [
        {
            name: 'App',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Web',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Software',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Tools',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Games',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
    ];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (

        <div className=' w-full px-4 mt-7 mr-6 ml-20'>
            <h1 className='text-2xl font-bold  cinzel'>Hi, Welcome Back!</h1>
            <div className='flex gap-8 mt-3'>

                <div style={{ backgroundImage: 'linear-gradient(90deg, #BB34F5 0%, #FCDBFF 100%)' }} className='flex justify-center items-center p-10 gap-4 rounded-lg w-full'>
                    <IoWallet className='text-white text-5xl' />
                    <div className='text-center text-white'>
                        <h1 className='font-bold text-3xl'>$560</h1>
                        <h2 className='text-xl font-semibold'>Revenue</h2>
                    </div>
                </div>

                <div style={{ backgroundImage: 'linear-gradient(90deg, #D3A256 0%, #FDE8C0 100%)' }} className='flex justify-center items-center p-10 gap-4 rounded-lg w-full'>
                    <FaUsers className='text-white text-5xl' />
                    <div className='text-center text-white'>
                        <h1 className='font-bold text-3xl'>1150</h1>
                        <h2 className='text-xl font-semibold'>User</h2>
                    </div>
                </div>

                <div style={{ backgroundImage: 'linear-gradient(90deg, #FE4880 0%, #FECDE9 100%)' }} className='flex justify-center items-center p-10 gap-4 rounded-lg w-full'>
                    <SiCodechef className='text-white text-5xl' />
                    <div className='text-center text-white'>
                        <h1 className='font-bold text-3xl'>1200</h1>
                        <h2 className='text-xl font-semibold'>Products</h2>
                    </div>
                </div>

                <div style={{ backgroundImage: 'linear-gradient(90deg, #6AAEFF 0%, #B6F7FF 100%)' }} className='flex justify-center items-center p-10 gap-4 rounded-lg w-full'>
                    <MdWorkspacePremium  className='text-white text-5xl' />
                    <div className='text-center text-white'>
                        <h1 className='font-bold text-3xl'>320</h1>
                        <h2 className='text-xl font-semibold'>Premium</h2>
                    </div>
                </div>
            </div>


            <div className='flex mt-20 gap-40'>
                <div className="w-1/2">
                    <BarChart
                        width={800}
                        height={500}
                        data={orderstats}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">

                    <PieChart className='' width={500} height={500}>
                        <Legend></Legend>
                        <Pie
                            data={stats}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {stats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>

                </div>
            </div>
        </div>

    );
};

export default StatisticsPage;
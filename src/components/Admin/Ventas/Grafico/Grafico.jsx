import React from 'react';
import styles from './Grafico.module.css'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    CartesianGrid,
} from "recharts";
    
export default function Home({history}) {
    return (
        <>
        {
            history.length > 0 &&
            <div className={styles.AreaChart}>
                <h4>Promedio de ventas</h4>
                <ResponsiveContainer width="99%" height={400} >
                    <AreaChart data={history} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                    
                    <Area dataKey="monto" stroke="#2451B7" fill="url(#color)" />
                    
                    <XAxis
                        dataKey="id"
                        axisLine={false}
                        tickLine={false}
                        // tickFormatter={(str) => {
                        //     return `operación ${str}`;
                        // }}
                    />
                
                    <YAxis
                        datakey="monto"
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        tickFormatter={(number) => `$${number.toFixed(1)}`}
                    />
                
                    {/* <Tooltip content={<CustomTooltip />} /> */}
                        
                    <CartesianGrid opacity={0.1} vertical={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        }
        </>
    );
}


// function CustomTooltip({ active, payload, label }) {
//     if (active) {
//     return (
//         <div className="tooltip">
//         <h4>{`ID ${label}`}</h4>
//         <p>Total: U${payload[0].value.toFixed(1)}</p>
//         </div>
//     );
//     }
//     return null;
// }

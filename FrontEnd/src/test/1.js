import { LineChart, Line, CartesianGrid, XAxis, YAxis ,Tooltip} from 'recharts';
const data = [
  { name: 'Group A', uv: 400 }, { name: 'Group B', uv: 300 },
  { name: 'Group C', uv: 300 }, { name: 'Group D', uv: 200 },
  { name: 'Group E', uv: 278 }, { name: 'Group F', uv: 189 },
];
const Revenue = [
  { date: "2023-08-01", count: 10, revenue: 1000 },
  { date: "2023-08-02", count: 15, revenue: 1500 },
  { date: "2023-08-03", count: 20, revenue: 2000 },
  // More data...
];

export default function renderLineChart(){
  return(
<LineChart width={900} height={300} data={Revenue} margin={{ top: 5, right: 10, bottom: 5, left: 30 }}>
  <Line type="monotone" dataKey="revenue" stroke="#253544" />
  <Line type="monotone" dataKey="count" stroke="#ff7300" />
  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
</LineChart>

  )
}
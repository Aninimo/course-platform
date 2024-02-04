import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface GraphProps {
  data: any[]
}

export function Graph({ data }: GraphProps) {
    return (
      <div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              type="category"
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

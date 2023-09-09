import { FC } from 'react'

import { Heading, Stack } from '@chakra-ui/react'
import { CartesianGrid, XAxis, YAxis, LineChart, Tooltip, ResponsiveContainer, Line } from 'recharts';

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 1400, amt: 1400 }];

const Dashboard: FC = (): JSX.Element => {

  return (
    <Stack minHeight='calc(100vh - 115px)' bgColor='gray.200'>
      <Heading textAlign='center'>Dashboard</Heading>
      <ResponsiveContainer width={700} height="80%">
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Stack>
  )
}

export default Dashboard;
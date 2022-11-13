// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-coverage">
      <h1 className="vaccination-coverage-title">Vaccination Coverage</h1>
      <ResponsiveContainer width={1000} height={300}>
        <BarChart
          data={last7DaysVaccination}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#cbd5e1',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#cbd5e1',
              strokeWidth: 1,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            barSize="10%"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            barSize="10%"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      )
    </div>
  )
}

export default VaccinationCoverage

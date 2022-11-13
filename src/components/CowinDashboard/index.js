// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

class CowinDashboard extends Component {
  state = {
    vaccinationByAge: [],
    last7DaysVaccination: [],
    vaccinationByGender: [],
    apiStatus: true,
    isLoading: true,
  }

  componentDidMount() {
    this.getCovidVaccinationDetails()
  }

  getCovidVaccinationDetails = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const last7DaysVaccinationU = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      const vaccinationByAgeU = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))
      const vaccinationByGenderU = data.vaccination_by_gender.map(each => ({
        count: each.count,
        gender: each.gender,
      }))
      this.setState({
        vaccinationByAge: vaccinationByAgeU,
        last7DaysVaccination: last7DaysVaccinationU,
        vaccinationByGender: vaccinationByGenderU,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: false, isLoading: false})
    }
  }

  successView = () => {
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = this.state

    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  loadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  finalResultView = () => {
    const {apiStatus, isLoading} = this.state
    if (apiStatus) {
      if (isLoading) {
        return this.loadingView()
      }
      return this.successView()
    }
    return this.failureView()
  }

  render() {
    return (
      <div className="cowin-dashboard-bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="logo-title">Co-WIN</h1>
        </div>
        <h1 className="dash-board-title">CoWIN Vaccination in India</h1>
        {this.finalResultView()}
      </div>
    )
  }
}

export default CowinDashboard

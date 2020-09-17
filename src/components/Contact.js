import React from 'react'
import Chart from './Chart';
import { TypeChooser } from "react-stockcharts/lib/helper";
import { getData2 } from "./utils"

class Contact extends React.Component {

    componentDidMount() {
		getData2().then(data => {
            //console.log("data: " + data)
			this.setState({ data })
		})
	}

    onSubmit = () => {
        this.props.history.push('/')
    }

    render() {
        if (this.state == null) {
			return <div>Loading...</div>
        }
        
        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
        )
    }
  } export default Contact
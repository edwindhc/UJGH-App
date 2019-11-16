import React, { Component } from 'react'
import Student from './student'
import Teacher from './teacher'
import Admin from './admin'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 0
        }
    }
    componentDidMount() {
        let local = JSON.parse(localStorage.getItem('user'))
        console.log(local, ' local')
        const role = local.user.role ? local.user.role : 0
        this.setState({ role })
    }
    render() {
        const { role } = this.state
        return (
            <div>
                {role === 2 ? <Admin /> : role === 1 ? <Teacher /> : <Student />}
            </div>
        );
    }
}

export default Dashboard;
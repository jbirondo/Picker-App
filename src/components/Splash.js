import React from "react"

class Splash extends React.Component{
    constructor(){
        super()
        this.state = {
            matchUps: [],
            fetchErr: null,
            isLoading: true
        }
    }

    componentDidMount() {
        this.fetchMatchUps()
    }

    fetchMatchUps(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000');
        const url = "http://flask-env.eba-uqj6sxyv.us-west-1.elasticbeanstalk.com/"
        fetch(url, {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
            headers: headers
        }).then(response => {
            response.json().then(response => {
                this.setState({
                    matchUps: response.MatchUps
                })
            })
        }).catch(error => {
            this.setState({
                fetchErr: error,
                isLoading: false
            })
        })
    }


    render(){
        console.table(this.state.matchUps)
        return(
            <div>"Hello World</div>
        )
    }
}

export default Splash
import React from "react"
import "./Splash.css"
import helmet from "./helmet.png"


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

    singleMatchUp(matchUp){
        let awayHelmClass = "awayHelmet " + matchUp["Away"]
        let homeHelmClass = "homeHelmet " + matchUp["Home"]
        if(matchUp["Temperature"] === "Dome"){
            
        }
        return(
            <div className="singleMatchUpContainer">
                <div className="awayVsHomeContainer">
                    <div>{matchUp["Away"]}</div>
                    <div>at</div>
                    <div>{matchUp["Home"]}</div>
                </div>
                <div className="helmetsAndInfo">
                    <img className={awayHelmClass} src={helmet} alt=""></img>
                    <div className="gamblingInfoContainer">
                        <div>{matchUp["Favorite"]} (-{matchUp["Favored By"]})</div>
                        <div>{matchUp["Over/Under"]}</div>
                        <div className="weatherContainer">

                        </div>

                    </div>    
                    <img className={homeHelmClass} src={helmet} alt=""></img>
                </div>
                <div>{matchUp["Date/Time"]}</div>
                <div>{matchUp["Precipitation"]}</div>
                <div>{matchUp["Temperature"]}</div>
                <div>{matchUp["Underdog"]}</div>
                <div>{matchUp["Wind Direction"]}</div>
                <div>{matchUp["Wind Speed"]}</div>
            </div>
        )
    }


    render(){
        
        return(
            <div className="matchUpsContainer">
                {this.state.matchUps.map(matchUp => {
                    return this.singleMatchUp(matchUp)
                })}
            </div>
        )
    }
}

export default Splash
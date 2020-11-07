import React from "react"
import "./Splash.css"
import helmet from "./helmet.png"
import dome from "./dome.jpg"
import teamLogo from "./TeamLogos"


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

    value(str){
        let val = str.split(" ")
        return val[0]
    }

    singleMatchUp(matchUp){
        let awayHelmClass = "awayHelmet " + matchUp["Away"]
        let homeHelmClass = "homeHelmet " + matchUp["Home"]

        let weather = matchUp["Temperature"] === "Dome" ? (
            <div className="domeContainer">
                <div>Dome</div>
                <img className="domeIcon" src={dome} alt=""></img>
            </div>
        ) : (
            <div className="weatherContainer">
                <div>{this.value(matchUp["Precipitation"])}</div>
                <div>{this.value(matchUp["Temperature"])}</div>
                <div>{matchUp["Wind Direction"]}</div>
                <div>{matchUp["Wind Speed"]}</div>
            </div>
        )

        let awayVsHome = matchUp["Favorite"] === matchUp["Home"] ? (
            <div className="awayVsHomeContainer">
                <div>{matchUp["Away"].replace("_", " ")}</div>
                <div>at</div>
                <div>(-{matchUp["Favored By"]}){matchUp["Home"].replace("_", " ")}</div>
            </div>
        ) : (
            <div className="awayVsHomeContainer">
                <div>{matchUp["Away"].replace("_", " ")}(-{matchUp["Favored By"]})</div>
                <div>at</div>
                <div>{matchUp["Home"].replace("_", " ")}</div>
            </div>
        )

        return(
            <div className="singleMatchUpContainer">
                <div>{matchUp["Date/Time"]}</div>
                <div className="helmetsAndInfo">
                    <img className={awayHelmClass} src={teamLogo(matchUp["Away"])} alt=""></img>
                    <div className="gamblingInfoContainer">
                        <div>{matchUp["Over/Under"]}</div>
                        {weather}
                    </div>    
                    <img className={homeHelmClass} src={teamLogo(matchUp["Home"])} alt=""></img>
                </div>
                {awayVsHome}
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
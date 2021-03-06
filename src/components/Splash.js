import React from "react"
import "./Splash.css"
import dome from "./dome.png"
import teamLogo from "./TeamLogos"
import wind from "./wind.png"
import rain from "./rain.png"
import temp from "./temp.png"


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

    rainClass(str){
        if(parseFloat(str) > 50){
            return "red"
        } else if(parseFloat(str) > 30 && parseFloat(str) <= 50){
            return "orange"
        } else {
            return "green"
        }
    }
    tempClass(str){
        if(parseFloat(str) > 107){
            return "red"
        } else {
            return "green"
        }
    }
    windClass(str){
        if(parseFloat(str) >= 20){
            return "red"
        } else if(parseFloat(str) >= 10 && parseFloat(str) < 20){
            return "orange"
        } else {
            return "green"
        }
    }

    singleMatchUp(matchUp){
        let awayHelmClass = "awayHelmet " + matchUp["Away"]
        let homeHelmClass = "homeHelmet " + matchUp["Home"]

        let weather = matchUp["Temperature"] === "Dome" ? (
            <div className="domeContainer">
                <img className="domeIcon" src={dome} alt=""></img>
            </div>
        ) : (
            <div className="weatherContainer">
                <div>
                    <img className="icon" src={rain} alt=""></img>  
                    <div className={this.rainClass(this.value(matchUp["Precipitation"]))}>{this.value(matchUp["Precipitation"])}</div>
                </div>
                <div>
                    <img className="icon" src={temp} alt=""></img>  
                    <div className={this.tempClass(this.value(matchUp["Temperature"]))}>{this.value(matchUp["Temperature"])}</div>
                </div>
                <div>
                    <img className="icon" src={wind} alt=""></img>  
                    <div className={this.windClass(matchUp["Wind Speed"])}>{matchUp["Wind Speed"]}</div>
                </div>
            </div>
        )

        let awayVsHome = matchUp["Favorite"] === matchUp["Home"] ? (
            <div className="awayVsHomeContainer">
                <div>{matchUp["Away"].replace("_", " ")}</div>
                <div className="gamblingInfoContainer">
                    <div>{matchUp["Over/Under"]}</div>
                </div>      
                <div>(-{matchUp["Favored By"]}){matchUp["Home"].replace("_", " ")}</div>
            </div>
        ) : (
            <div className="awayVsHomeContainer">
                <div>{matchUp["Away"].replace("_", " ")}(-{matchUp["Favored By"]})</div>
                <div className="gamblingInfoContainer">
                    <div>{matchUp["Over/Under"]}</div>
                </div>      
                <div>{matchUp["Home"].replace("_", " ")}</div>
            </div>
        )

        let gamblingInfo = matchUp["Favorite"] === matchUp["Home"] ? (
                <div className="helmetsAndInfo">
                    <img className={awayHelmClass} src={teamLogo(matchUp["Away"])} alt=""></img>
                    <div className="gamblingInfoContainer">
                        <div>{matchUp["Over/Under"]}</div>
                    </div>
                    <div>
                        <div>(-{matchUp["Favored By"]})</div>
                        <img className={homeHelmClass} src={teamLogo(matchUp["Home"])} alt=""></img>
                    </div>    
                </div>
        ) : (
                <div className="helmetsAndInfo">
                    <div>
                        <img className={awayHelmClass} src={teamLogo(matchUp["Away"])} alt=""></img>
                        <div>(-{matchUp["Favored By"]})</div>
                    </div>
                    <div className="gamblingInfoContainer">
                        <div>{matchUp["Over/Under"]}</div>
                    </div>    
                    <img className={homeHelmClass} src={teamLogo(matchUp["Home"])} alt=""></img>
                </div>
        )


        
        return(
            <div className="singleMatchUpContainer">
                <div>{matchUp["Date/Time"]}</div>
                <div className="helmetsAndInfo">
                    <img className={awayHelmClass} src={teamLogo(matchUp["Away"])} alt=""></img>
                    {weather}  
                    <img className={homeHelmClass} src={teamLogo(matchUp["Home"])} alt=""></img>
                </div>
                {/* <div className="gamblingInfoContainer">
                    <div>{matchUp["Over/Under"]}</div>
                </div>       */}
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
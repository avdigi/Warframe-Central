import React, { Component } from "react";
import { Helmet } from "react-helmet";
import logo from "./img/warframeLogo.png";
import reactlogo from "./img/logo.svg";
import replogo from "./img/reputation.png";
import endologo from "./img/endo.png";
import crlogo from "./img/Credits.png";
import reslogo from "./img/resource.png";
import fuslogo from "./img/fusion.png";
import lenlogo from "./img/lens.png";
import rellogo from "./img/relic.png";
import helmlogo from "./img/bp.png";
import chslogo from "./img/Chassis.png";
import syslogo from "./img/Systems.png";
import furlogo from "./img/furax.png";
import kuvlogo from "./img/Kuva.png";
import auglogo from "./img/augur.png";
import glalogo from "./img/gladiator.png";
import viglogo from "./img/vigilante.png";
import "./App.css";
import axios from "axios";
import Marquee from "react-text-marquee";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Moment from "moment";
import moment from "moment";
import ReactMomentCountDown from "react-moment-countdown";

function rewardPoolAvatar(data) {
  let avatar = null;

  if (data.includes("Endo")) {
    avatar = (
      <Avatar>
        <img src={endologo} alt="Endo" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Credit")) {
    avatar = (
      <Avatar>
        <img src={crlogo} alt="credits" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Lens")) {
    avatar = (
      <Avatar>
        <img src={lenlogo} alt="lens" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Relic")) {
    avatar = (
      <Avatar>
        <img src={rellogo} alt="relic" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Neuroptics")) {
    avatar = (
      <Avatar>
        <img src={helmlogo} alt="neuroptics" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("System")) {
    avatar = (
      <Avatar>
        <img src={syslogo} alt="system" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Chassis")) {
    avatar = (
      <Avatar>
        <img src={chslogo} alt="chassis" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Furax")) {
    avatar = (
      <Avatar>
        <img src={furlogo} alt="furax" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Kuva")) {
    avatar = (
      <Avatar>
        <img src={kuvlogo} alt="kuva" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Augur")) {
    avatar = (
      <Avatar>
        <img src={auglogo} alt="kuva" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Gladiator")) {
    avatar = (
      <Avatar>
        <img src={glalogo} alt="kuva" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (data.includes("Vigilante")) {
    avatar = (
      <Avatar>
        <img src={viglogo} alt="kuva" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else if (
    data.includes("Cryotic") ||
    data.includes("Plastids") ||
    data.includes("Grokdrul") ||
    data.includes("Iradite") ||
    data.includes("Nistlepod") ||
    data.includes("Gallium") ||
    data.includes("Orokin Cell") ||
    data.includes("Wisp") ||
    data.includes("Breath") ||
    data.includes("Circuits") ||
    data.includes("Morphic") ||
    data.includes("Control") ||
    data.includes("Oxium")
  ) {
    avatar = (
      <Avatar>
        <img src={reslogo} alt="resource" className="rewardPoolAvatar" />
      </Avatar>
    );
  } else {
    avatar = (
      <Avatar>
        <img src={fuslogo} alt="mod" className="rewardPoolAvatar" />
      </Avatar>
    );
  }
  return avatar;
}

function rewardStanding(data) {
  var standing = 0;
  for (var i = 0; i < data.standingStages.length; i++) {
    standing += data.standingStages[i];
  }
  return standing;
}

function calculateTimeLeft(data) {
  Moment.locale("en");
  var dt = data;
  var endDate = moment(dt);
  return <ReactMomentCountDown toDate={endDate} />;
}

function calculateDaysLeft(data) {
  Moment.locale("en");
  var dt = data;
  var endDate = moment(dt);
  return (
    <ReactMomentCountDown toDate={endDate} targetFormatMask="DD:HH:mm:ss" />
  );
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      newsList: [],
      cetusBounty: [],
      cetusBountyJobs: [],
      cetusCycle: [],
      voidTrader: [],
      currentCount: []
    };

    this.baseState = this.state;
  }

  async getRepo() {
    var axiosInstance = axios.create({
      baseURL: "https://ws.warframestat.us/"
    });
    try {
      let res = await axiosInstance.get("/pc");
      this.setState({
        newsList: res.data.news,
        cetusCycle: res.data.cetusCycle,
        cetusBounty: this.getSyndicate(res.data.syndicateMissions),
        cetusBountyJobs: await this.getSyndicateJobs(
          res.data.syndicateMissions
        ),
        voidTrader: res.data.voidTrader
      });
    } catch (err) {
      console.error(err);
    }
  }

  getSyndicate(cetusData) {
    for (var i = 0; i <= cetusData.length; i++) {
      if (cetusData[i].syndicate.includes("Ostrons")) {
        return cetusData[i];
      } else {
      }
    }
  }

  getSyndicateJobs(cetusData) {
    for (var i = 0; i <= cetusData.length; i++) {
      if (cetusData[i].syndicate.includes("Ostrons")) {
        return cetusData[i].jobs;
      } else {
      }
    }
  }

  componentDidMount() {
    this.getRepo();
  }

  render() {
    const newsData = this.state.newsList;
    const cycleData = this.state.cetusCycle;
    const cetusData = this.state.cetusBounty;
    const cetusDataJobs = this.state.cetusBountyJobs;
    const voidData = this.state.voidTrader;
    var counter = 1;

    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Warframe Central</title>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
          <link rel="icon" type="image/png" href={logo} sizes="16x16" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="Warframe Central" />
          <link rel="apple-touch-icon" href={logo} />
          <meta name="msapplication-TileImage" content={logo} />
          <meta name="msapplication-TileColor" content="#2F3BA2" />
        </Helmet>

        {/* Navbar */}
        <div id="header">
          <AppBar position="static" className="App-Menu">
            <Toolbar>
              <img src={logo} alt="logo" className="App-Logo" />
              <Typography
                variant="headline"
                color="inherit"
                className="App-Title"
              >
                Warframe Central
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Scrolling News Ticker */}
          <div className="newsMarquee">
            <Marquee
              text={Object.keys(newsData).map(key => (
                <span>
                  <a
                    className="newsText"
                    href={newsData[key].link}
                    title="Warframe News"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {newsData[key].message}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </a>
                  &#x25C7;
                </span>
              ))}
              hoverToStop={true}
              loop={true}
            />
          </div>
        </div>
        <div id="body">
          <Grid container>
            {/* Void Trader Panel */}
            <Grid item lg={2} />
            <Grid item xs={12} sm={6} lg={4}>
              <Paper className="poeClock" elevation={5}>
                <div>
                  <Typography variant="headline" className="paneHead">
                    Void Trader
                  </Typography>
                  <Typography variant="headline">
                    {voidData.character} will&nbsp;
                    {(() => {
                      if (voidData.active) {
                        return (
                          <span>
                            <span className="dayClock">depart</span> in
                            <Typography variant="display2">
                              {calculateDaysLeft(voidData.expiry)}
                            </Typography>
                          </span>
                        );
                      } else {
                        return (
                          <span>
                            <span className="nightClock">arrive</span> in
                            <Typography variant="display2">
                              {calculateDaysLeft(voidData.activation)}
                            </Typography>
                          </span>
                        );
                      }
                    })()}
                  </Typography>
                </div>
              </Paper>
            </Grid>

            {/* PoE Clock Panel */}
            <Grid item xs={12} sm={6} lg={4}>
              <Paper className="poeClock" elevation={5}>
                <div>
                  <Typography variant="headline" className="paneHead">
                    Cetus Clock
                  </Typography>
                  <Typography variant="headline">
                    Time until&nbsp;
                    {(() => {
                      if (cycleData.isDay) {
                        return <span className="nightClock">night</span>;
                      } else {
                        return <span className="dayClock">day</span>;
                      }
                    })()}
                  </Typography>
                  <Typography variant="display2">
                    {calculateTimeLeft(cycleData.expiry)}
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item lg={2} />

            {/* Ostron Bounties Panel */}
            <Grid item lg={2} />
            <Grid item xs={12} lg={8}>
              <Paper className="poeClock" elevation={5}>
                <div>
                  <Typography variant="headline" className="paneHead">
                    Ostron Bounties {calculateTimeLeft(cetusData.expiry)}
                  </Typography>
                  <List component="nav">
                    {Object.keys(cetusDataJobs).map(key => (
                      <div>
                        <ListItem>
                          <ListItemText
                            className="bountyText"
                            primary={cetusDataJobs[key].type}
                            secondary={
                              <span>
                                <img
                                  src={replogo}
                                  alt="reputation"
                                  className="repLogo"
                                />
                                {rewardStanding(cetusDataJobs[key])} Standing
                              </span>
                            }
                          />
                          <div className="rewardPoolChips">
                            {cetusDataJobs[key].rewardPool.map(data => {
                              return (
                                <Chip
                                  className="rewardPoolChip"
                                  key={data.key}
                                  label={data}
                                  avatar={rewardPoolAvatar(data)}
                                />
                              );
                            })}
                          </div>
                        </ListItem>
                        {(() => {
                          counter += 1;
                          if (counter === 6) {
                            return null;
                          } else {
                            return (
                              <div>
                                <Divider />
                              </div>
                            );
                          }
                        })()}
                      </div>
                    ))}
                  </List>
                </div>
              </Paper>
            </Grid>
            <Grid item lg={2} />
          </Grid>
        </div>

        {/* Navbar */}
        <div id="footer">
          <AppBar position="static" className="App-Footer">
            <Toolbar>
              <Typography variant="subheading" color="inherit">
                Built with{" "}
                <a
                  href="https://reactjs.org/"
                  title="React JS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={reactlogo} alt="react" className="favIcon" />
                </a>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
export default App;

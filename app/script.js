import React from "react";
import { render } from "react-dom";
// import AppDescription from './components/AppDescription';
// const AppDescription  = require('./components/AppDescription');

// TODO: fix problem with jsx ins external AppDescription component,
// probably babel configuration
// probably that is why import is also not working, only require
const AppDescription = () => {
  return (
    <div>
      <p>
        According to optometrists in order to save your eyes, you should follow
        the 20/20/20. It means you should to rest your eyes every 20 minutes for
        20 seconds by looking more than 20 feet away.
      </p>
      <p>
        This app will help you track your time and inform you when it's time to
        rest.
      </p>
    </div>
  );
};

class App extends React.Component {
  state = {
    status: "off", // off, work, rest
    time: 0, // seconds
    timer: null, // 1s interval
  };

  formatTime = (secondsLeft) => {
    const secs = Math.floor(secondsLeft % 60);
    const mins = Math.floor((secondsLeft / 60) % 60);
    const final = [mins, secs].map((el) => `${el + 100}`.substring(1));
    return final.join(":");
  };

  step = () => {
    this.setState({
      time: this.state.time - 1,
    });
    if (this.state.time === 0 && this.state.status === "work") {
      this.setState({
        status: "rest",
        time: 20,
      });
    } else if (this.state.time === 0 && this.state.status === "rest") {
      this.setState({
        status: "work",
        time: 1200,
      });
    }
  };

  startTimer = () => {
    this.setState({
      status: "work",
      timer: setInterval(this.step, 1000),
      time: 1200, //1200
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: "off",
      time: 0,
    });
  };

  closeApp = () => {
    window.close();
  }

  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>

        {/* description */}
        {status === "off" && <AppDescription />}

        {/* images */}
        {status === "work" && <img src="./images/work.png" />}
        {status === "rest" && <img src="./images/rest.png" />}

        {/* timer */}
        {status !== "off" && (
          <div className="timer">{this.formatTime(time)}</div>
        )}

        {/* navigation */}
        {status === "off" && (
          <button onClick={() => this.startTimer()} className="btn">
            Start
          </button>
        )}
        {status !== "off" && (
          <button onClick={() => this.stopTimer()} className="btn">
            Stop
          </button>
        )}

        <button onClick={() => this.closeApp()} className="btn btn-close">
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector("#app"));

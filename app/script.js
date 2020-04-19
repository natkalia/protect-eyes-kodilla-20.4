import React from 'react';
import { render } from 'react-dom';
// import AppDescription from './components/AppDescription';
// const AppDescription  = require('./components/AppDescription');

// TODO: fix problem with jsx ins external AppDescription component, 
// probably babel configuration
// probably that is why import is also not working, only require
const AppDescription = () => {
  return (
    <div>
      <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
      <p>This app will help you track your time and inform you when it's time to rest.</p>
    </div>
  );
};

class App extends React.Component {
  state = {
    status: 'off', // off, work, rest
    time: 100, // seconds
    timer: null, // 1s interval
  };

  render() {
    const {status} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        
        {/* description */}
        {status === 'off' && <AppDescription/>}

        {/* images */}
        {status === 'work' && <img src='./images/work.png' />}
        {status === 'rest' && <img src='./images/rest.png' />}

        {/* timer */}
        {status !== 'off' && <div className='timer'>18:23</div>}

        {/* navigation */}
        {status === 'off' && <button className='btn'>Start</button>}
        {status !== 'off' && <button className='btn'>Stop</button>}

        <button className='btn btn-close'>X</button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
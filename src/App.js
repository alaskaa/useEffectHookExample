import React, { useState, useEffect } from "react";
import TimerWrap from "./TimerWrap";
import StyledButton from "./StyledButton";

// Following useEffect section on https://www.robinwieruch.de/react-hooks/

/* useEffect() hook is used for interactions with the
Browser/DOM API or external APIs */

// false and 0 are just the initial states and implicit types of the state
const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0);

  /* Pass empty array as second argument so you onlz run the effect on
mount and unmount
 -- only when variable in array changes,
 effect will run during update cycle
 */
  useEffect(
    () => {
      let interval;

      if (isOn) {
        /* so timer doesn' rely on stale state, we use always
         latest state by using function for the update */
        interval = setInterval(() => setTimer(timer => timer + 1), 1000);
      }
      return () => clearInterval(interval);
    },
    [isOn] // could have also passed another argument here with timer instead of passing as function
  );

  const onReset = () => {
    setIsOn(false);
    setTimer(0);
  };

  return (
    <TimerWrap>
      <h1>useEffect() Hook Example</h1>
      <h2>Timer that uses the useEffect() and useState() hook</h2>
      Timer: {timer}
      {!isOn && (
        <StyledButton type="button" onClick={() => setIsOn(true)}>
          Start
        </StyledButton>
      )}
      {isOn && (
        <StyledButton isOn type="button" onClick={() => setIsOn(false)}>
          Stop
        </StyledButton>
      )}
      <StyledButton
        isReset
        type="button"
        disabled={timer === 0}
        onClick={onReset}
      >
        Reset
      </StyledButton>
    </TimerWrap>
  );
};

export default App;

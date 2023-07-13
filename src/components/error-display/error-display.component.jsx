import React from 'react';
import errorStyles from "./error-display.component.module.css";

const ErrorDisplay = ({message}) => {
  return <div className={errorStyles.error}>{message}</div>;
};

export default ErrorDisplay;

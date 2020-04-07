import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import 'babel-polyfill';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas'

import _ from 'lodash';
import './style.css';

import Test from './test';

ReactDOM.render(
  <Test />,
  document.getElementById('root'),
);

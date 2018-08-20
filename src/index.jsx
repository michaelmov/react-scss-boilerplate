import React from 'react';
import ReactDOM from 'react-dom';
import style from  './main.scss';
import webpackLogo from './assets/webpack-icon.png';


const Index = () => {
    return (
        <div className={style['page-wrapper']}>
            <img className={style.logo} src={webpackLogo} alt=""/>
            <h1 className={style.heading}>Hello React!</h1>
        </div>
    );
};

ReactDOM.render(<Index />, document.getElementById('index'));
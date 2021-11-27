import React from 'react'
import Loader1 from '../../assets/images/ios.png'
import Loading from '../../assets/images/loading.png'
import './loader.css'

const Loader = () => {
    return (
        <div className={'MainLoadingScreen'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '30%'}}>
                <div className={'ico-1'}/>
                <div className={'ico-2'}/>
                <div className={'ico-3'}/>
                <div className={'ico-4'}/>
            </div>
            <p className="loading-text">Loading...</p>
        </div>
    );
};

export default Loader;

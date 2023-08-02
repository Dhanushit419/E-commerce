import React from "react";

export default function Loading(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backdropFilter: 'blur(6px)', flexDirection: 'column' }}>
            <div style={{ flexGrow: "1", }}></div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column', rowGap: '20px', backgroundColor: 'whitesmoke', borderRadius: '30px', padding: "20px" }}>
                <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" style={{ height: '100px' }} alt="" />
                <p style={{ fontSize: '30px', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }} className="loading-text" >{props.text}</p>
            </div>
            <div style={{ flexGrow: "1", }}></div>
            <p style={{ marginTop: "auto", paddingBottom: "20px", fontSize: '35px', color: 'white', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>🛒TrenDify - "Where shopping meets convenience"✨</p>
        </div>
    )
}
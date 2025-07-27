// import React from "react";

// const Loading = () => {
//   return (
//     <div className="loading-container">
//       <div className="lds-ripple">
//         <div></div>
//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default Loading;

import React from 'react';
import loadingGif from '../images/loading.gif';


const Loading = () => {
    return (
      <div style={styles.container}>
        <img src={loadingGif} alt="Loading" style={styles.gif} />
        <p>Loading...</p>
      </div>
    );
  };
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    gif: {
      width: '240px', // Adjust the width as needed
      height: '200px', // Adjust the height as needed
    },
  };
  
  export default Loading;

// const Loading = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.spinner}></div>
//       <p>Loading...</p>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   spinner: {
//     borderTop: '5px solid rgba(0, 0, 0, 0.1)',
//     borderRight: '5px solid rgba(0, 0, 0, 0.1)',
//     borderBottom: '5px solid rgba(0, 0, 0, 0.1)',
//     borderLeft: '5px solid #000',
//     borderRadius: '50%',
//     width: '50px',
//     height: '50px',
//     animation: 'spin 1s linear infinite',
//   },
//   '@keyframes spin': {
//     '0%': {
//       transform: 'rotate(0deg)',
//     },
//     '100%': {
//       transform: 'rotate(360deg)',
//     },
//   },
// };

// export default Loading;

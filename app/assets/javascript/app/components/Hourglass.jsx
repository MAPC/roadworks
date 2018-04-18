import React from 'react';

class Hourglass extends React.Component {

  render() {
    const icon = (() => {
      const classes = {
        one: {
          fill: this.props.color,
        },
        two: {
          fill: "#fff",
          stroke: "#000",
          strokeMiterlimit: 10,
        },
        three: {
          clipPath: 'url(#clip-path)',
        },
        four: {
          fill: 'none',
          stroke: "#fff",
          strokeWidth: '3px',
        },
        five: {
          fill: 'none',
          stroke: '#818184',
          strokeWidth: '1px',
        },
        six: {
          clipPath: "url(#clip-path-2)",
        },
        seven: {
          clipPath: "url(#clip-path-3)",
        }
      };

      switch (this.props.type) {
        case 'empty':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="2313.5 280.5 15.497 23">
              <defs>
                <clipPath id="clip-path">
                  <path id="Path_26" data-name="Path 26" style={classes.one} d="M14.027,24.641H1.5V5.5H14.086Z" transform="translate(-1.5 -5.5)" />
                </clipPath>
              </defs>
              <g id="empty-glass" transform="translate(2313.5 280.5)">
                <g id="Map_Road" data-name="Map Road" transform="translate(1.5 1.5)">
                  <path id="Path_24" data-name="Path 24" style={classes.two} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)" />
                  <g id="Group_4" data-name="Group 4" style={classes.three} transform="translate(12.586 20) rotate(180)">
                    <path id="Path_25" data-name="Path 25" style={classes.one} d="M6.5,12.735c-1.413-1.95-5-2.846-5-11.235H14c0,8.389-4.64,8.422-4.64,11.235S7.91,14.684,6.5,12.735Z" transform="translate(-1.5 -4.829)" />
                  </g>
                  <path id="Path_27" data-name="Path 27" style={classes.four} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)" />
                  <path id="Path_30" data-name="Path 30" style={classes.five} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)" />
                </g>
              </g>
            </svg>
          );

        case 'half':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="1942.5 331.5 15.497 23">
              <defs>
                <clipPath id="clip-path">
                  <path id="Path_26" data-name="Path 26" style={classes.one} d="M14.027,21.233H1.5V5.5H14.086Z" transform="translate(-1.5 -5.5)"/>
                </clipPath>
                <clipPath id="clip-path-2">
                  <path id="Path_43" data-name="Path 43" style={classes.one} d="M8.21,24.125H1.5V5.5H8.241Z" transform="translate(-1.5 -5.5)"/>
                </clipPath>
                <clipPath id="clip-path-3">
                  <path id="Path_45" data-name="Path 45" style={classes.one} d="M8.764,14.623H1.5V5.5H8.8Z" transform="translate(-1.5 -5.5)"/>
                </clipPath>
              </defs>
              <g id="half-glass" transform="translate(1942.5 331.5)">
                <g id="Map_Road" data-name="Map Road" transform="translate(1.5 1.5)">
                  <path id="Path_24" data-name="Path 24" style={classes.two} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)"/>
                  <g id="Group_4" data-name="Group 4" style={classes.three} transform="translate(0 4.267)">
                    <path id="Path_25" data-name="Path 25" style={classes.one} d="M6.5,9.239C5.085,7.9,1.5,7.279,1.5,1.5H14c0,5.779-4.64,5.8-4.64,7.739S7.91,10.582,6.5,9.239Z" transform="translate(-1.5 -4.236)"/>
                  </g>
                  <g id="Group_10" data-name="Group 10" style={classes.six} transform="translate(9.741 19.538) rotate(180)">
                    <path id="Path_42" data-name="Path 42" style={classes.one} d="M1.765,11.333C1.69,9.627,1.5,8.842,1.5,1.5h.662c0,7.342-.246,7.371-.246,9.833S1.84,13.04,1.765,11.333Z" transform="translate(1.571 -3.726)"/>
                  </g>
                  <path id="Path_27" data-name="Path 27" style={classes.four} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)"/>
                  <path id="Path_30" data-name="Path 30" style={classes.five} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)"/>
                  <g id="Group_11" data-name="Group 11" style={classes.seven} transform="matrix(-1, 0.017, -0.017, -1, 9.963, 19.326)">
                    <path id="Path_44" data-name="Path 44" style={classes.one} d="M4.4,5.988C3.579,5.209,1.5,4.851,1.5,1.5H8.747c0,3.351-2.69,3.364-2.69,4.488S5.217,6.766,4.4,5.988Z" transform="translate(-1.5 -3.087)"/>
                  </g>
                </g>
              </g>
            </svg>
          );

        case 'full':
        default:
          return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="2043.5 377.5 15.497 23">
              <defs>
                <clipPath id="clip-path">
                  <path id="Path_26" data-name="Path 26" style={classes.one} d="M14.027,24.641H1.5V5.5H14.086Z" transform="translate(-1.5 -5.5)"/>
                </clipPath>
              </defs>
              <g id="full-glass" transform="translate(2043.5 377.5)">
                <g id="Map_Road" data-name="Map Road" transform="translate(1.5 1.5)">
                  <path id="Path_24" data-name="Path 24" style={classes.two} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)"/>
                  <g id="Group_4" data-name="Group 4" style={classes.three} transform="translate(0 0.859)">
                    <path id="Path_25" data-name="Path 25" style={classes.one} d="M6.5,12.735c-1.413-1.95-5-2.846-5-11.235H14c0,8.389-4.64,8.422-4.64,11.235S7.91,14.684,6.5,12.735Z" transform="translate(-1.5 -4.829)"/>
                  </g>
                  <path id="Path_27" data-name="Path 27" style={classes.four} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)"/>
                  <path id="Path_30" data-name="Path 30" style={classes.five} d="M1.5,21.5c0-7.519,5-7.5,5-10s-5-2.533-5-10H14c0,7.467-5,7.5-5,10s5.034,2.481,5,10Z" transform="translate(-1.5 -1.5)"/>
                </g>
              </g>
            </svg>
          );
      }
    })();

    return (<span className={`component Hourglass ${this.props.type}`}>{icon}</span>);
  }

}

export default Hourglass;

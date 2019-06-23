import React, {Component} from 'react'

class Loader extends Component {


    render() {
        return (
            <div className="loader-pages">

                <svg>
                    <g>
                        <path d="M 50,100 A 1,1 0 0 1 50,0"/>
                    </g>
                    <g>
                        <path d="M 50,75 A 1,1 0 0 0 50,-25"/>
                    </g>
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" className="first-stop"/>
                            <stop offset="100%" className="second-stop"/>
                        </linearGradient>
                    </defs>
                </svg>

            </div>
        )
    }

}

export default Loader
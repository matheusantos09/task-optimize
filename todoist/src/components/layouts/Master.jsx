import React, {Component} from "react"
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import PerfectScrollbar from "perfect-scrollbar";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'

// const MasterLayout = (props) => (
//     <div className="App">
//         <CssBaseline/>
//
//         {/*<Header/>*/}
//         <Sidebar
//             routes={['teste', 'teste', 'teste', 'teste']}
//             logoText={'TodoIst'}
//             logo={''}
//             image={''}
//             handleDrawerToggle={false}
//             open={false}
//             color={'blue'}
//         />
//
//         <Container>
//             {props.children}
//         </Container>
//
//         <Footer/>
//
//     </div>
// )
//
// export default MasterLayout

class MasterLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            color: "blue",
            hasImage: true,
            fixedClasses: "dropdown show",
            mobileOpen: false
        };
    }

    handleImageClick = image => {
        this.setState({image: image});
    };
    handleColorClick = color => {
        this.setState({color: color});
    };
    handleFixedClick = () => {
        if (this.state.fixedClasses === "dropdown") {
            this.setState({fixedClasses: "dropdown show"});
        } else {
            this.setState({fixedClasses: "dropdown"});
        }
    };
    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    getRoute() {
        return this.props.location.pathname !== "/admin/maps";
    }

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({mobileOpen: false});
        }
    };

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({mobileOpen: false});
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        return (
            <div className="App">
                <CssBaseline/>

                {/*<Header/>*/}
                <Sidebar
                    routes={['teste', 'teste', 'teste', 'teste']}
                    logoText={'TodoIst'}
                    logo={''}
                    image={''}
                    handleDrawerToggle={false}
                    open={false}
                    color={'blue'}
                />

                <Container>
                    {props.children}
                </Container>

                <Footer/>

            </div>
        )
    }
}

export default MasterLayout
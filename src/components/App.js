import React, {Component} from 'react';
import hash from "../lib/hash";
import Login from "./Login/Login";
import Search from "./Search/Search";
import Header from "./Header/Header";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        };
    }

    componentDidMount() {
        // Set token
        let _token = hash.access_token;
        if (_token && typeof _token !== 'undefined') {
            // Set token
            this.setState({
                token: _token
            });
        }
    }

    render() {
        let isLoguedIn = this.state.token;
        return (
            <div className="App">
                <Header></Header>
                {!isLoguedIn ? (
                    <Login></Login>
                ) : (
                    <Search token={this.state.token}></Search>
                )}
            </div>
        );
    }
}

export default App;
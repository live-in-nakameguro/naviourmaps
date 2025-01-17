import React from 'react';
import Header from '../common/Header';
import "../../App.css";
import Map from './maps/Map';
import BackButtons from './maps/BackButtons';
import MyNavigation from './maps/MyNavigation';
import OtherNavigation from './maps/OtherNavigation';
import NavigationSaveButton from './maps/NavigationSaveButton';

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            start_address: {          
                address: "",  
                lat: null,
                lng: null
            },
            goal_address: {   
                address: "",           
                lat: null,
                lng: null
            },
            route_exist: false
        }
        this.reloadRef = React.createRef();
    }

    setStartAddress = (start_address) => {
        this.setState({start_address: start_address});
    }

    setGoalAddress = (goal_address) => {
        this.setState({goal_address: goal_address});
    }
    
    setRouteExist = (route_exist) => {
        this.setState({route_exist: route_exist});
    }

    reloadMyNavigation() {
        // MyNavigatioonのメソッドを親から叩くための設定
        this.reloadRef.current.reload(); // this.ref名.currentで実体にアクセス
    }

    render() {
            return (
                <div>
                    <Header 
                        App_SetIsLogin = {this.props.App_SetIsLogin}
                    />
                    <Map
                        StartAddress = {this.state.start_address}
                        GoalAddress = {this.state.goal_address}
                        setStartAddress = {this.setStartAddress.bind(this)}
                        setGoalAddress = {this.setGoalAddress.bind(this)}
                        RouteExist = {this.state.route_exist}
                        setRouteExist = {this.setRouteExist.bind(this)}
                    />
                    <NavigationSaveButton
                        App_UserId = {this.props.App_UserId}
                        // NavigationName = {this.state.start_address["address"].slice(0, 20)}
                        StartAddress = {this.state.start_address}
                        GoalAddress = {this.state.goal_address}
                        setStartAddress = {this.setStartAddress.bind(this)}
                        setGoalAddress = {this.setGoalAddress.bind(this)}
                        reloadMyNavigation = {this.reloadMyNavigation.bind(this)}
                    />
                    <BackButtons
                        StartAddress = {this.state.start_address}
                        GoalAddress = {this.state.goal_address}
                        setStartAddress = {this.setStartAddress.bind(this)}
                        setGoalAddress = {this.setGoalAddress.bind(this)}
                    />
                    {/* /ToDo App_UserId の渡し方とかも相談。stateで管理？ */}
                    自分のルート(仮)
                    <MyNavigation
                        ref = {this.reloadRef}
                        App_UserId = {this.props.App_UserId}
                        setStartAddress = {this.setStartAddress.bind(this)}
                        setGoalAddress = {this.setGoalAddress.bind(this)}
                        setRouteExist = {this.setRouteExist.bind(this)}
                        Map = {this.state.map}
                    />
                    他人のルート(仮)
                    <OtherNavigation
                        App_UserId = {this.props.App_UserId}
                        setStartAddress = {this.setStartAddress.bind(this)}
                        setGoalAddress = {this.setGoalAddress.bind(this)}
                        setRouteExist = {this.setRouteExist.bind(this)}
                        Map = {this.state.map}
                    />
                </div>
            );
        }
    }

export default Home;
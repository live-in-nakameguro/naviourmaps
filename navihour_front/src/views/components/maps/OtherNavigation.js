import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import StarRateIcon from '@material-ui/icons/StarRate';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { postApi } from '../../../utils/Api';
import LoadingPage from '../../../utils/LoadingPage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import "../../../App.css";

// ToDo
// AddressをNavigationに直す。関数を作って貰ったら修正する。

class OtherNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.App_UserId,
            otherNavigationList: [],
            is_loding: true,
        }
    }

    createData = (navigation_id, is_favorite, navigation, navigation_created_time, is_private, is_edit_open) => {
        return { navigation_id, is_favorite, navigation, navigation_created_time, is_private, is_edit_open };
    }
    changeIsLoading = () => {
        this.setState({ is_loding: !this.state.is_loding });
    };

    setNavigationList = (navigation_id, setKey, setValue) => {
        const otherNavigationList = this.state.otherNavigationList.slice();

        otherNavigationList.map((navigatiData) => {
            if (navigatiData.navigation_id === navigation_id){
                navigatiData[setKey] = setValue;
            }
        });
        this.setState({ otherNavigationList: otherNavigationList });
    }

    getOtherNavigation = () => {
        const json = {
            // user_id: this.props.App_UserId,
            user_id: this.state.user_id
        };
        postApi("get_all_address", json)
        .then((return_json) => {
            const return_my_navigation = [];
            return_json["all_address_list"].map((row)=>{
                const data = this.createData(row.address_id, row.is_favorite, row.address_name, row.address_created_time, row.is_private, false);
                // const data = this.createData(row.navigation_id, row.is_favorite, row.navigation, row.navigation_created_time, row.is_private, row.is_edit_open, false);
                return_my_navigation.push(data);
            })
            this.setState({ otherNavigationList: return_my_navigation });
            this.changeIsLoading();
        });
    }

    changeFavorite = (row) => {
        this.changeIsLoading();
        const send_json = { address_id: row.navigation_id, is_favorite: !row.is_favorite };
        // const send_json = { navigation_id: row.navigation_id, is_favorite: !row.is_favorite };
        postApi("favorite_address", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.setNavigationList(row.navigation_id, "is_favorite", !row.is_favorite);
                // this.setNavigationList(row.navigation_id, "is_favorite", !row.is_favorite);
            }else{
                // ToDo
            }
            this.changeIsLoading();
        });
    }

    changePrivate = (row) => {
        this.changeIsLoading();
        const send_json = { address_id: row.navigation_id, is_private: !row.is_private };
        // const send_json = { navigation_id: row.navigation_id, is_private: !row.is_private };
        postApi("private_address", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                // this.setNavigationList(row.address_id, "is_private", !row.is_private);
                this.setNavigationList(row.navigation_id, "is_private", !row.is_private);
            }else{
                // ToDo
            }
            this.changeIsLoading();
        });
    }

    deleteNavigation = (row) => {
        this.changeIsLoading();
        const send_json = { navigation_id: row.navigation_id };
        postApi("delete_address", send_json)
        .then((return_json) => {
            if(return_json["result"] === "OK"){
                this.getOtherNavigation();
            }else{
                // ToDo
                this.changeIsLoading();
            }
        });
    }

    chanegeIsEditOpen = (row) => {
        this.setNavigationList(row.address_id, "is_edit_open", !row.is_edit_open);
        if(!row.is_edit_open){
            this.reload();
        }
    }

    reload = () => {
        this.changeIsLoading();
        this.getOtherNavigation();
    }

    componentDidMount(){
        this.getOtherNavigation();
    }

    render() {
        return (
        <div className="navigation-table">
            {this.state.is_loding ? <LoadingPage /> : ""}
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Favorite☆</TableCell>
                            <TableCell align="right">Route</TableCell>
                            <TableCell align="right">Privete</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.otherNavigationList.map((row) => (
                            <TableRow 
                                hover
                            >
                                <TableCell><Button onClick={() => { this.changeFavorite(row) }}>{row.is_favorite ? <StarRateIcon style={{ color: "#004d40" }} /> : <StarBorderIcon />}</Button></TableCell>
                                <TableCell align="right">{row.navigation}</TableCell>
                                <TableCell align="right"><Button onClick={() => { this.changePrivate(row) }}>{row.is_private ? <LockIcon /> : <LockOpenIcon />}</Button></TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => { this.chanegeIsEditOpen(row) }}>
                                        <EditIcon style={{ color: "#004d40" }}/>
                                    </Button>
                                    {/* {row.is_edit_open ? <EditNavigatin chanegeIsEditOpen={() => { this.chanegeIsEditOpen(row) }} row={row}/>: ""} */}
                                </TableCell>
                                <TableCell align="right"><Button onClick={() => { this.deleteNavigation(row) }} className="delete-button"><DeleteForeverIcon/></Button></TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </ div>
        );
    }
}

export default OtherNavigation;

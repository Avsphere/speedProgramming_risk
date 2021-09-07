import React from "react";
import Container from "@material-ui/core/Container"
import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import { withStyles } from '@material-ui/core/styles';


const SomeListItem = (props) => <li>{props.value}</li>

const TestList = ({ items }) => {
    const listItems = items.map( item => <SomeListItem key={item.id} value={item.value}/>)

    return (
        <ul>
            {listItems}
        </ul>
    );
}

const styles = {
    coolContainer : {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '0 30px',
    },
    largerInput : {
        fontSize : "100px"
    }
}


class Learning extends React.Component {

    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <main>
            <Container maxWidth="md" className={this.props.classes.coolContainer}>
            <TextField
                label="Type to create your design"
                margin="normal"
                InputLabelProps={{style: {fontSize: 30}}} // font size of input label
                inputProps={{style: {fontSize: 10}}} // font size of input text
            />
            </Container>
            </main>
        );
    }
    
}

export default withStyles(styles)(Learning)
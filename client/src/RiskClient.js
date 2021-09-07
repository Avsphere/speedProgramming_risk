import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const fetchRawImageMetaDatas = async () => {
    const imageMetaDataEndpoint = "/api/someRoute"
    const { data } = await axios.get(imageMetaDataEndpoint)
    return data;
}

const styles = theme => ({
    topPadding: {
        height: "300px",
    },
})

class RiskClient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket : null,
            gameStateTextElement : null
        }

        fetchRawImageMetaDatas();
    }

    componentDidMount() {
        const socket = io(`http://localhost:3000`);

        socket.on('update', ({ gameState }) => {
            this.setState({ gameState })
        })
    }



    render() {
        const { classes } = this.props;
        return (
           <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
        );
    }
}

export default withStyles(styles, { withTheme: true })(RiskClient)

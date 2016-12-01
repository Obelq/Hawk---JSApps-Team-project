import React, { Component } from 'react';
import Team from './Team';
import TeamModel from '../../../Models/TeamModel';

export default class CatalogPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            teams: []
        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    render () {
        return (
            <div>
                <h1>Catalog Page</h1>
                {
                    this.state.teams.map(function (team, index) {
                        return <Team key={index}
                                    name={team.name}
                                    description={team.description}
                                    teamId={team._id}
                                    teamCreator={team._acl.creator}
                                />
                    })
                }
            </div>
        );
    }

    onLoadSuccess (response) {
        this.setState({
            teams: response
        });
    }

    componentDidMount () {
        TeamModel.loadTeams(this.onLoadSuccess);
    }
}

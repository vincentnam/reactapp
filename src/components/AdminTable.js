import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";

export default class AdminTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = ({
                columns: [
                    {title: 'Id', field: 'id'},
                    {title: 'Description', field: 'description'},
                    {title: 'Car authorized', field: 'car_in'},
                    {title: 'Car refused', field: 'car_refused'},
                    {
                        title: 'Latitude',
                        field: 'lat',
                    },
                    {
                        title: 'Longitude',
                        field: 'long',
                    },
                ],

                data: (
                    [{
                        type: 'gates',
                        id: '1',
                        description : "Gate fictive : sert au test, " +
                            "\n, les descriptions longues sont envisageables et sont gérés par le tableau. " +
                            "Par contre pas de saut de ligne   TODO : " +
                            "initialisation du tableau avec les données de la BD",
                        lat: 43.56514404377234,
                        long:1.464778482913971,
                        car_auth: [],
                        car_refused: []
                    }]),
            }
        );
    }


    componentWillMount() {
                    fetch("http://localhost:5000/allgates")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: [JSON.parse(result).map(res => {
                return {type: 'gates', id:res["id"], description:res["description"],
                    lat:res["geoJson"]["coordinates"][1],
                    long:res["geoJson"]["coordinates"][0],
                car_auth:res["car_auth"],
                car_refused:res["car_refused"]}
            })]
          });
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    }

    render() {

            return (
                <MaterialTable
                    title="Gates management"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = this.state.data;
                                    data.push(newData);
                                    this.setState({...this.state, data});
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = this.state.data;
                                    data[data.indexOf(oldData)] = newData;
                                    this.setState({...this.state, data});
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = this.state.data;
                                    data.splice(data.indexOf(oldData), 1);
                                    this.setState({...this.state, data});
                                }, 600);
                            }),
                    }}
                    components={{
                        Action: props => (
                            <Button
                                onClick={(event) => props.action.onClick(event, props.data)}
                                color="primary"
                                variant="contained"
                                style={{textTransform: 'none'}}
                                size="small"
                            >
                                TO DO
                            </Button>
                        ),
                    }}
                />);


    }






}



/** TO DO : Button link to see a gate and informations (as state, car crossing history, management...) **/
import React from "react";
import {
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Card,
    TabContent,
    TabPane
} from "reactstrap";

class Technology extends React.Component {
    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink>
                            Technology
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent>
                    <TabPane>
                        <Card body>
                            <Input
                                type="select"
                                name="select"
                                id="technologySelect"
                                onChange={this.props.onTechnologyChange}>
                                <option value={"Any"}>Any</option>
                                {this
                                    .props
                                    .techList
                                    .map((tech, i) => {
                                        return <option key={i} value={tech}>{tech}</option>
                                    })}
                            </Input>
                        </Card>
                    </TabPane>
                </TabContent>

                {/* <Label for="exampleSelect">Technology</Label>
                <Input
                    type="select"
                    name="select"
                    id="technologySelect"
                    onChange={this.props.onTechnologyChange}>
                    <option value={"Any"}>Any</option>
                    {this
                        .props
                        .techList
                        .map((tech, i) => {
                            return <option key={i} value={tech}>{tech}</option>
                        })}
                </Input> */}
            </div>
        );
    }
}

export default Technology;

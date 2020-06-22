import React, {useState, memo} from 'react';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Input,
    Row,
    Col,
    Card,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import classnames from 'classnames';
import VirtualScroll from "./VirtualScroll";

const Product = (props) => {
    const [activeTab,
        setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) 
            setActiveTab(tab);
        }
    
    const lgi = {
        height: "70px"
    };

    const Item = memo(({index}) => (
        <ListGroupItem
            key={index}
            style={lgi}
            onClick={() => props.onResult(props.filtered[index])}
            tag="button"
            action>
            {props.filtered[index].ref}
        </ListGroupItem>
    ));

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({
                        active: activeTab === '1'
                    })}
                        onClick={() => {
                        toggle('1');
                    }}>
                        Product
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                        active: activeTab === '2'
                    })}
                        onClick={() => {
                        toggle('2');
                    }}>
                        Buzzwords
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Card body>
                        <Input
                            type="search"
                            name="searchProduct"
                            className="input"
                            id="productInput"
                            onChange={props.onProductChange}
                            placeholder="Search by Product"/>
                    </Card>
                </TabPane>
                <TabPane tabId="2">
                    <Card body>
                        <Input
                            type="search"
                            name="searchBuzzwords"
                            className="input"
                            id="buzzwordsInput"
                            onChange={props.onBuzzwordsChange}
                            placeholder="Search by Buzzwords"/>
                    </Card>
                </TabPane>
            </TabContent>

            <ListGroup>
                <VirtualScroll
                    itemCount={props.filtered.length}
                    height={400}
                    childHeight={70}
                    Item={Item}/>
            </ListGroup>

        </div>
    );
}

export default Product;

import React, { useState, useEffect } from "react";
import { Heading } from "../styled/Heading";
import { Page } from "../styled/Page";
import { Button } from "../styled/Button";

import {intent_action} from "../core/Redux/Intents/actions/Intents.actions";
import { connect } from 'react-redux'
import styled from "styled-components";
import {rem} from "polished";
import {Card} from "../styled/Card";
import { colors } from "../theme/colors";

import ChatBubble from 'react-chat-bubble';
import robot from '../assets/icons/robot.jpeg';
import human from '../assets/icons/human.png';


const Description = styled.div`
  margin: 0;
  padding: ${rem(8)};
`;


const DisplayCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  
  .CardWrapper {    
      background-color: ${colors.primary};
    }
`;

const DisplayRow = styled.div`
  display: flex;
  justify-content:space-between
   align-items: center;
`;


function HomePage({dispatch, data}) {
    const [ids, setIds] = useState(new Set());
    const [allSelected, setAllSelected] = useState(false);


    useEffect(() => {
        dispatch(intent_action());
    },[dispatch]);

    useEffect(() => {
        if(data) {
            console.log(data);
        }
    },[data]);

    function updateCard(cardData){
        const newSet = new Set(ids);
        if (newSet.has(cardData)) {
            newSet.delete(cardData);
            setIds(newSet);
        } else {
            newSet.add(cardData);
            setIds(newSet);
        }

        setAllSelected(newSet.size === data.length);
    }

   function toggleSelect() {
        if(allSelected) {
            setIds(new Set());
        } else {
            const newSet = new Set();
            data.map((row) => newSet.add(row.id));
            setIds(newSet);
        }
        setAllSelected(!allSelected);
   }

  return (
    <div>
        <Page>
            <Heading> Welcome to Ultimate AI bot settings</Heading>
            <Description>Here you can select automatic responses that your bot can give for common user behavior</Description>
            <Description>Just click on card to select the behaviors for which you want to automate a response.</Description>
            <Heading>User behavior Categories</Heading>
            <Button type='PrimaryHollow' onClick={() => toggleSelect()}> {allSelected ? 'UnSelect All' : 'Select All'}</Button>
            <DisplayCard>
                {data &&
                data.map((row, index) => (
                    <div key={"intent_" + row.id }
                         className={ids.has(row.id) ? "CardWrapper" : ""}
                         onClick={() => updateCard(row.id)}>
                        <Card>
                            <DisplayRow>
                                <Heading>{row.name}</Heading>
                            </DisplayRow>
                            <Description>{row.description}</Description>
                            <Description>Example: {"'" +row.trainingData.expressions[0].text + "', "} {"'" +row.trainingData.expressions[1].text + "', "} {"'" +row.trainingData.expressions[2].text + "', "} </Description>
                            <ChatBubble messages = {[{
                                "type" : 0,
                                "image": human,
                                "text": row.trainingData.expressions[0].text
                            }, {
                                "type": 1,
                                "image": robot,
                                "text": row.reply.text
                            }]} onNewMessage={(x)=>console.log(x)} />
                        </Card>
                    </div>
                ))}

            </DisplayCard>
        </Page>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
    return {
    ...ownProps,
    data: state.intentsReducer.data
    }
};

export default connect(mapStateToProps)(HomePage);

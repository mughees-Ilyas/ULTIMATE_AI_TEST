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
import robot from '../assets/icons/robot.svg';
import bar from '../assets/icons/bar.jpeg';



const Description = styled.div`
  margin: 0;
  padding: ${rem(8)};
`;

const CardHeaderWrapper = styled.div`
    border-bottom: 1px solid #b5aeae;
`;

const CardHeader = styled.div`
    padding: ${rem(16)};
    text-align: left;
    font: normal normal normal 16px/22px Open Sans;
    letter-spacing: 0px;
    display: flex;
`;

const DisplayCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  
`;

const DisplayRow = styled.div`
  display: flex;
  justify-content:space-between
   align-items: center;
`;
const Header = styled.div`
  height: ${rem(320)};
  background: ${colors.background} 0% 0% no-repeat padding-box
   padding-top: ${rem(16)};
    padding-bottom: ${rem(32)};
`;

const CardBody = styled.div`
    padding: ${rem(16)};
`;


const HeaderItems = styled.div`
  padding-top: ${rem(16)};
  max-width: ${rem(1300)};
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;


const Image = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  margin-right: ${rem(32)}; 
  justify-content: center;
  align-items: center;
  background: ${colors.base} 0% 0% no-repeat padding-box
`;

const InputWrapper = styled.div`
  padding-right: ${rem(8)};
`;


function HomePage({dispatch, data}) {
    // state for storing selected ids of cards
    const [ids, setIds] = useState(new Set());
    // if all the intends are selected set this state to true.
    const [allSelected, setAllSelected] = useState(false);

    // dispatch on init to get the data.
    useEffect(() => {
        dispatch(intent_action());
    },[dispatch]);

    // run side effects when data is fetched. right now we are not doing anything with data so we can remove this useEffect but keeping it for showcase
    // as how to handle side effects on component
    useEffect(() => {
        if(data) {
            console.log(data);
        }
    },[data]);

    /*
    * function execute on click on card.
    * cardData {integer}: id of intent,
    */
    function updateCard(cardData){

        //if id is already present remove it else add it,
        const newSet = new Set(ids);
        if (newSet.has(cardData)) {
            newSet.delete(cardData);
            setIds(newSet);
        } else {
            newSet.add(cardData);
            setIds(newSet);
        }

        // check if we have selected everything by selecting this card. set the state accordingly
        setAllSelected(newSet.size === data.length);
    }

    /*
    * function execute on select/deSelect button click
    * it will switch between selecting everything or deselecting everything
    */
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

    /*
     * function to reset the selections
     */
    function reset() {
        setIds(new Set());
        setAllSelected(false);
    }

  return (
    <div>
        <Page>
            <PageHeader/>

            <DisplayRow>
                <Heading>Possible conversations: {ids.size} selected</Heading>
                <div>
                    <Button type='PrimaryHollow' onClick={() => toggleSelect()}> {allSelected ? 'Deselect All' : 'Select All'}</Button>
                    <Button type='PrimaryHollow' onClick={() => reset()}> reset</Button>
                </div>
            </DisplayRow>


            <DisplayCard>
                {data &&
                data.map((row) => (
                    <div key={"intent_" + row.id }
                         onClick={() => updateCard(row.id)}>
                        <Card selected={ids.has(row.id)}>

                            <CardHeaderWrapper>
                                <CardHeader>
                                    <InputWrapper>
                                        <input type="checkbox" checked={ids.has(row.id)} onChange={() => updateCard(row.id)}/>
                                    </InputWrapper>
                                {row.name}
                                </CardHeader>
                            </CardHeaderWrapper>

                            <CardBody>
                                <ChatBubble messages = {[{
                                    "type": 1,
                                    "image": robot,
                                    "text": row.reply.text
                                }]} onNewMessage={(x)=>console.log(x)} />
                                <Description> In response to: {"'" +row.trainingData.expressions[0].text + "', "} {"'" +row.trainingData.expressions[1].text + "', "} {"'" +row.trainingData.expressions[2].text + "'"} </Description>
                            </CardBody>
                        </Card>
                    </div>
                ))}

            </DisplayCard>
        </Page>
    </div>
  );
}

// a subComponent to keep the header HTML separate
function PageHeader() {
    return (
        <Header>
            <HeaderItems>
                <img src={bar} alt="bar" width="1300" height="100" />
            </HeaderItems>
            <HeaderItems>
                <Image>
                    <img src={robot} alt="rboto" width="100" height="100" />
                </Image>
                <div>
                    <Heading> Welcome to Ultimate AI bot settings</Heading>
                    <Description>Set your automatic responses for generic conversations people have with our bot, such as "Hi, Hello" or "Good bye". Choose all the conversations relevant to you, and select "Next".</Description>
                    <Button> Next </Button>
                </div>
            </HeaderItems>
        </Header>
    )
}

// function to connect my higher states to props
const mapStateToProps = (state, ownProps) => {
    return {
    ...ownProps,
    data: state.intentsReducer.data
    }
};

export default connect(mapStateToProps)(HomePage);

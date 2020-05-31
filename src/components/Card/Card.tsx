import React, { FC } from "react";
import styled from "styled-components";
import { Row } from "antd";
import { Draggable } from "react-beautiful-dnd";
import cancelIcon from "../../assets/Icons/cancel.svg";
import { Reward } from "../../models/Reward";

interface SimpleCardProps {
  isDragging?: boolean
}

const SimpleCard = styled.div<SimpleCardProps>`
  margin: 5px;
  border: 2px solid black;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  border-radius: 5px;
`;

interface CardProps {
  index: number;
  reward: Reward;
  removeReward(id: string): void;
}

export const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <Draggable draggableId={props.reward.id} index={props.index}>
      {(provided, snapshot) => (
        <SimpleCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.reward.destination === "category" && (
            <Row justify="end">
              <img
                alt="Cancel"
                src={cancelIcon}
                style={{ padding: "5px" }}
                onClick={() => props.removeReward(props.reward.id)}
              />
            </Row>
          )}
          <Row justify="center">
            <h3
              style={{
                paddingTop:
                  props.reward.destination === "category" ? "0px" : "20px",
                paddingBottom: "20px",
                paddingLeft: "20px",
                paddingRight: "20px"
              }}
            >
              {props.reward.name}
            </h3>
          </Row>
        </SimpleCard>
      )}
    </Draggable>
  );
};

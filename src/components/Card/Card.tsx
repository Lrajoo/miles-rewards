import React, { FC } from "react";
import styled from "styled-components";
import { Row } from "antd";
import { Draggable } from "react-beautiful-dnd";
import cancelIcon from "../../assets/Icons/cancel.svg";

const SimpleCard = styled.div`
  margin: 8px;
  border: 2px solid black;
  background-color: white;
  border-radius: 5px;
`

interface CardProps {
  id: string
  content: string
  index: number
  removeReward(id: string): void
}

export const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <SimpleCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Row justify="end">
            <img
              alt="Cancel"
              src={cancelIcon}
              style={{ padding: "5px" }}
              onClick={() => props.removeReward(props.id)}
            />
          </Row>
          <Row justify="center">
            <h3 style={{ padding: "10px 20px" }}>{props.content}</h3>
          </Row>
        </SimpleCard>
      )}
    </Draggable>
  )
}

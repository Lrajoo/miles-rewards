import React, { FC } from "react";
import styled from "styled-components";
import { Row } from "antd";
import { Reward } from "../../models/Reward";
import { Card } from "../Card/Card";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 10px;
`;

const RewardList = styled.div`
  padding: 10px;
  width: 10vw;
  height: 80vh;
  background-color: lightgray;
`;

interface ColumnProps {
  id: string;
  title?: string;
  rewards: Reward[];
  removeReward(id: string): void;
}

export const Column: FC<ColumnProps> = (props: ColumnProps) => {
  return (
    <Container>
      {props.title && <h1 style={{ textAlign: "center" }}>{props.title}</h1>}
      <Droppable droppableId={props.id}>
        {(provided, snapshot) => (
          <RewardList {...provided.droppableProps} ref={provided.innerRef}>
            {props.rewards.map((reward, index) => (
              <Row justify="center" align="middle" key={reward.id}>
                <Card
                  key={reward.id}
                  reward={reward}
                  index={index}
                  removeReward={props.removeReward}
                />
              </Row>
            ))}
            {provided.placeholder}
          </RewardList>
        )}
      </Droppable>
    </Container>
  );
};

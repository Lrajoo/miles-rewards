import React, { Component } from "react";
import { Row, Col, Layout } from "antd";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Reward } from "../../models/Reward";
import { Category } from "../../models/Category";
import { RewardsList } from "../../constants/rewardsList";
import { CategoriesList } from "../../constants/catergoriesList";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../Column/Column";
import { v4 as uuidv4 } from "uuid";

const { Content } = Layout;

class RewardsVM {
  @observable rewardList: Reward[] = []
  @observable categoryList: Category[] = []

  onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const addingReward: boolean =
      source.droppableId === "rewards" &&
      ["c1", "c2", "c3", "c4", "c5"].includes(destination.droppableId) 

    const rewardExists = this.categoryList
      .filter(category => category.id === destination.droppableId)
      .includes(draggableId)

    if (addingReward && !rewardExists) {
      this.categoryList.forEach(category => {
        if (category.id === destination.droppableId) {
          category.rewards.push(
            new Reward(uuidv4(), draggableId.toUpperCase())
          )
        }
      })
      return;
    }

    if (!addingReward && !rewardExists) {
      this.categoryList.forEach(category => {
        if (category.id === source.droppableId) {
          const i = category.rewards.indexOf(category);
          category.rewards.splice(i, 1);
        }
        if (category.id === destination.droppableId) {
          category.rewards.push(
            new Reward(draggableId, draggableId.toUpperCase())
          )
        }
      })
    }
  }

  removeReward = (id: string) => {
    this.categoryList.forEach(category => {
        if(category.id === id){
            console.log(category.rewards.indexOf(category))
            category.rewards.splice(category.rewards.indexOf(category), 1)
        }
    })
  }
}

@observer
export default class Rewards extends Component {
  vm = new RewardsVM();

  componentDidMount() {
    RewardsList.forEach(reward =>
      this.vm.rewardList.push(new Reward(reward.id, reward.name))
    );
    CategoriesList.forEach(category =>
      this.vm.categoryList.push(
        new Category(category.id, category.name, category.rewards)
      )
    )
  }

  render() {
    return (
      <Layout>
        <Content>
          <DragDropContext onDragEnd={this.vm.onDragEnd}>
            <Row justify="center" style={{ margin: "20px 0" }}>
              <Col xs={4}>
                <Row justify="center">
                  <h1>Rewards</h1>
                </Row>
              </Col>
              <Col xs={20}>
                <Row justify="center">
                  <h1>Categories</h1>
                </Row>
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={4}>
                <Row justify="center" style={{ marginTop: "40px" }}>
                  <Column rewards={this.vm.rewardList} id="rewards" removeReward={this.vm.removeReward}/>
                </Row>
              </Col>
              <Col xs={20}>
                <Row justify="center" style={{ height: "100%" }}>
                  {this.vm.categoryList.map(category => {
                    return (
                      <Col span={4} key={category.id}>
                        <Row justify="center">
                          <Column
                            rewards={category.rewards}
                            id={category.id}
                            title={category.name}
                            removeReward={this.vm.removeReward}
                          />
                        </Row>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </DragDropContext>
        </Content>
      </Layout>
    )
  }
}

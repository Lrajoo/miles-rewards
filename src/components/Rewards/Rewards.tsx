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
  @observable rewardList: Reward[] = [];
  @observable categoryList: Category[] = [];

  onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    if (!destination) {
      console.log("dropping outside");
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("same spot");
      return;
    }

    const addingReward: boolean =
      source.droppableId === "rewards" &&
      ["c1", "c2", "c3", "c4", "c5"].includes(destination.droppableId);

    const currCategory = this.categoryList.find(
      category => category.id === destination.droppableId
    );
    const rewardExists = currCategory
      ? currCategory.rewards
          .map(reward => reward.id.slice(0, 2))
          .includes(draggableId.slice(0, 2))
      : false;

    console.log("addingReward", addingReward);
    console.log("rewardExists", rewardExists);

    if (addingReward && !rewardExists) {
      this.categoryList.forEach(category => {
        if (category.id === destination.droppableId) {
          const id = draggableId.slice(0, 2);
          category.rewards.push(new Reward(`${id}${uuidv4()}`, id, "category"));
        }
      });
      return;
    }

    if (!addingReward && !rewardExists) {
      this.categoryList.forEach(category => {
        if (category.id === source.droppableId) {
          const reward = category.rewards.find(
            reward => reward.id === draggableId
          );
          if (reward) {
            const i = category.rewards.indexOf(reward);
            category.rewards.splice(i, 1);
          }
        }
        if (category.id === destination.droppableId) {
          category.rewards.push(
            new Reward(draggableId, draggableId.slice(0, 2), "category")
          );
        }
      });
    }
  };
  
  removeReward = (id: string) => {
    console.log("remove reward");
    this.categoryList.forEach(category => {
      category.rewards = category.rewards.filter(reward => reward.id !== id);
    });
  };
}

@observer
export default class Rewards extends Component {
  vm = new RewardsVM();

  componentDidMount() {
    RewardsList.forEach(reward =>
      this.vm.rewardList.push(new Reward(reward.id, reward.name, "reward"))
    );
    CategoriesList.forEach(category =>
      this.vm.categoryList.push(
        new Category(category.id, category.name, category.rewards)
      )
    );
  }

  render() {
    return (
      <Layout>
        <Content>
          <DragDropContext onDragEnd={this.vm.onDragEnd}>
            <Row justify="center">
              <Col xs={22} sm={24}>
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
                      <Column
                        rewards={this.vm.rewardList}
                        id="rewards"
                        removeReward={this.vm.removeReward}
                      />
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
              </Col>
            </Row>
          </DragDropContext>
        </Content>
      </Layout>
    );
  }
}

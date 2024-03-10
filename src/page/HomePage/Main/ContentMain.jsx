import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import {
  CheckSquareFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import avt1 from "../../../assets/images/avt1.png";
import avt2 from "../../../assets/images/avt2.png";
import avt3 from "../../../assets/images/avt3.png";
import Image from "react-bootstrap/Image";
import ModalCyberBugs from "../Modal/ModalCyberBugs";

const gridStyle = {
  width: "100%",
};

export default function ContentMain() {
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
  };
  const handleShow = () => {
    setModalShow(true);
  };

  return (
    <div className="content">
      <Row gutter={12}>
        <Col span={6}>
          <Card title="BACKBLOG" style={{ backgroundColor: "gainsboro" }}>
            <Card.Grid style={gridStyle} onClick={handleShow}>
              <ModalCyberBugs show={modalShow} onHide={handleClose} />
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p className="pb-2">Lorem ipsum dolor sit amet.</p>
                  <div className="flex">
                    <div className="block-left">
                      <CheckSquareFilled
                        className="mr-2"
                        style={{ color: "skyblue" }}
                      />
                      <ArrowUpOutlined style={{ color: "red" }} />
                    </div>

                    <div className="block-right ml-16">
                      <div className="avatar-group flex">
                        <div className="avatar">
                          <Image
                            src={avt1}
                            style={{ width: "30px" }}
                            roundedCircle
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p className="pb-2">Lorem ipsum dolor sit amet.</p>
                  <div className="flex">
                    <div className="block-left">
                      <CheckSquareFilled
                        className="mr-2"
                        style={{ color: "skyblue" }}
                      />
                      <ArrowDownOutlined style={{ color: "greenyellow" }} />
                    </div>

                    <div className="block-right ml-16">
                      <div className="avatar-group flex">
                        <div className="avatar">
                          <Image
                            src={avt1}
                            style={{ width: "30px" }}
                            roundedCircle
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p className="pb-2">Lorem ipsum dolor sit amet.</p>
                  <div className="flex">
                    <div className="block-left">
                      <CheckSquareFilled
                        className="mr-2"
                        style={{ color: "skyblue" }}
                      />
                      <ArrowDownOutlined style={{ color: "greenyellow" }} />
                    </div>

                    <div className="block-right ml-16">
                      <div className="avatar-group flex">
                        <div className="avatar">
                          <Image
                            src={avt1}
                            style={{ width: "30px" }}
                            roundedCircle
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Grid>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="SELECTED FOR DEVELOPMENT"
            style={{ backgroundColor: "gainsboro" }}
          >
            <Card.Grid style={gridStyle}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p className="pb-2">Lorem ipsum dolor sit amet.</p>
                  <div className="flex">
                    <div className="block-left">
                      <CheckSquareFilled
                        className="mr-2"
                        style={{ color: "skyblue" }}
                      />
                      <ArrowDownOutlined style={{ color: "greenyellow" }} />
                    </div>

                    <div className="block-right ml-16">
                      <div className="avatar-group flex">
                        <div className="avatar">
                          <Image
                            src={avt1}
                            style={{ width: "30px" }}
                            roundedCircle
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p className="pb-2">Lorem ipsum dolor sit amet.</p>
                  <div className="flex">
                    <div className="block-left">
                      <CheckSquareFilled
                        className="mr-2"
                        style={{ color: "skyblue" }}
                      />
                      <ArrowDownOutlined style={{ color: "greenyellow" }} />
                    </div>

                    <div className="block-right ml-16">
                      <div className="avatar-group flex">
                        <div className="avatar">
                          <Image
                            src={avt1}
                            style={{ width: "30px" }}
                            roundedCircle
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Grid>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="IN PROGRESS" style={{ backgroundColor: "gainsboro" }}>
            <Card.Grid style={gridStyle}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p className="pb-2">Lorem ipsum dolor sit amet.</p>
                  <div className="flex">
                    <div className="block-left">
                      <CheckSquareFilled
                        className="mr-2"
                        style={{ color: "skyblue" }}
                      />
                      <ArrowDownOutlined style={{ color: "greenyellow" }} />
                    </div>

                    <div className="block-right ml-16">
                      <div className="avatar-group flex">
                        <div className="avatar">
                          <Image
                            src={avt1}
                            style={{ width: "30px" }}
                            roundedCircle
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Grid>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="DONE" style={{ backgroundColor: "gainsboro" }}>
            <Card.Grid style={gridStyle}>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p className="pb-2">Lorem ipsum dolor sit amet.</p>
                  <div className="flex">
                    <div className="block-left">
                      <CheckSquareFilled
                        className="mr-2"
                        style={{ color: "skyblue" }}
                      />
                      <ArrowDownOutlined style={{ color: "red" }} />
                    </div>

                    <div className="block-right ml-16">
                      <div className="avatar-group flex">
                        <div className="avatar">
                          <Image
                            src={avt1}
                            style={{ width: "30px" }}
                            roundedCircle
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

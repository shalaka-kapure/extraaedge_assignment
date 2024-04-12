import React, { useEffect, useState, useRef} from "react";
import {
  EditOutlined,
  DeleteFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled
} from "@ant-design/icons";
import { Avatar, Card, List, Modal, Divider } from "antd";
import FormComponent from "./Formcomponent";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/UserReducer";
const { Meta } = Card;

function Listcomponent({ email, phone, website }) {
  return (
    <List>
      <List.Item>
        <MailOutlined /> {email}
      </List.Item>
      <List.Item>
        <PhoneOutlined /> {phone}
      </List.Item>
      <List.Item>
        <GlobalOutlined /> {website}
      </List.Item>
    </List>
  );
}

function CardComponent({ user }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState(user.name);
  const [userData, setUserData] = useState(user);
  const [liked, setLiked] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setUserData(user);
    setDisplayName(user.name);
  }, [user]);

  const handleFormSubmit = (updatedUserData) => {
    setUserData(updatedUserData);
    setDisplayName(updatedUserData.name);
    setModalOpen(false);
  };

  const handleModalOk = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleLikeToggle = () => {
    setLiked(!liked); 
  };

  if (!userData) return null;

  const { id, email, phone, website } = userData;

  return (
    <Card
      style={{ width: 300 }}
      actions={[
        liked ? (
            <HeartFilled key="like" style={{ color: "red" }} onClick={handleLikeToggle} />
          ) : (
            <HeartOutlined key="like" style={{ color: "red" }} onClick={handleLikeToggle} />
          ),
        <EditOutlined key="edit" onClick={() => setModalOpen(true)} />,
        <DeleteFilled key="delete" onClick={() => handleDelete(id)} />,
      ]}
      cover={
        <Avatar
          src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`}
        />
      }
    >
      <Meta
        title={displayName}
        description={
          <Listcomponent email={email} phone={phone} website={website} />
        }
      />
      <Modal
        title="Basic Modal"
        centered
        visible={modalOpen}
        onOk={handleModalOk}
        onCancel={() => setModalOpen(false)}
      >
        <Divider />
        <FormComponent
          ref={formRef}
          user={userData}
          onSubmit={handleFormSubmit}
        />
        <Divider />
      </Modal>
    </Card>
  );
}

export default CardComponent;

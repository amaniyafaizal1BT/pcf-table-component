import * as React from "react";
import { Table, Button, Dropdown, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  description: string;
}

const initialData: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: "3",
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "",
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
  },
];

export const MyTableComponent = () => {
  const [data, setData] = React.useState(initialData);
  const [selectedLanguage, setSelectedLanguage] = React.useState<"en" | "du">("en");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      setSelectedLanguage("en");
    } else if (e.key === "2") {
      setSelectedLanguage("du");
    }
  };

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: selectedLanguage === "en" ? "Name" : "Naam",
      dataIndex: "name",
      key: "name",
    },
    {
      title: selectedLanguage === "en" ? "Age" : "Leeftijd",
      dataIndex: "age",
      key: "age",
    },
    {
      title: selectedLanguage === "en" ? "Address" : "Adres",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: DataType) => (
        <Button
          type="link"
          style={{ color: "#5f8cff" }}
          onClick={() => handleDelete(record.key)}
        >
          {selectedLanguage === "en" ? "Delete" : "Verwijderen"}
        </Button>
      ),
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: "English",
      key: "1",
    },
    {
      label: "Dutch",
      key: "2",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div style={{ padding: "12px" }}>
      <div style={{ width: "100%", textAlign: "left", marginBottom: "32px" }}>
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              {selectedLanguage === "en" ? "Select Language" : "Selecteer Taal"}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
};

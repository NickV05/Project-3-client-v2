import React, { useState } from "react";
import { Button, Form, Input, Select, message, Space } from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { post } from "../services/authService";
import { EventType } from "../context/records.context";
import { AxiosError } from "axios";

export type FormValues = {
  lpr: string;
  event: EventType;
  metadata?: { key: string; value: unknown }[];
};

interface SendEventProps {
  refetch: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendEvent: React.FC<SendEventProps> = ({ refetch, setOpenModal }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const createRecord = async (values: FormValues) => {
    const { lpr, event, metadata } = values;

    const metadataObject = (metadata || []).reduce(
      (acc: Record<string, unknown>, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {}
    );

    setLoading(true);
    try {
      const response = await post("/api/lpr", {
        plate_number: lpr,
        event_type: event,
        metadata: metadataObject,
      });

      message.success(
        `Record created for the License Plate Number: ${response?.data?.event?.plate_number}`
      );
      form.resetFields();
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(
          `Failed to create record. ${error.response?.data?.error}`
        );
      } else {
        message.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
      refetch();
      setOpenModal(false);
    }
  };

  return (
    <div data-testid="form-wrapper">
      <Form
        name="wrap"
        form={form}
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600, padding: "2vh" }}
        onFinish={createRecord}
      >
        <Form.Item
          label="License Plate Number"
          name="lpr"
          rules={[{ required: true, message: "Please enter a plate number!" }]}
        >
          <Input
            placeholder="Type License Plate Number"
            data-testid="input-lpr"
          />
        </Form.Item>

        <Form.Item
          label="Event Type"
          name="event"
          rules={[{ required: true, message: "Please select an event type!" }]}
        >
          <Select placeholder="Select Event Type" data-testid="select-event">
            <Select.Option value={EventType.ENTRY} data-testid="event-entry">
              Entry
            </Select.Option>
            <Select.Option value={EventType.EXIT} data-testid="event-exit">
              Exit
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.List name="metadata">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <label data-testid="metadata-label">Metadata</label>
              {!fields.length ? (
                <Form.Item>
                  <Button
                    style={{ margin: "0 5px 0 5px" }}
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    data-testid="add-metadata"
                  >
                    Add Metadata
                  </Button>
                </Form.Item>
              ) : null}

              <div>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", margin: "0 5px 8px 5px" }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[{ required: true, message: "Key is required" }]}
                    >
                      <Input placeholder="Key" data-testid="metadata-key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[{ required: true, message: "Value is required" }]}
                    >
                      <Input placeholder="Value" data-testid="metadata-value" />
                    </Form.Item>
                    <MinusCircleOutlined
                      data-testid="remove-metadata"
                      onClick={() => remove(name)}
                    />
                    <PlusCircleOutlined onClick={() => add()} />
                  </Space>
                ))}
              </div>
            </div>
          )}
        </Form.List>

        <Form.Item
          label=" "
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Button
            data-testid="submit-button"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SendEvent;

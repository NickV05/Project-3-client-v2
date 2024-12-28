import { Typography, Modal, message, Table } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import FiltersForTheList from "./FiltersForTheList";
import { RecordType, useRecordContext } from "../context/records.context";
import { get } from "../services/authService";
import moment from "moment";
import { capitalizeFirstLetter } from "../utils/functions";
import SendEvent from "./SendEvent";

const ListOfRecords = () => {
  const { state } = useRecordContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Plate Number",
      dataIndex: "plate_number",
      key: "plate_number",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Event Type",
      dataIndex: "event_type",
      key: "event_type",
      render: (text: string) => (
        <Typography.Text>{capitalizeFirstLetter(text)}</Typography.Text>
      ),
    },
    {
      title: "Event Time",
      dataIndex: "event_time",
      key: "event_time",
      render: (text: string) => (
        <Typography.Text>
          {new Date(text).toLocaleString("en-US", options)}
        </Typography.Text>
      ),
    },
    {
      title: "Metadata",
      dataIndex: "metadata",
      key: "metadata",
      render: (metadata:{ key: string; value: unknown }) => {
        const stringified = JSON.stringify(metadata)
          .replace(/[{}[\]]/g, '') 
          .replace(/,/g, ', ');    
    
        return <Typography.Text>{stringified}</Typography.Text>;
      },
    },
  ];


  const getRecords = async () => {
    setLoading(true);
    try {
      const historyResponse = await get(`/api/lpr/history`);
      setRecords(historyResponse.data);
    } catch (err) {
      message.error("Records are not available right now. Try again later");
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = useMemo(() => {
    const applyFilters = (records: RecordType[]) => {
      let filteredRecords = [...records];

      if (state.event_type) {
        filteredRecords = filteredRecords.filter(
          (record) => record.event_type === state.event_type
        );
      }

      if (state.plate_number) {
        filteredRecords = filteredRecords.filter((record) =>
          record.plate_number
            .toLowerCase()
            .includes(state.plate_number.toLowerCase())
        );
      }

      if (state.event_time_start && state.event_time_end) {
        const start = moment(state.event_time_start);
        const end = moment(state.event_time_end);

        filteredRecords = filteredRecords.filter((record) => {
          const eventTime = moment(record.event_time);
          return eventTime.isBetween(start, end, undefined, "[]");
        });
      }

      return filteredRecords;
    };

    return applyFilters(records);
  }, [state, records]);

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div data-testid="list-of-records">
      <>
        <Modal
          footer={null}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          onCancel={() => {
            setOpenModal(false);
          }}
        >
          <SendEvent refetch={getRecords} setOpenModal={setOpenModal} />
        </Modal>
        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredRecords}
          rowKey="id"
          pagination={false}
          bordered
          title={() => (
            <FiltersForTheList refetch={getRecords} setOpenModal={setOpenModal} />
          )}
          data-testid="records-table"
        />
      </>
    </div>
  );
};

export default ListOfRecords;

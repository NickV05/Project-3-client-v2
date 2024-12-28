import React from "react";
import { useRecordContext } from "../context/records.context";
import { Button, Input, Select, DatePicker } from "antd";
import { ClearOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface FiltersForTheListProps {
  refetch: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiltersForTheList: React.FC<FiltersForTheListProps> = ({
  refetch,
  setOpenModal,
}) => {
  const { state, setState, reset } = useRecordContext();

  const handleTimeRangeChange = (dates: any, dateStrings: [string, string]) => {
    const [start, end] = dateStrings;
    setState({ ...state, event_time_start: start, event_time_end: end });
  };

  return (
    <div
      style={{
        width: "96vw",
        borderBottom: "1px solid #f0f0f0",
        paddingBottom: "3vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Select
        data-testid="select-event"
        value={state.event_type}
        placeholder="Select Event Type"
        onChange={(value) => setState({ ...state, event_type: value })}
        style={{ width: "15vw" }}
        allowClear
      >
        <Select.Option data-testid="select-event-entry" value="entry">
          Entry
        </Select.Option>
        <Select.Option data-testid="select-event-exit" value="exit">
          Exit
        </Select.Option>
      </Select>

      <Input
        data-testid="filter-license-plate"
        placeholder="License Plate Number"
        value={state.plate_number}
        onChange={(e) => setState({ ...state, plate_number: e.target.value })}
        style={{ width: "15vw" }}
      />

      <DatePicker.RangePicker
        showTime
        value={
          state.event_time_start && state.event_time_end
            ? [dayjs(state.event_time_start), dayjs(state.event_time_end)]
            : null
        }
        onChange={handleTimeRangeChange}
        placeholder={["Start Time", "End Time"]}
        style={{ width: "30vw" }}
      />

      <Button
        data-testid="reset-button"
        onClick={reset}
      >
        <ClearOutlined /> Reset
      </Button>

      <Button
        data-testid="add-record"
        type="primary"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <PlusOutlined /> Create
      </Button>

      <Button
        data-testid="refetch-button"
        onClick={() => {
          refetch();
        }}
      >
        <ReloadOutlined /> Refetch
      </Button>
    </div>
  );
};

export default FiltersForTheList;
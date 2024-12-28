import React from "react";
import ListOfRecords from "../components/ListOfRecords";
import { RecordProvider } from "../context/records.context";

const HomePage = () => {
  return (
    <div>
      <RecordProvider>
        <ListOfRecords />
      </RecordProvider>
    </div>
  );
};

export default HomePage;

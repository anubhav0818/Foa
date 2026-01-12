import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { viewSizeCalculator } from "../utils/viewSizeCalculator";
import NoFoaImg from "../assets/NoFoa.png";

const tabs = [
  { label: "ALL", key: "all" },
  { label: "CREATED BY ME", key: "created" },
];

const PageWrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - var(--topbar-height));
  background: var(--bg);
  padding: clamp(2.1vh, 2vw, 4vh);
  display: flex;
  flex-direction: column;
  gap: 2.6vh;
`;

const Card = styled.section`
  flex: 1;
  background: #fff;
  border-radius: 2.1vh;
  padding: 2.6vh;
  box-shadow: 0 2.6vh 4.5vh rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  margin-top: 27px;
  margin-bottom: 20px;
`;

const TabsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 32px;
  font-family: Inter;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: #7c8199;
  font-weight: 700;
  padding-bottom: 1.6vh;
  position: relative;
  cursor: pointer;
  font-size: 12px;

  &.active {
    color: #ff1f8f;
  }

  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.26vh;
    background: #ff1f8f;
    border-radius: 90vw;
  }
`;

const CreateFOAButton = styled.button`
  width: 118px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #ff1f8f;
  color: white;
  font-weight: 600;
  font-size: 13.63px;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6vh;
  color: #5b5f73;
  font-size: 1.4vw;
  text-align: center;
`;

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`;

const TableWrapper = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;

  thead {
    background: #f8f8f8;
    border-radius: 12px;
    color: #606080;
  }

  th {
    font-weight: 400;
    padding: 0 13px;
    line-height: 40px;
    text-align: left;
  }

  td {
    padding: 16px 12px;
    white-space: nowrap;
    color: #242639;
    font-weight: 400;
    font-family: Inter;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;

    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    text-align: left;
    &:nth-child(8),
    text-align: right;
    &:nth-child(9) {
      text-align: center;
    }
  }

  tbody tr {
    height: 70px;
    border-bottom: 1px solid #eee;

    &:hover {
      background: #fafafa;
    }
  }
`;

const FOALinkCell = styled.td`
  color: #242639;
  cursor: pointer;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusChip = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85vw;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &.new {
    background: #e7f1ff;
    color: #1e7bff;
  }
  &.in-analysis {
    background: #fff4d6;
    color: #c58b18;
  }
  &.in-review {
    background: #fff7d8;
    color: #d69e2e;
  }
  &.finalized {
    background: #e2ffe3;
    color: #009951;
  }
  &.failed {
    background: #ffe5e5;
    color: #e04545;
  }
  &.passed {
    background: #e1fbea;
    color: #159a56;
  }
`;

export default function Page2ListStyled() {
  const [activeTab, setActiveTab] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();
  const loggedInUser = "John Smith";

  useEffect(() => {
    fetch("https://foa-azure.vercel.app/submissions")
      .then((res) => res.json())
      .then((data) => setSubmissions(data))
      .catch((err) => console.error("Error fetching submissions:", err));
  }, []);

  const displayedSubmissions =
    activeTab === 0
      ? submissions
      : submissions.filter((item) => item.createdBy === loggedInUser);

  const createdByMeCount = submissions.filter(
    (item) => item.createdBy === loggedInUser
  ).length;

  return (
    <PageWrapper>
      <Card>
        <TabsRow>
          <Tabs>
            {tabs.map((tab, index) => (
              <TabButton
                key={tab.label}
                className={activeTab === index ? "active" : ""}
                onClick={() => setActiveTab(index)}
                type="button"
              >
                {tab.label} (
                {tab.key === "all" ? submissions.length : createdByMeCount})
              </TabButton>
            ))}
          </Tabs>

          <CreateFOAButton onClick={() => navigate("/create")}>
            + Create FOA
          </CreateFOAButton>
        </TabsRow>

        {displayedSubmissions.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <img src={NoFoaImg} alt="No FOA" />
            </EmptyIcon>
            <p>There are no FOAs created yet.</p>
          </EmptyState>
        ) : (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>FOA Id</th>
                  <th>Submission Id</th>
                  <th>Location</th>
                  <th>Vendor</th>
                  <th>Status</th>
                  <th>Total Sites</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {submissions.map((item) => (
                  <tr key={item._id}>
                    <FOALinkCell
                      onClick={() =>
                        navigate(
                          `/report?foaId=${item.foaId}&submissionId=${item.submissionId}`
                        )
                      }
                    >
                      {item.foaId}
                    </FOALinkCell>

                    <td>{item.submissionId || "--"}</td>
                    <td>{item.location || "--"}</td>
                    <td>{item.vendor || "--"}</td>

                    <td>
                      <StatusChip
                        className={item.status?.toLowerCase().replace(" ", "-")}
                      >
                        {item.status || "--"}
                      </StatusChip>
                    </td>

                    <td>{item.totalSites || "--"}</td>
                    <td>⋮</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </Card>
    </PageWrapper>
  );
}

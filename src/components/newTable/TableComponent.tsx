import React from "react";
import { v4 } from "uuid";

import type { TableComponentProps } from "../../types/schedule";
import IsInput from "./IsInput";
import * as styled from "./styled";
import SubTable from "./SubTable";

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  updateData,
}) => (
  <styled.TableWrapper>
    {data.map((table, tableIndex) => (
      <div key={v4()}>
        <IsInput
          component={
            <styled.SectionHeader>{table.header}</styled.SectionHeader>
          }
          value={table.header}
          onSave={(newValue) =>
            updateData("header", newValue, false, false, tableIndex)
          }
          componentStyle={styled.SectionHeaderStyle}
        />

        <styled.SectionWrapper>
          {table.content.map((content, index) => (
            <div key={v4()}>
              <IsInput
                component={
                  <styled.SubTitle>{content.subTitle}</styled.SubTitle>
                }
                value={content.subTitle}
                onSave={(newValue) =>
                  updateData(
                    "subTitle",
                    newValue,
                    false,
                    true,
                    index,
                    undefined,
                  )
                }
                componentStyle={styled.SubTitleStyle}
              />
              <IsInput
                component={<styled.SubTitle>{content.data}</styled.SubTitle>}
                value={content.data}
                onSave={(newValue) =>
                  updateData("data", newValue, false, true, index)
                }
                componentStyle={styled.SubTitleStyle}
              />
              <SubTable
                tableIndex={index}
                updateData={updateData}
                columns={content.subTable.columns}
                data={content.subTable.rowData}
              />
              <IsInput
                component={
                  <styled.SubFooter>{content.subFooter}</styled.SubFooter>
                }
                value={content.subFooter}
                onSave={(newValue) =>
                  updateData("subFooter", newValue, false, true, index)
                }
                componentStyle={styled.SubFooter}
              />
            </div>
          ))}
        </styled.SectionWrapper>
        <IsInput
          component={<styled.Footer>{table.footer}</styled.Footer>}
          value={table.footer}
          onSave={(newValue) =>
            updateData("footer", newValue, false, false, tableIndex)
          }
          componentStyle={styled.FooterStyle}
        />
      </div>
    ))}
  </styled.TableWrapper>
);

export default TableComponent;

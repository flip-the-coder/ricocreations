import styled from 'styled-components';

export const TableList = styled.div`
    .rdt_Table {
        font-family: Montserrat;
        font-size: 14px;
    }
    .rdt_Table,
    .rdt_ExpanderRow,
    header {
        background-color: #f7f7f7;
    }
    .rdt_TableRow {
        outline: none;
        border-radius: 5px;
        margin: 3px 0;
        transition: background-color 0.24s ease-in-out;
        width: inherit;
        border: none;
        &:hover {
            background-color: rgba(232, 233, 235, 0.8);
        }
    }
`;

export const Table = styled.div`
    .rdt_Table {
        font-family: Montserrat;
        font-size: 14px;
    }
    .rdt_Table,
    .rdt_ExpanderRow {
        background-color: #f7f7f7;
    }
    .rdt_TableHeadRow {
        background-color: rgba(33, 70, 126, 0.8);
        .rdt_TableCol {
            color: #ffffff;
        }
    }
    .rdt_TableRow {
        border-radius: 0;
        margin: 0;
        background-color: rgba(33, 70, 126, 0.2);
        transition: background-color 0.1s ease-in-out;
        width: inherit;
        border-bottom: 1px solid #8a8a8a;
        &:hover {
            background-color: rgb(240, 157, 57, 0.2);
        }
    }
    .rdt_TableHeader {
        font-size: 16px;
        padding: 0;
    }
    .rdt_TableBody {
        overflow-y: auto;
    }
`;

export const TableContainer = styled.div`
    display: table;
    width: 100%;
    border-collapse: collapse;
    margin: 5px 0;
`;

export const Row = styled.div`
    display: table-row;
    text-align: left;
`;

export const Cell = styled.div`
    display: table-cell;
    border: 1px solid #ccc;
    padding: 5px;
`;
export const LabelCell = styled.div`
    display: table-cell;
    border: 1px solid #ccc;
    width: 200px;
    padding: 5px;
    background-color: #21467e;
`;

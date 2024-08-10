import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { ReactComponent as CancelIcon } from '../../icons/cancel.svg';

interface SearchInputFieldProps<T = HTMLInputElement> extends React.DetailedHTMLProps<React.InputHTMLAttributes<T>, T> {
    visualizerLink?: string;
    placeholderTerm?: string;
    label?: string;
    searchTerm: string;
    onClear: () => void;
}

const SearchInputField: React.FC<SearchInputFieldProps> = (props) => {
    const { searchTerm, visualizerLink, placeholderTerm, onClear, ...inputProps } = props;
    return (
        <SearchInputDiv>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <SearchIcon className="search-icon" />
            <input
                {...inputProps}
                type="text"
                placeholder={placeholderTerm ? placeholderTerm : 'search'}
                value={visualizerLink ? visualizerLink : searchTerm}
            />
            <i hidden={!searchTerm} onClick={onClear} className="cancel-icon">
                <CancelIcon />
            </i>
        </SearchInputDiv>
    );
};

export default SearchInputField;

const SearchInputDiv = styled.div`
    position: relative;
    width: 100%;
    svg {
        width: 24px;
        height: 24px;
    }
    label {
        position: absolute;
        color: #202834;
        text-decoration: none solid rgb(32, 40, 52);
        line-height: 32px;
        top: -90%;
    }
    input {
        width: 100%;
        height: 34px;
        text-indent: 40px;
        font-size: 16px;
        border-radius: 24px;
        border: 1px solid #d1d1d1;
        background-color: #ffffff;
        color: #202834;
        outline: none;
        transition: 0.1s linear;
        &:hover {
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        }
        &:focus {
            border-color: #202834;
            background-size: cover;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        }
    }
    .search-icon {
        position: absolute;
        left: 10px;
        top: 5px;
        path {
            fill: #cccccc;
        }
    }
    .cancel-icon {
        position: absolute;
        right: 10px;
        top: 5px;
        cursor: pointer;
    }
`;

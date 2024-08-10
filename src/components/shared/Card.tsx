import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import CardMenu from './CardMenu';
import { ReactComponent as CheckBoxIcon } from '../../icons/CheckBoxOutlineBlankOutlined.svg';
import { ReactComponent as CheckBoxSelectedIcon } from '../../icons/CheckBoxFilled.svg';

interface Props<T> {
    image?: string;
    title: string;
    children?: ReactNode;
    cardMenu?: ReactNode;
    isActive?: boolean;
    item?: T;
    onSelectedItem?: (selectedItem: T) => void;
    isSelected?: boolean;
}

function Card<T = any>(props: Props<T>) {
    const intl = useIntl();

    const onCheckBoxClick = () => {
        if (props.item && props.onSelectedItem) {
            props.onSelectedItem(props.item);
        }
    };

    return (
        <CardContainer
            className="card-container"
            onClick={onCheckBoxClick}
            isSelected={props.isActive && props.isSelected}
        >
            <OverlayCheckBoxIcon isActive={props.isActive}>
                {props.isSelected ? <CheckBoxSelectedIcon /> : <CheckBoxIcon />}
            </OverlayCheckBoxIcon>
            <CheckBoxCardOverlay isActive={props.isActive} isSelected={props.isSelected} />
            <ImageContainer>
                {props.image ? (
                    <Image imageUrl={props.image} />
                ) : (
                    <p style={{ textAlign: 'center', fontSize: 24 }}>{intl.formatMessage({ id: 'image.notFound' })}</p>
                )}
            </ImageContainer>
            <CardContent>
                <CardHeader>
                    <Title>{props.title}</Title>
                    {props.cardMenu && <CardMenu>{props.cardMenu}</CardMenu>}
                </CardHeader>
                <div style={{ paddingBottom: 10 }}>{props.children}</div>
            </CardContent>
        </CardContainer>
    );
}

export default Card;

export const CardContainer = styled.div<{ isSelected?: boolean }>`
    position: relative;
    cursor: pointer;
    width: 350px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    -moz-box-shadow: 0px 3px 6px #00000029;
    -webkit-box-shadow: 0px 3px 6px #00000029;

    border-radius: 3px;
    opacity: 1;
    box-sizing: border-box;

    position: relative;

    border: 1px solid #e6e6e6;
    transition: border-color 0.3s ease-in-out, border-width 0.3s ease-in-out;

    ${({ isSelected }) =>
        isSelected &&
        `
        border-color: #3572C9;
        border-width: 2px;
    `}

    @media only screen and (min-width: 1170px) {
        width: 310px;
    }

    @media only screen and (min-width: 400px) and (max-width: 1170px) {
        width: 350px;
    }

    @media only screen and (max-width: 350px) {
        width: 285px;
    }
`;

export const ImageContainer = styled.div`
    background-color: #cccccc;
    height: 261px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    @media only screen and (min-width: 1170px) {
        height: 235px;
    }

    @media only screen and (min-width: 1170px) and (max-width: 1170px) {
        height: 260px;
    }

    @media only screen and (max-width: 350px) {
        height: 215px;
    }
`;

export const Image = styled.div<{ imageUrl: string }>`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-image: url(${(p) => p.imageUrl});
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CardContent = styled.div`
    margin: 10px;
    word-break: normal;
`;

export const Title = styled.div`
    font-family: ${(props) => props.theme.typography.family};
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1px;
    color: #313131;
    padding-right: 10px;
`;

const CheckBoxCardOverlay = styled.div<{ isActive?: boolean; isSelected?: boolean }>`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    z-index: 1;
    background: #fff;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out, border-color 0.3s ease-in-out;

    ${({ isActive }) =>
        isActive &&
        `
        visibility: visible;
        opacity: 0.5;
    `}

    ${({ isSelected }) =>
        isSelected &&
        `
        opacity: 0;
    `}
`;

const OverlayCheckBoxIcon = styled.div<{ isActive?: boolean }>`
    position: absolute;
    top: 5px;
    left: 5px;

    z-index: 2;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;

    ${({ isActive }) =>
        isActive &&
        `
        visibility: visible;
        opacity: 1;
    `}
`;

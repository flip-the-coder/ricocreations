import { Form } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { SpinnerGif } from './SpinnerGif';

interface Props {
    title?: string | React.ReactNode;
    subtitle?: string;
    actions?: React.ReactNode;
    isBusy?: boolean;
    width?: string;
    margin?: string;
    stickyHeader?: boolean;
    middleSection?: string | React.ReactNode;
    minHeight?: string;
    className?: string;
}

const Card: React.FC<Props> = (props) => {
    return (
        <Container width={props.width} margin={props.margin} minHeight={props.minHeight} className={props.className}>
            <TitleWithActions sticky={props.stickyHeader}>
                <div>
                    {props.title && <p className="title">{props.title}</p>}
                    {props.subtitle && <p className="subtitle">{props.subtitle}</p>}
                </div>
                {props.middleSection && <div>{props.middleSection}</div>}
                <div>{props.actions}</div>
            </TitleWithActions>
            {props.isBusy && (
                <SpinnerContainer>
                    <SpinnerGif size={'50px'} />
                </SpinnerContainer>
            )}
            {!props.isBusy && props.children}
        </Container>
    );
};

const FormCard: React.FC<Props> = (props) => {
    return (
        <Form>
            <Card {...props}>{props.children}</Card>
        </Form>
    );
};

export { Card as default, FormCard };

const Container = styled.div<{ width?: string; margin?: string; minHeight?: string }>`
    width: ${(p) => (p.width ? p.width : '85%')};
    margin: ${(p) => (p.margin ? p.margin : '1rem auto')};
    padding: 16px;
    border-radius: 3px;
    background-color: #ffffff;
    background-size: cover;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: ${(p) => (p.margin ? p.margin : '1rem')};

    ${({ minHeight }) =>
        minHeight &&
        `
        min-height: ${minHeight};
    `}
`;

const TitleWithActions = styled.div<{ sticky?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${({ sticky }) =>
        sticky &&
        `
        position: sticky;
        padding: 10px 0;
        border-bottom: 1px solid #ebebeb;
        background: #fff;
        z-index: 1;
        top: 0;
    `}

    p.title {
        font-weight: bold;
        font-family: Montserrat;
        font-size: 14px;
    }

    p.subtitle {
        line-height: 21px;
        font-family: Montserrat;
        font-size: 12px;
    }

    button {
        margin-right: 1rem;
    }

    button:last-of-type {
        margin-right: 0;
    }
`;

const SpinnerContainer = styled.div`
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

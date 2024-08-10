import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { ReactComponent as InfoLinkIcon } from '../../icons/open_in_new-24px.svg';
import { prependHTTPProtocol } from '../../utils/browserUtils';

interface Props {
    infoLinkURL: string;
    withIcon?: boolean;
}

const InfoLink: React.FC<Props> = ({ infoLinkURL, withIcon }) => {
    const { formatMessage: f } = useIntl();
    return (
        <InfoLinkStyled target="_blank" rel="noopener noreferrer" href={prependHTTPProtocol(infoLinkURL)}>
            <span>{f({ id: 'QuestionItem.infolink' })}</span>
            {withIcon && <InfoLinkIcon />}
        </InfoLinkStyled>
    );
};

InfoLink.defaultProps = {
    withIcon: true
};

export default InfoLink;

const InfoLinkStyled = styled.a`
    font-size: ${(props) => props.theme.configuratorPanel.font.marketingText.size};
    color: ${(props) => props.theme.configuratorPanel.color.marketingTextLinkIconColor};
    font-weight: ${(props) => props.theme.configuratorPanel.font.marketingText.fontWeight};
    margin: 0 10px;
    white-space: nowrap;
    text-decoration: none;
    transition: border-bottom 0.2s ease-in-out;
    border-bottom: 1px solid transparent;
    display: inline-flex;
    align-items: center;

    svg {
        width: 16px;
        height: 16px;
        fill: ${(props) => props.theme.configuratorPanel.color.marketingTextLinkIconColor};
    }

    :hover {
        border-color: ${(props) => props.theme.configuratorPanel.color.marketingTextLinkIconColor};
    }
`;

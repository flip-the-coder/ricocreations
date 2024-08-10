import React from 'react';

interface LinkCellProps {
    linkUrl: string;
    title: string;
}

const LinkCell: React.FC<LinkCellProps> = (props) => {
    if (!props.linkUrl) return null;
    return (
        <a href={props.linkUrl} target="_blank" rel="noopener noreferrer">
            {props.title}
        </a>
    );
};

export default LinkCell;

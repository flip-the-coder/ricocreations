import styled from 'styled-components';
import { ReactComponent as RemoveIcon } from '../../icons/delete.svg';
import { ReactComponent as RecrunchFileIcon } from '../../icons/loop_black_24dp.svg';
import { ReactComponent as DownloadFileIcon } from '../../icons/file_download_black_24dp.svg';
import { ReactComponent as OpenNewFileIcon } from '../../icons/open_in_new_black_24dp.svg';
import { ReactComponent as CopyLinkIcon } from '../../icons/link_black_24dp.svg';
import { ReactComponent as ExportIcon } from '../../icons/Export.svg';
import { ReactComponent as ModeEditIcon } from '../../icons/mode_edit_black_24dp.svg';

export const Button = styled.button<{ primary?: boolean }>`
    padding: 0.5rem 1rem;
    border-radius: 3px;
    background-color: ${(p) => (p.primary ? '#f09d39' : '#21467e')};
    background-size: cover;
    border: 1px solid transparent;
    font-family: Montserrat;
    font-size: 14px;
    color: #ffffff;
    text-decoration: none solid rgb(255, 255, 255);
    text-align: center;
    cursor: pointer;
    transition: 0.1s linear;
    outline: none;
    &:hover {
        opacity: 0.75;
        transform: translate3d(0, -2px, 0);
    }
    &:disabled {
        background-color: rgba(138, 138, 138, 0.2);
        color: #8a8a8a;
        box-shadow: none;
        cursor: not-allowed;
        &:hover {
            opacity: 1;
            transform: none;
            background-color: rgba(138, 138, 138, 0.2);
            color: #8a8a8a;
        }
    }
`;

export const SecondaryButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 3px;
    background-color: #f7f7f7;
    background-size: cover;
    font-family: Montserrat;
    font-size: 14px;
    color: #202834;
    text-decoration: none solid rgb(32, 40, 52);
    text-align: center;
    border: 1px solid transparent;
    transition: 0.1s linear;
    cursor: pointer;
    font-size: 16px;
    outline: none;
    &:hover {
        background: #ebebeb;
    }
    &:disabled {
        background-color: rgba(138, 138, 138, 0.2);
        color: #8a8a8a;
        box-shadow: none;
        cursor: not-allowed;
        &:hover {
            opacity: 1;
            transform: none;
            background-color: rgba(138, 138, 138, 0.2);
            color: #8a8a8a;
        }
    }
`;

export const DeleteButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 3px;
    background-color: #ffffff;
    background-size: cover;
    font-family: Montserrat;
    font-size: 14px;
    color: #202834;
    text-decoration: none solid rgb(32, 40, 52);
    text-align: center;
    border: 1px solid #202834;
    transition: 0.1s linear;
    cursor: pointer;
    outline: none;
    &:hover {
        border: 1px solid #d63831;
        background-color: #d63831;
        color: #ffffff;
    }
    &:disabled {
        background-color: rgba(138, 138, 138, 0.2);
        color: #8a8a8a;
        box-shadow: none;
        cursor: not-allowed;
        border: 1px solid #8a8a8a;
        &:hover {
            opacity: 1;
            transform: none;
            background-color: rgba(138, 138, 138, 0.2);
            border-color: #8a8a8a;
            color: #8a8a8a;
        }
    }
`;

export const CancelButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 3px;
    background-color: #ffffff;
    background-size: cover;
    font-family: Montserrat;
    font-size: 14px;
    color: #202834;
    text-decoration: none solid rgb(32, 40, 52);
    text-align: center;
    border: 1px solid #202834;
    transition: 0.1s linear;
    cursor: pointer;
    outline: none;
    &:hover {
        border: 1px solid #202834;
        background-color: #202834;
        color: #ffffff;
    }
    &:disabled {
        background-color: rgba(138, 138, 138, 0.2);
        color: #8a8a8a;
        box-shadow: none;
        cursor: not-allowed;
        &:hover {
            opacity: 1;
            transform: none;
            background-color: rgba(138, 138, 138, 0.2);
            color: #8a8a8a;
        }
    }
`;

export const DeleteIconButton = styled(RemoveIcon)`
    fill: #d63831;
    transform-origin: 50% 50%;
    transition: transform 0.2 ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;
export const RecrunchIconButton = styled(RecrunchFileIcon)`
    fill: #202834;
    transform-origin: 50% 50%;
    transition: transform 0.2 ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
    &.disabled {
        pointer-events: none;
        cursor: not-allowed;
        fill: #8a8a8a;
        &:hover {
            transform: none;
            fill: #8a8a8a;
        }
`;

export const DownloadIconButton = styled(DownloadFileIcon)`
    fill: #202834;
    transform-origin: 50% 50%;
    transition: transform 0.2 ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;

export const ExportBinaryIconButton = styled(ExportIcon)`
    fill: #202834;
    transform-origin: 50% 50%;
    transition: transform 0.2 ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;

export const OpenNewIconButton = styled(OpenNewFileIcon)`
    fill: #202834;
    transform-origin: 50% 50%;
    transition: transform 0.2 ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;

export const CopyLinkIconButton = styled(CopyLinkIcon)`
    fill: #202834;
    transform-origin: 50% 50%;
    transition: transform 0.2 ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;

export const EditIcon = styled(ModeEditIcon)`
    fill: #202834;
    transform-origin: 50% 50%;
    transition: transform 0.2 ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;

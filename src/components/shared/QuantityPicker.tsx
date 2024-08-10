import React, { useEffect } from 'react';
import styled from 'styled-components';

interface Props {
    quantity: number | string;
    setQuantity: (quantity: number | string) => void;
    width?: string;
    disabled?: boolean;
}

const enum updateTypes {
    INPUT = 'input',
    INCREMENT = 'increment',
    DECREMENT = 'decrement'
}

const INCREMENT_VALUE = 1;

const QuantityPicker: React.FC<Props> = (props) => {
    const { quantity, setQuantity, width } = props;

    useEffect(() => {
        if (typeof quantity !== 'number') {
            setQuantity(0);
        }
        //eslint-disable-next-line
    }, []);

    const onChange = (updateType: string, value: string | number) => {
        switch (updateType) {
            case updateTypes.INPUT:
                setQuantity(typeof value === 'string' && value.length > 0 ? parseInt(value) : value);
                break;
            case updateTypes.INCREMENT:
                setQuantity(typeof value === 'number' ? value + INCREMENT_VALUE : 0);
                break;
            case updateTypes.DECREMENT:
                setQuantity(typeof value === 'number' && value > 0 ? value - INCREMENT_VALUE : 0);
                break;
            default:
                return null;
        }
    };

    const formatedQuantity = () => {
        return typeof quantity === 'number' ? new Intl.NumberFormat('en-US', {}).format(quantity) : quantity;
    };

    return (
        <QuantityPickerContainer disabled={props.disabled} width={width} className="quantity-picker">
            <button
                disabled={props.disabled}
                className="quantity-modifier modifier-left"
                onClick={() => onChange(updateTypes.DECREMENT, quantity)}
            >
                -
            </button>
            <input
                disabled={props.disabled}
                className="quantity-display"
                type="text"
                value={formatedQuantity()}
                onChange={(e) => onChange(updateTypes.INPUT, e.target.value.replace(/[^0-9]/, ''))}
            />
            <button
                disabled={props.disabled}
                className="quantity-modifier modifier-right"
                onClick={() => onChange(updateTypes.INCREMENT, quantity)}
            >
                +
            </button>
        </QuantityPickerContainer>
    );
};

export default QuantityPicker;

const QuantityPickerContainer = styled.span<{ width?: string; disabled?: boolean }>`
    display: flex;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    vertical-align: middle;
    border: none;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

    .quantity-modifier,
    .quantity-display {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline: none;
    }

    .quantity-modifier {
        color: #888;
        text-align: center;
        cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
        background-color: inherit;
        width: 1.8rem;
        font-size: 1.2rem;
        border: 1px solid #bfbfbf;

        :hover {
            background-color: ${(props) => (props.disabled ? 'inherit' : '#6a6a6a')};
            color: ${(props) => (props.disabled ? '#888' : 'white')};
        }

        :focus {
            outline: 0;
        }
    }

    .modifier-right {
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
    }

    .modifier-left {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }

    .quantity-display {
        font-size: 0.9rem;
        padding: 0.2rem 0.4rem;
        border: 0;
        border-top: 1px solid #bfbfbf;
        border-bottom: 1px solid #bfbfbf;
        color: #bfbfbf;
        text-align: center;
        user-select: none;
        cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
        max-width: ${(props) => (props.width ? props.width : '60px')};
    }

    :hover {
        .quantity-modifier {
            border: ${(props) => (props.disabled ? '1px solid #bfbfbf' : '1px solid #808080')};
        }

        .quantity-display {
            border-top: 1px solid #808080;
            border-bottom: 1px solid #808080;
            color: #808080;

            border-top: ${(props) => (props.disabled ? '1px solid #bfbfbf' : '1px solid #808080')};
            border-bottom: ${(props) => (props.disabled ? '1px solid #bfbfbf' : '1px solid #808080')};
            color: ${(props) => (props.disabled ? '#bfbfbf' : '808080')};
        }
    }
`;

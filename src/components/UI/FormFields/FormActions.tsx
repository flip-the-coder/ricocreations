import { useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { Button, SecondaryButton } from '../Button.styled';

type FormActionsProps = {
    saveLabel?: string;
    editMode: boolean;
    onCancelClick?: () => void;
    onEditClick?: () => void;
};

const FormActions = (props: FormActionsProps): JSX.Element => {
    const { resetForm, dirty } = useFormikContext();

    const onCancelClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        resetForm();
        if (props.onCancelClick) {
            props.onCancelClick();
        }
    };

    const onEditClickHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        resetForm();
        if (props.onEditClick) {
            props.onEditClick();
        }
    };

    return (
        <Container>
            {props.editMode ? (
                <React.Fragment>
                    <Button type="submit" primary disabled={!dirty}>
                        {props.saveLabel || 'Save'}
                    </Button>
                    <SecondaryButton type="button" onClick={onCancelClickHandler}>
                        Cancel
                    </SecondaryButton>
                </React.Fragment>
            ) : (
                <Button type="button" onClick={onEditClickHandler}>
                    Edit
                </Button>
            )}
        </Container>
    );
};

export default FormActions;

const Container = styled.div`
    button {
        margin-right: 1rem;
    }

    button:last-of-type {
        margin-right: 0;
    }
`;

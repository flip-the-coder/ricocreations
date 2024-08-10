import { Formik, Form, FormikHelpers } from 'formik';
import React from 'react';
import TextFormField from '../../UI/FormFields/TextFormField';
import * as yup from 'yup';
import { Button } from '../../shared/Button.styled';
import { ButtonContainer, SubTitle, Title } from './LoginPage.styled';
import { observer } from 'mobx-react-lite';
import userApi from '../../../api/userApi';
import { useIntl } from 'react-intl';

interface ResquestPasswordResetFormValues {
    email: string;
}

const initialValues: ResquestPasswordResetFormValues = { email: '' };

interface Props {
    setIsFormSent: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RequestPasswordResetForm: React.FC<Props> = ({ setIsFormSent }) => {
    const intl = useIntl();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email()
            .required(intl.formatMessage({ id: 'form.email.required.message' }))
    });

    async function onSubmit(
        data: ResquestPasswordResetFormValues,
        formikHelpers: FormikHelpers<ResquestPasswordResetFormValues>
    ) {
        formikHelpers.setSubmitting(true);
        await userApi.account.requestPasswordResetLink(data.email);
        formikHelpers.setSubmitting(false);
        setIsFormSent(true);
    }

    return (
        <React.Fragment>
            <Title>{intl.formatMessage({ id: 'PasswordResetPage.title' })}</Title>
            <SubTitle>{intl.formatMessage({ id: 'PasswordResetPage.subtitle' })}</SubTitle>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <TextFormField
                            name="email"
                            type="email"
                            autoComplete="on"
                            label={intl.formatMessage({ id: 'form.email.label' })}
                        />
                        <ButtonContainer>
                            <Button primary disabled={isSubmitting} type="submit">
                                {intl.formatMessage({ id: 'PasswordResetPage.button.sendResetLink' })}
                            </Button>
                        </ButtonContainer>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default observer(RequestPasswordResetForm);

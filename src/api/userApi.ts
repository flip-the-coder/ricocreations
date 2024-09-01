import { AxiosPromise } from 'axios';
import { User } from '../models/User';
import { Transport } from './Transport';

const USER_API: string = '/user/api';

const companyId = '749423b9-1d66-4f93-b1db-ee1526eeb981';

const auth = {
    login: (email: string, password: string) => {
        const userCredentials = {
            username: email,
            password: password
        };
        return Transport.post(`${USER_API}/auth/login`, userCredentials);
    }
};

export interface RegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    userAgreementSignedInitials: string;
}

export interface UserRegistrationWithTokenModel {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    userAgreementSignedInitials: string;
}

const account = {
    requestPasswordResetLink: (email: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Target-Url': `https://${window.location.hostname}/passwordresetform/{userId}/{token}`
            }
        };
        return Transport.post(`${USER_API}/account/requestpasswordreset`, { email }, undefined, config);
    },
    resetPassword: (userId: string, token: string, newPassword: string, confirmPassword: string) => {
        return Transport.post(`${USER_API}/account/resetpassword?userId=${userId}&code=${token}`, {
            Password: newPassword,
            ConfirmPassword: confirmPassword
        });
    },
    getUserAgreement: () => {
        return Transport.get(`${USER_API}/account/globaluseragreement`);
    },
    getTermsAndConditions: (): AxiosPromise<string> => {
        return Transport.get(`${USER_API}/account/useragreement`);
    },
    acceptTermsAndConditions: (username: string, password: string, userAgreementSignedInitials: string) => {
        const data = {
            username: username,
            password: password,
            userAgreementSignedInitials: userAgreementSignedInitials
        };

        return Transport.post(`${USER_API}/account/acceptuseragreement`, data);
    },
    register: (registerModel: RegisterModel) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Target-Url': `https://${window.location.hostname}/emailConfirmation/{userId}/{token}`
            }
        };
        return Transport.post(
            `${USER_API}/account/register`,
            JSON.stringify({ ...registerModel, companyId }),
            undefined,
            config
        );
    },
    verifyEmail: (userId: string, token: string) => {
        return Transport.post(`${USER_API}/account/confirmemail?userId=${userId}&code=${token}`);
    },
    resendEmailConfirmation: (email: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Target-Url': `https://${window.location.hostname}/emailConfirmation/{userId}/{token}`
            }
        };
        return Transport.post(`${USER_API}/account/resendemailconfirmation`, { email }, undefined, config);
    },

    registerToken: (registerModel: UserRegistrationWithTokenModel, token: string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Target-Url': `https://${window.location.hostname}/emailConfirmation/{userId}/{token}`
            }
        };
        return Transport.post(
            `${USER_API}/account/register/token/${token}`,
            JSON.stringify({ ...registerModel }),
            undefined,
            config
        );
    }
};

const userRegistrationToken = {
    validateToken: (token: string): AxiosPromise => {
        return Transport.get(`${USER_API}/userregistrationtoken/${token}/validate`);
    },
    sendInvitation: (email: string, roleId: string): AxiosPromise<string> => {
        const data = {
            email: email,
            roleId: roleId
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Target-Url': `https://${window.location.hostname}/userregistration/{token}`
            }
        };
        return Transport.post(`${USER_API}/userregistrationtoken`, data, undefined, config);
    }
};

const users = {
    find: (username: string): AxiosPromise<User> => {
        return Transport.get(`${USER_API}/users/name/${username}`);
    }
};

const clientCredentials = {
    getToken: (clientKey: string, clientSecret: string): AxiosPromise<string> => {
        return Transport.post(`${USER_API}/clientcredentials/token`, {
            clientKey,
            clientSecret
        });
    },
    validateToken: (scopes: string[]): AxiosPromise => {
        return Transport.post(`${USER_API}/clientcredentials/token/validate`, scopes);
    }
};

// eslint-disable-next-line
export default {
    auth,
    account,
    users,
    userRegistrationToken,
    clientCredentials
};

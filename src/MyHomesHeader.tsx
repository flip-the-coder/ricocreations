import React from 'react';
import styled from 'styled-components';
import { useStores } from './hooks/useStores';
import MainPage from './components/NavigationBar';

const MyHomesHeader: React.FC = () => {
    // const location = useLocation();
    const { themeStore } = useStores();

    // const isActive = (path: string) => {
    //     return location.pathname === path ? 'active' : '';
    // };

    // useEffect(() => {
    //     const getBuilderInclusionSetupLink = async () => {
    //         if (!authStore.isLoggedIn || authStore.loggedInUser.role === 'USER') {
    //             return;
    //         }

    //         try {
    //             const r = await builderApi.builders.getBuilderInclusionSetupResult();
    //             const queryParams = {
    //                 clientId: r.data.clientId,
    //                 alternativeId: r.data.inclusionSetupAlternativeId
    //             };
    //             const url = `${window.location.origin}?${queryString.stringify(queryParams)}`;
    //             await templateStore.fetchBuilder(r.data.builderId);
    //             setInclusionSetUpLink(url);
    //         } catch (error) {
    //             if (Transport.isAxiosError(error)) {
    //                 const axiosError = error;
    //                 if (axiosError?.response?.status !== StatusCodes.NOT_FOUND) {
    //                     setInclusionSetUpLink(`${window.location.origin}/inclusion-setup`);
    //                 } else {
    //                     // Do nothing
    //                 }
    //             }
    //         }
    //     };
    //     getBuilderInclusionSetupLink();
    // }, [authStore.isLoggedIn, authStore.loggedInUser.role, templateStore, themeStore]);

    // const signOut = () => {
    //     authStore.logout();
    //     window.location.reload();
    // };

    const logo = themeStore.theme.myHomesBrand;
    // templateStore.builderBranding && templateStore.builderBranding.fullPathLogoUrl
    //     ? templateStore.builderBranding.fullPathLogoUrl
    //     : templateStore.builderBranding && templateStore.builderBranding.logo
    //     ? getImageUrl(templateStore.builderBranding.logo, true)
    //     : themeStore.theme.myHomesBrand;

    return (
        <Container>
            <LogoWrapper>{logo && <img src={logo} alt="" />}</LogoWrapper>
            {/* <NavigationLinks>
                <li className={isActive('/model-homes')}>
                    <NavLink to="/model-homes">{intel.formatMessage({ id: 'MyHomes.navigation.ModelHomes' })}</NavLink>
                </li>
                <li className={isActive('/saved-inspire-designs')}>
                    <NavLink to="/saved-inspire-designs">
                        {intel.formatMessage({ id: 'MyHomes.navigation.SavedInspireDesigns' })}
                    </NavLink>
                </li>
                <li className={isActive('/lots-specific-homes')}>
                    <NavLink to="/lots-specific-homes">
                        {intel.formatMessage({ id: 'MyHomes.navigation.LotSpecificHomes' })}
                    </NavLink>
                </li>
            </NavigationLinks> */}
            <MainPage />
            {/* <MyHomesDrawerMenu inclusionSetupLink={inclusionSetupLink} />
            <AccountAvatar onLogout={signOut} inclusionSetupLink={inclusionSetupLink} /> */}
        </Container>
    );
};

export default MyHomesHeader;

const Container = styled.div`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    height: calc(100vh - 1px);
    margin-bottom: 6px;
`;

const LogoWrapper = styled.div`
    width: 90px;

    img {
        padding-left: 12px;
        margin: 10px;
        max-height: 101vh;
        height: 100vh;
        align-self: center;

        @media only screen and (max-width: 1025px) {
            height: 45px;
        }
    }
`;


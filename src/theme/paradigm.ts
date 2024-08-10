import Logo from './omnibuilder-logo.png';

export const pageTitle = 'Paradigm Omni | Virtual Home Design';

const colors = {
    primary: '#202834',
    secondaries: ['#f09d39', '#21467e'],
    neutrals: [
        '#f7f7f7',
        '#ffffff',
        '#ebebeb',
        '#cccccc',
        '#bababa',
        '#9c9c9c',
        '#8a8a8a',
        '#353535',
        '#595959',
        '#ebebeb'
    ],
    common: ['#ffffff', '#000000'],
    error: '#ec1e30',
    success: '#388226'
};

const fonts = [
    {
        src: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700',
        family: 'Montserrat, sans-serif'
    },
    {
        src: 'https://fonts.googleapis.com/css?family=Poly',
        family: 'Poly, sans-serif'
    }
];

const buttonRadius = '3px';

const theme = {
    brand: Logo,
    myHomesBrand: Logo,
    pageTitle,
    header: {
        height: '61px',
        margin: '0',
        fontSize: '18px',
        color: colors.neutrals[6],
        logoMaxHeight: '50px',
        logoTopPadding: '0px'
    },
    infoHeader: {
        height: 72,
        mobileHeight: 50
    },
    fonts,
    buttonRadius,
    colors,
    typography: {
        fontFamily: fonts[0].family,
        fontWeightRegular: 'normal',
        fontWeightBold: 600,
        fontSizeSmall: '12px',
        fontSizeMedium: '14px',
        fontSizeLarge: '16px',
        textDecoration: 'none solid rgb(32, 40, 52)',
        letterSpacing: '1px',
        h1: {
            fontFamily: fonts[1].family,
            fontWeight: 500,
            fontSize: '40px',
            fontStyle: 'normal'
        },
        h2: {
            fontFamily: fonts[1].family,
            fontWeight: 'normal',
            fontSize: '32px',
            fontStyle: 'normal'
        },
        h3: {
            fontFamily: fonts[1].family,
            fontWeight: 'normal',
            fontSize: '20px',
            fontStyle: 'normal'
        },
        h4: {
            fontFamily: fonts[1].family,
            fontWeight: 'normal',
            fontSize: '18px',
            fontStyle: 'normal'
        },
        paragraph: {
            fontWeight: 'normal',
            fontSize: '19px',
            fontStyle: 'normal'
        },
        HelpInfo: {
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '1px',
            textDecoration: 'none solid rgb(191, 191, 191)',
            textTransform: 'uppercase',
            fontStyle: 'normal'
        }
    },
    loader: {
        maxWidth: '700px',
        loadingTextSize: '22px',
        patienceTextSize: '15px'
    },
    sideMenu: {
        border: `1px solid ${colors.neutrals[2]}`,
        background: colors.common[0],
        color: colors.primary,
        hoverColor: colors.secondaries[0]
    },
    sidePanel: {
        header: {
            fontSize: '18px',
            fontWeight: '400',
            height: '68px',
            color: colors.neutrals[1],
            position: 'relative'
        },
        options: {
            titleFontSize: '16px',
            colorStyleFontSize: '12px',
            navFontSize: '14px',
            navFontWeight: '500',
            navFontColor: colors.primary
        },
        lookingForMore: {
            titleFontSize: '22px',
            backgroundColor: colors.neutrals[1],
            titleColor: colors.primary,
            paragraphFontSize: '14px',
            buttonBackgroundColor: colors.primary,
            buttonTextColor: colors.neutrals[1],
            buttonHoverBackgroundColor: colors.primary,
            buttonHoverTextColor: colors.neutrals[1]
        },
        selectionSummary: {
            questionFontSize: '14px',
            answerFontSize: '14px'
        },
        stepList: {
            stepNameFontColor: colors.neutrals[7],
            arrowColor: colors.neutrals[7]
        }
    },
    topNavigationBar: {
        color: {
            headerBarBackgroundColor: colors.neutrals[1],
            headerTextColor: colors.neutrals[8],
            menuItemColorActive: colors.neutrals[1],
            menuItemColorHover: colors.neutrals[3],
            buttonColorActive: colors.primary,
            buttonColorHover: colors.primary,
            buttonTextColorActive: colors.primary,
            buttonTextColorHover: colors.neutrals[1],
            borderBottom: '1px solid rgb(204, 204, 204)',
            priceOvalColor: '1px solid #cccccc'
        },
        font: {
            headerFont: '18px',
            menuItemFont: {
                size: '14px',
                fontWeight: 'Medium',
                letterSpacing: '2px',
                textTransform: 'none'
            },
            buttonFont: {
                size: '16px',
                fontWeight: 'bold',
                leading: '2px',
                textTransform: ''
            },
            mainLogo: 'uppercase',
            priceFontTopMargin: '0px'
        },
        changeButton: {
            visibilityButton: 'block',
            paddingButton: '11px 20px',
            colorTitle: colors.primary,
            textDecoration: 'underline',
            letterSpacing: '1px',
            changeButtonBorder: 'none',
            changeButtonBackgroundColor: 'inherit',
            changeButtonHoverColor: colors.secondaries[0],
            changeButtonHoverBackgroundColor: 'inherit',
            fontSizeButton: '16px',
            fontWeightButton: 'normal'
        }
    },
    configuratorPanel: {
        color: {
            panelBackground: colors.neutrals[0],
            border: `1px solid ${colors.neutrals[9]}`,
            arrowTextColor: colors.primary,
            optionTitleColor: colors.primary,
            optionSectionColor: colors.primary,
            cardBackgroundColor: colors.neutrals[1],
            cardBorderColorSelected: colors.neutrals[1],
            cardDropShadowSelected: '0px 0px 5px #bababa',
            marketingTextColor: colors.primary,
            marketingTextLinkIconColor: colors.primary,
            optionListingHeaderColor: colors.primary,
            optionListingHeaderHRlineColor: colors.primary,
            tooltipHoverColor: colors.primary,
            tooltipHoverTextColor: colors.primary,
            fullPageHeader: 'flex',
            answerPriceTextColor: '#388226'
        },
        font: {
            stepName: fonts[0].family,
            stepNameSize: '18px',
            stepNameWeight: 500,
            navigationArrows: {
                size: '14px',
                lineHeight: '18px',
                fontWeight: '500',
                leading: '2px',
                textTransform: 'capitalize',
                letterSpacing: 'normal'
            },
            optionTitle: {
                size: '16px',
                fontWeight: 'bold',
                leading: '0',
                font: fonts[0].family
            },
            optionSelection: {
                size: '18px',
                fontWeight: 'normal',
                leading: '0',
                font: fonts[0].family
            },
            marketingText: {
                size: '14px',
                fontWeight: 'normal',
                leading: '0'
            },
            optionListingHeader: {
                size: '12px',
                fontWeight: 'medium',
                leading: 'normal',
                textTransform: 'capitalize'
            },
            tooltipHoverText: {
                size: '12px',
                fontWeight: 'medium',
                leading: '0'
            },
            textOnlyRadioButton: {
                size: '13px'
            },
            priceFontTopMargin: '0px'
        }
    },
    scheduleVisit: {
        titleFontStyle: 'italic',
        titleFontColor: colors.neutrals[7],
        titleFontWeight: 'normal',
        contentLetterSpacing: '1px',
        contentFontColor: colors.neutrals[7],
        infoFontColor: colors.neutrals[6],
        infoFontWeight: 'normal',
        borderButton: 'none',
        fontFamilyButton: fonts[0].family,
        fontSizeButton: '15px',
        colorButton: colors.common[0],
        letterSpacingButton: '1px',
        textTransform: 'none',
        backgroundColorButton: colors.primary,
        hoverColor: colors.common[0],
        hoverBackgroundColor: colors.primary,
        logoWidth: '200px'
    },
    socialMediaButton: {
        backgroundColor: colors.secondaries[0],
        onHoverBackgroundColor: colors.primary,
        onButtonHoverBackgroundColor: colors.primary,
        color: colors.common[0],
        iconSize: '30px',
        size: '15px',
        overlay: colors.common[1],
        overlayOpacity: '.8',
        modalBackgroundColor: colors.common[0],
        modalTextColor: colors.primary,
        linkColor: colors.common[0],
        closeIconColor: colors.neutrals[5]
    },
    homePDF: {
        logoPNG: Logo,
        imageWidth: '125px',
        headerBackgroundColor: colors.common[0],
        headerFontColor: colors.neutrals[8],
        font1: 'JosefinSans-Regular',
        font2: 'CrimsonText-Regular',
        font1Bold: 'JosefinSans-Bold',
        font2Bold: 'CrimsonText-Bold',
        font1Src: './fonts/JosefinSans-Regular.ttf',
        font2Src: './fonts/CrimsonText-Regular.ttf',
        font1BoldSrc: './fonts/JosefinSans-Bold.ttf',
        font2BoldSrc: './fonts/CrimsonText-Bold.ttf'
    },
    alternativeList: {
        buttonTextTransform: 'capitalize'
    }
};

export default theme;

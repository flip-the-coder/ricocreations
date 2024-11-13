import styled from 'styled-components';
import React from 'react';

const AboutMe = () => (
    <div>
        <Row>
            <Column>
                <CustomHeading>Hello, I am Jessica Rico</CustomHeading>
                <ColumnText>-Creator of Rico Creations</ColumnText>
                <ColumnText>
                    Jessica Rico is a Latina molecular biologist born and raised in Austin, Tx. Her passion for science,
                    medicine and cannabis alike led to the establishment of her business model.
                </ColumnText>
                <ColumnText>
                    Rico Creations is proud to provide high quality CBD products and strives to educate the community to
                    destigmatize cannabis.
                </ColumnText>
                <Separator />
                <SocialIcons>
                    <SocialIcon href="https://www.instagram.com/ricocreations/">
                        <i className="fab fa-instagram"></i>
                    </SocialIcon>
                    <SocialIcon href="#">
                        <i className="fab fa-facebook"></i>
                    </SocialIcon>
                    <SocialIcon href="#">
                        <i className="fab fa-youtube"></i>
                    </SocialIcon>
                </SocialIcons>
            </Column>
            <Column>
                <img
                    src="https://www.instagram.com/p/C9YOAkHpQ9a/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                    alt="Jessica Rico"
                    style={{ maxWidth: '100%' }}
                />
            </Column>
        </Row>

        <Row>
            <Column>
                <img src="your-image-url" alt="Rico Creations" className="image-bg-grey" style={{ maxWidth: '100%' }} />
            </Column>
            <Column>
                <CustomHeading>About Rico Creations</CustomHeading>
                <ColumnText>
                    Rico Creations is a personal brand that specializes in CBD-infused products. Based in Austin, TX,
                    Rico Creations is the exclusive retailer of Remedy + products in the city.
                </ColumnText>
                <ColumnText>
                    CBD has been shown to have a wide variety of potential health benefits, and Rico's creations offer a
                    convenient way to incorporate it into your daily routine.
                </ColumnText>
                <ColumnText>
                    All of our products are handmade with love and care, and we only use the highest quality ingredients
                    available.
                </ColumnText>
                <ColumnText>
                    We're committed to providing our customers with an enjoyable experience, and we hope you'll try our
                    products today!
                </ColumnText>
                <Separator />
                <SocialIcons>
                    <SocialIcon href="https://www.instagram.com/ricocreations/">
                        <i className="fab fa-instagram"></i>
                    </SocialIcon>
                    <SocialIcon href="#">
                        <i className="fab fa-facebook"></i>
                    </SocialIcon>
                    <SocialIcon href="#">
                        <i className="fab fa-twitter"></i>
                    </SocialIcon>
                </SocialIcons>
            </Column>
        </Row>

        <FullWidthImage>
            <img src="your-image-url" alt="Full Width" style={{ maxWidth: '100%' }} />
        </FullWidthImage>

        <PartnersSection>
            <PartnerColumn>
                <PartnerHeading>Partners</PartnerHeading>
                <Separator />
                <PartnerText>Find Rico Creations CBD used at the following ATX locations:</PartnerText>
                <Separator />
                <IconBox>
                    <span>
                        Austin Daiquiri Factory
                        <br />
                        2000 E 12th Street 78702
                    </span>
                </IconBox>
                <Separator />
                <IconBox>
                    <span>
                        Cantina 512
                        <br />
                        70 Rainey Street 78701
                    </span>
                </IconBox>
                <Separator />
                <IconBox>
                    <span>
                        El Mango Feliz
                        <br />
                        2718 Guadalupe Street 78705
                    </span>
                </IconBox>
            </PartnerColumn>
            <PartnerColumn className="image-bg"></PartnerColumn>
        </PartnersSection>
    </div>
);

export default AboutMe;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Column = styled.div`
    flex: 1;
    padding: 10px;
    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
`;

const CustomHeading = styled.h1`
    font-size: 70px;
    font-family: 'h1';
    font-weight: 500;
    @media (max-width: 768px) {
        font-size: 40px;
    }
`;

const ColumnText = styled.p`
    margin: 10px 0;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const Separator = styled.hr`
    width: 100%;
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0;
`;

const SocialIcons = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.2em;
    a {
        text-decoration: none;
        color: inherit;
    }
    @media (max-width: 768px) {
        gap: 0.5em;
    }
`;

const SocialIcon = styled.a`
    border: 1px solid #ddd;
    border-radius: 50%;
    padding: 5px;
    @media (max-width: 768px) {
        padding: 8px;
    }
`;

const FullWidthImage = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        max-width: 100%;
        height: auto;
    }
`;

const PartnersSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #f7f7f7;
    padding: 20px 0;
    justify-content: center;
    align-items: flex-end;
    min-height: 300px; /* Adjust this value based on your design */
    @media (max-width: 768px) {
        padding: 10px 0;
        min-height: 200px; /* Adjust for mobile */
    }
`;

const PartnerColumn = styled.div`
    flex: 1;
    text-align: center;
    background-color: #f7f7f7;
    padding: 50px;
    @media (max-width: 768px) {
        padding: 20px;
    }
    &.image-bg {
        background-image: url('your-image-url');
        background-position: 100%;
        background-repeat: no-repeat;
    }
`;

const PartnerHeading = styled.h2`
    font-family: 'h1';
    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

const PartnerText = styled.p`
    max-width: 70%;
    margin: auto;
    @media (max-width: 768px) {
        max-width: 90%;
        font-size: 14px;
    }
`;

const IconBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    i {
        font-size: 1rem;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
`;

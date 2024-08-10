import React from 'react';
import styled from 'styled-components';

// Define styled components
const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fdb3ba;
`;

const ColumnOneSixth = styled.div`
    flex: 1;
    max-width: 16.66%;
`;

const ColumnTwoThirds = styled.div`
    flex: 4;
    max-width: 66.66%;
`;

const FullWidthColumn = styled.div`
    flex: 1;
    width: 100%;
`;

const PostTitle = styled.h1`
    text-align: center;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`;

const GridItem = styled.div`
    // Add your styles for grid items here
`;

// Placeholder for posts data
const posts: any = [
    // Add your posts data here
    { title: 'Felipe is here', excerpt: 'No I was not' }
];

const Cbd101 = () => {
    return (
        <div>
            <Row>
                <ColumnOneSixth></ColumnOneSixth>
                <ColumnTwoThirds>
                    <PostTitle>Post Title</PostTitle>
                </ColumnTwoThirds>
                <ColumnOneSixth></ColumnOneSixth>
            </Row>
            <Row>
                <FullWidthColumn>
                    <Grid>
                        {posts.map((post, index) => (
                            <GridItem key={index}>
                                {/* Render your post item here */}
                                <h2>{post.title}</h2>
                                <p>{post.excerpt}</p>
                            </GridItem>
                        ))}
                    </Grid>
                </FullWidthColumn>
            </Row>
        </div>
    );
};

export default Cbd101;

import React from 'react'
import { lazy } from "react";
import SearchContent from "../content/SearchContent.json";

const Container = lazy(() => import("../common/Container/index.tsx"));
const ContentBlock = lazy(() => import("../components/ContentBlock/index.tsx"));

const Search = () => {
    return (
        <Container>
            <ContentBlock
                type="left"
                title={SearchContent.title}
                content={SearchContent.text}
                icon="waving.svg"
                id="search"
            />
        </Container>
    )
}

export default Search
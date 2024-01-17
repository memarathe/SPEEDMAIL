import React from 'react'
import { lazy } from "react";
import TrackingContent from "../content/TrackingContent.json";
const TrackingForms = lazy(() => import("../components/TrackingForm/index.tsx"));
const Container = lazy(() => import("../common/Container/index.tsx"));

const Tracking = () => {
  const handleClick = (e) => {
    // navigate('/Ship_package_maps',{ state: { details } })
    console.log()
  }
  return (
    <Container>
      <TrackingForms
        title={TrackingContent.title}
        content={TrackingContent.text}

        id="tracking" />

        
    </Container>
  )
}

export default Tracking